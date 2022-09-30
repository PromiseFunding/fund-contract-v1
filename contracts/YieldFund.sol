// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import {IYieldFund} from "./interfaces/IYieldFund.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error YieldFund__FundAmountMustBeAboveZero();
error YieldFund__WithdrawFundsGreaterThanBalance(uint256 amount, uint256 balance);
error YieldFund__NotOwner();
error YieldFund__WithdrawProceedsGreaterThanBalance(uint256 amount, uint256 balance);
error YieldFund__FundsStillTimeLocked(uint256 entryTime, uint256 timeLeft);

/// @title YieldFund
/// @author Silas Lenihan and Dylan Paul
/// @notice Use contract at your own risk, it is still in development
/// @dev Not all functions are fully tested yet
/// @custom:experimental This is an experimental contract.
contract YieldFund is IYieldFund, Ownable {
    // Type Declarations
    struct Funder {
        uint256 amount;
        uint256 entryTime;
    }
    // State variables
    address payable public i_owner;
    address public i_assetAddress;
    address public i_aaveTokenAddress;
    address public i_poolAddress;
    mapping(address => Funder) public s_funders;
    uint256 public s_totalFunded;
    uint256 public immutable i_lockTime;

    // Constants
    // Events

    constructor(
        uint256 lockTime,
        address assetAddress,
        address aaveTokenAddress,
        address poolAddress
    ) {
        i_lockTime = lockTime;
        i_owner = payable(tx.origin);
        transferOwnership(i_owner);
        i_assetAddress = assetAddress;
        i_aaveTokenAddress = aaveTokenAddress;
        i_poolAddress = poolAddress;
        s_totalFunded = 0;
    }

    /// @notice Fund the contract with a token, returns aTokens from LP to contract
    /// @dev Possibly a way to make it more gas efficient with different variables
    /// @param amount the amount to be funded to the contract
    function fund(uint256 amount) public {
        if (amount == 0) {
            revert YieldFund__FundAmountMustBeAboveZero();
        }
        // Set initial amount for funder
        IERC20(i_assetAddress).transferFrom(msg.sender, address(this), amount);
        // Whenever you exchange ERC20 tokens, you have to approve the tokens for spend.
        approveTransfer(IERC20(i_assetAddress), i_poolAddress, amount);
        IPool(i_poolAddress).supply(i_assetAddress, amount, address(this), 0);

        //set entryTime if first time depositing
        if (s_funders[msg.sender].amount == 0) {
            s_funders[msg.sender].entryTime = block.timestamp;
        }

        //add to total deposits and user deposits
        s_totalFunded = s_totalFunded + amount;
        s_funders[msg.sender].amount = s_funders[msg.sender].amount + amount;

        emit FunderAdded(msg.sender, i_owner, i_assetAddress, amount);
    }

    /// @notice Approve a recipient to spend the supplied token
    /// @param token the ERC20 token being supplied
    /// @param recipient the address of the contract being approved to spend
    function approveTransfer(
        IERC20 token,
        address recipient,
        uint256 amount
    ) public {
        token.approve(recipient, amount);
    }

    /// @notice Funder withdraws tokens up to the amount they supplied from the LP
    /// @param amount The amount being withdrawn
    function withdrawFundsFromPool(uint256 amount) public {
        if (amount > s_funders[msg.sender].amount) {
            revert YieldFund__WithdrawFundsGreaterThanBalance(amount, s_funders[msg.sender].amount);
        }

        //checks if locktime has expired for depositor
        if ((block.timestamp - s_funders[msg.sender].entryTime) < i_lockTime) {
            //TODO: check if errors need to be detailed as they are below... most likely not important for us
            revert YieldFund__FundsStillTimeLocked(
                s_funders[msg.sender].entryTime,
                i_lockTime - (block.timestamp - s_funders[msg.sender].entryTime)
            );
        }
        // Before actual transfer to deter reentrancy (I think)
        // TODO: Make sure this is safe from underflow
        // https://medium.com/loom-network/how-to-secure-your-smart-contracts-6-solidity-vulnerabilities-and-how-to-avoid-them-part-1-c33048d4d17d
        s_funders[msg.sender].amount -= amount;
        s_totalFunded -= amount;
        // Redeem tokens and send them directly to the funder
        IPool(i_poolAddress).withdraw(i_assetAddress, amount, msg.sender);
        emit FundsWithdrawn(msg.sender, i_owner, i_assetAddress, amount);
    }

    function withdrawProceeds(uint256 amount) public onlyOwner {
        // # of aTokens in this contract - s_totalFunded
        uint256 aTokenBalance = IERC20(i_aaveTokenAddress).balanceOf(address(this));
        uint256 availableToWithdraw = aTokenBalance - s_totalFunded;

        if (amount > availableToWithdraw) {
            revert YieldFund__WithdrawProceedsGreaterThanBalance(amount, availableToWithdraw);
        }

        // Redeem tokens and send them directly to the funder
        IPool(i_poolAddress).withdraw(i_assetAddress, amount, msg.sender);
        emit ProceedsWithdrawn(i_owner, i_assetAddress, amount);
    }

    /** Getter Functions */

    /// @notice Get the fund amount of a given address
    /// @param funder the funder whose balance is being checked
    /// @return The uint256 amount the funder currently has funded
    function getFundAmount(address funder) public view returns (uint256) {
        if (s_funders[funder].amount != 0) {
            return s_funders[funder].amount;
        }
        return 0;
    }

    /// @notice Gets the time lock of this contract
    /// @return locktime
    function getTimeLock() public view returns (uint256) {
        return i_lockTime;
    }

    /// @notice Gets the pool address of this contract
    /// @return poolAddress
    function getPoolAddress() public view returns (address) {
        return i_poolAddress;
    }

    /// @notice Gets the asset address of this contract
    /// @return assetAddress
    function getAssetAddress() public view returns (address) {
        return i_assetAddress;
    }

    /// @notice Get the time left before allowed to withdraw funds for of a given address
    /// @param funder the funder whose balance is being checked
    /// @return The uint256 representing the amount of time the funder has left
    function getTimeLeft(address funder) public view returns (uint256) {
        if (i_lockTime <= (block.timestamp - (s_funders[funder].entryTime))) {
            return 0;
        }
        return ((i_lockTime) - (block.timestamp - (s_funders[funder].entryTime)));
    }

    /// @notice Gets the block time... Useing this function for testing purposes. Can be removed later
    function getBlockTime() public view returns (uint256) {
        return block.timestamp;
    }

    /// @notice Get the owner of the contract
    /// @return The address of the contract's owner
    function getOwner() public view returns (address) {
        return i_owner;
    }

    /// @notice Get the amount of proceeds that the owner can withdraw
    /// @return The amount of withdrawable proceeds
    function getWithdrawableProceeds() public view returns (uint256) {
        uint256 aTokenBalance = IERC20(i_aaveTokenAddress).balanceOf(address(this));
        return aTokenBalance - s_totalFunded;
    }
}
