// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import {IYieldFund} from "./interfaces/IYieldFund.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error YieldFundAAVE__FundAmountMustBeAboveZero();
error YieldFundAAVE__WithdrawFundsGreaterThanBalance(uint256 amount, uint256 balance);
error YieldFundAAVE__NotOwner();
error YieldFundAAVE__NothingToWithdraw();
error YieldFundAAVE__FundsStillTimeLocked(uint256 entryTime, uint256 timeLeft);

/// @title YieldFund
/// @author Silas Lenihan and Dylan Paul
/// @notice Use contract at your own risk, it is still in development
/// @dev Not all functions are fully tested yet
/// @custom:experimental This is an experimental contract.
contract YieldFundAAVE is IYieldFund, Ownable {
    // Type Declarations
    struct Funder {
        uint256 amountWithdrawable;
        uint256 amountTotal;
        uint256 entryTime;
    }
    // State variables
    address payable public i_owner;
    address public i_assetAddress;
    address public i_aaveTokenAddress;
    address public i_poolAddress;
    mapping(address => Funder) public s_funders;
    uint256 public s_totalActiveFunded;
    uint256 public s_totalActiveInterestFunded;
    uint256 public s_totalLifetimeFunded;
    uint256 public s_amountWithdrawnByOwner;
    uint256 public s_totalLifetimeStraightFunded;
    uint256 public s_totalLifetimeInterestFunded;
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
        s_totalActiveFunded = 0;
        s_totalActiveInterestFunded = 0;
        s_totalLifetimeInterestFunded = 0;
        s_totalLifetimeStraightFunded = 0;
        s_amountWithdrawnByOwner = 0;
        s_totalLifetimeFunded = 0;
    }

    /// @notice Fund the contract with a token, returns aTokens from LP to contract
    /// @dev Possibly a way to make it more gas efficient with different variables
    /// @param amount the amount to be funded to the contract
    /// @param interest true if interest donation, false if straight donation
    function fund(uint256 amount, bool interest) public {
        if (amount == 0) {
            revert YieldFundAAVE__FundAmountMustBeAboveZero();
        }

        // if interest is true send to lending pool
        if (interest) {
            // Set initial amount for funder
            IERC20(i_assetAddress).transferFrom(msg.sender, address(this), amount);
            // Whenever you exchange ERC20 tokens, you have to approve the tokens for spend.
            approveTransfer(IERC20(i_assetAddress), i_poolAddress, amount);
            IPool(i_poolAddress).supply(i_assetAddress, amount, address(this), 0);

            if (s_funders[msg.sender].amountWithdrawable == 0) {
                s_funders[msg.sender].entryTime = block.timestamp;
            }

            //add to total deposits and user deposits
            s_funders[msg.sender].amountWithdrawable =
                s_funders[msg.sender].amountWithdrawable +
                amount;
            s_totalActiveInterestFunded = s_totalActiveInterestFunded + amount;
            s_totalLifetimeInterestFunded += amount; //accounting
        } else {
            IERC20(i_assetAddress).transferFrom(msg.sender, address(this), amount);
            s_totalLifetimeStraightFunded += amount; //accounting
        }

        s_totalActiveFunded = s_totalActiveFunded + amount;
        s_funders[msg.sender].amountTotal = s_funders[msg.sender].amountTotal + amount;
        s_totalLifetimeFunded = s_totalLifetimeFunded + amount;

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
        if (amount > s_funders[msg.sender].amountWithdrawable) {
            revert YieldFundAAVE__WithdrawFundsGreaterThanBalance(
                amount,
                s_funders[msg.sender].amountWithdrawable
            );
        }

        //checks if locktime has expired for depositor
        if ((block.timestamp - s_funders[msg.sender].entryTime) < i_lockTime) {
            //TODO: check if errors need to be detailed as they are below... most likely not important for us
            revert YieldFundAAVE__FundsStillTimeLocked(
                s_funders[msg.sender].entryTime,
                i_lockTime - (block.timestamp - s_funders[msg.sender].entryTime)
            );
        }
        // Before actual transfer to deter reentrancy (I think)
        // TODO: Make sure this is safe from underflow
        // https://medium.com/loom-network/how-to-secure-your-smart-contracts-6-solidity-vulnerabilities-and-how-to-avoid-them-part-1-c33048d4d17d
        s_funders[msg.sender].amountWithdrawable -= amount;
        s_funders[msg.sender].amountTotal -= amount;
        s_totalActiveFunded -= amount;
        s_totalActiveInterestFunded -= amount;

        // Redeem tokens and send them directly to the funder
        IPool(i_poolAddress).withdraw(i_assetAddress, amount, msg.sender);
        emit FundsWithdrawn(msg.sender, i_owner, i_assetAddress, amount);
    }

    // all or none withdraw all straight donations plus any interest accumulated
    function withdrawProceeds() public onlyOwner {
        // # of aTokens in this contract - s_totalInterestFunded
        uint256 aTokenBalance = IERC20(i_aaveTokenAddress).balanceOf(address(this));
        // able to withdraw extra interest
        uint256 interestAvailableToWithdraw = aTokenBalance - s_totalActiveInterestFunded;

        // total funded without interest method
        uint256 straightAvailableToWithdraw = s_totalActiveFunded - s_totalActiveInterestFunded;

        if (interestAvailableToWithdraw + straightAvailableToWithdraw <= 0) {
            revert YieldFundAAVE__NothingToWithdraw();
        }

        //first send from contract to owner
        if (straightAvailableToWithdraw > 0) {
            approveTransfer(IERC20(i_assetAddress), address(this), straightAvailableToWithdraw);
            IERC20(i_assetAddress).transferFrom(
                address(this),
                msg.sender,
                straightAvailableToWithdraw
            );
        }

        //next get interest accumulated sent to owner
        // Redeem tokens and send them directly to the funder
        if (interestAvailableToWithdraw > 0) {
            IPool(i_poolAddress).withdraw(
                i_assetAddress,
                aTokenBalance - s_totalActiveInterestFunded,
                msg.sender
            );
        }

        //only subtract from totalFunded the amount of straight donations
        s_totalActiveFunded -= straightAvailableToWithdraw;

        s_amountWithdrawnByOwner += interestAvailableToWithdraw + straightAvailableToWithdraw;

        emit ProceedsWithdrawn(
            i_owner,
            i_assetAddress,
            interestAvailableToWithdraw + straightAvailableToWithdraw
        );
    }

    /** Getter Functions */

    /// @notice Get the fund amount of a given address
    /// @param funder the funder whose balance is being checked
    /// @return The uint256 amount the funder currently has funded
    function getFundAmount(address funder) public view returns (uint256) {
        if (s_funders[funder].amountWithdrawable != 0) {
            return s_funders[funder].amountWithdrawable;
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

    /// @notice Get the amount of proceeds in interest that the owner can withdraw
    /// @return The amount of withdrawable proceeds
    function getWithdrawableInterestProceeds() public view returns (uint256) {
        uint256 aTokenBalance = IERC20(i_aaveTokenAddress).balanceOf(address(this));
        return aTokenBalance - s_totalActiveFunded;
    }

    /// @notice Get lifetime funded by both methods
    /// @return s_totalLifetimeFunded
    function getLifeTimeFunded() public view returns (uint256) {
        return s_totalLifetimeFunded;
    }

    /// @notice Get lifetime withdrawn by Owner
    /// @return s_amountWithdrawnByOwner
    function getLifeTimeWithdrawn() public view returns (uint256) {
        return s_amountWithdrawnByOwner;
    }

    /// @notice Get lifetime amount straight funded
    /// @return s_totalLifetimeStraightFunded
    function getAmountStraightFunded() public view returns (uint256) {
        return s_totalLifetimeStraightFunded;
    }

    /// @notice Get lifetime amount funded to interest earning pool
    /// @return s_totalLifetimeInterestFunded
    function getAmountInterestFunded() public view returns (uint256) {
        return s_totalLifetimeInterestFunded;
    }

    /// @notice Get active amount funded... not withdrawn yet
    /// @return s_totalActiveFunded
    function getTotalActiveFunded() public view returns (uint256) {
        return s_totalActiveFunded;
    }

    /// @notice Get active amount funded to interest pool
    /// @return s_totalActiveInterestFunded
    function getActiveFundedInterest() public view returns (uint256) {
        return s_totalActiveInterestFunded;
    }
}
