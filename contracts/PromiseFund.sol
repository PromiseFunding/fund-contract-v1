// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import {IFund} from "./interfaces/IFund.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error PromiseFund__FundAmountMustBeAboveZero();
error PromiseFund__WithdrawFundsGreaterThanBalance(uint256 amount, uint256 balance);
error PromiseFund__NotOwner();
error PromiseFund__WithdrawProceedsGreaterThanBalance(uint256 amount, uint256 balance);
error PromiseFund__FundsStillTimeLocked(uint256 entryTime, uint256 timeLeft);
error PromiseFund__CantWithdrawFunder();
error PromiseFund__CantWithdrawOwner();
error PromiseFund__NotFundingPeriod();

/// @title PromiseFund
/// @author Silas Lenihan and Dylan Paul
/// @notice Use contract at your own risk, it is still in development
/// @dev Not all functions are fully tested yet
/// @custom:experimental This is an experimental contract.
contract PromiseFund is IFund, Ownable {
    // Type Declarations
    struct Funder {
        uint256 amount;
        uint256 entryTime;
        uint256 votes;
    }

    // State variables
    address payable public i_owner;
    address public i_assetAddress;
    mapping(address => Funder) public s_funders;
    uint256 public s_totalFunded;
    WithdrawState private s_withdrawState;

    // Constants
    // Events

    constructor(address assetAddress) {
        i_owner = payable(tx.origin);
        transferOwnership(i_owner);
        i_assetAddress = assetAddress;
        s_totalFunded = 0;
        s_withdrawState = WithdrawState.PENDING;
    }

    /// @notice Fund the contract with a token
    /// @dev Possibly a way to make it more gas efficient with different variables
    /// @param amount the amount to be funded to the contract
    function fund(uint256 amount) public {
        if (s_withdrawState != WithdrawState.PENDING) {
            revert PromiseFund__NotFundingPeriod();
        }
        if (amount == 0) {
            revert PromiseFund__FundAmountMustBeAboveZero();
        }
        // Set initial amount for funder
        IERC20(i_assetAddress).transferFrom(msg.sender, address(this), amount);
        // Whenever you exchange ERC20 tokens, you have to approve the tokens for spend.

        //set entryTime if first time depositing
        if (s_funders[msg.sender].amount == 0) {
            s_funders[msg.sender].entryTime = block.timestamp;
        }

        //add to total deposits and user deposits
        s_totalFunded = s_totalFunded + amount;
        s_funders[msg.sender].amount = s_funders[msg.sender].amount + amount;
        // Set the number of votes to 1 for now. Will be weighted in the future.
        s_funders[msg.sender].votes = 1;

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
    function withdrawProceedsFunder(uint256 amount) public {
        if (s_withdrawState != WithdrawState.FUNDER_WITHDRAW) {
            revert PromiseFund__CantWithdrawFunder();
        }
        if (amount > s_funders[msg.sender].amount) {
            revert PromiseFund__WithdrawFundsGreaterThanBalance(
                amount,
                s_funders[msg.sender].amount
            );
        }
        // Before actual transfer to deter reentrancy (I think)
        // https://medium.com/loom-network/how-to-secure-your-smart-contracts-6-solidity-vulnerabilities-and-how-to-avoid-them-part-1-c33048d4d17d
        s_funders[msg.sender].amount -= amount;
        s_totalFunded -= amount;

        approveTransfer(IERC20(i_assetAddress), address(this), amount);
        IERC20(i_assetAddress).transferFrom(address(this), msg.sender, amount);

        emit FundsWithdrawn(msg.sender, i_owner, i_assetAddress, amount);
    }

    /// @notice THIS FUNCTION IS PURELY FOR TESTING PURPOSES
    /// @dev CHANGE THE STATE WITH THIS TEST FUNCTION MANUALLY. DO NOT ALLOW THIS IN PRODUCTION
    function setState(WithdrawState state) public {
        s_withdrawState = state;
    }

    function withdrawProceeds(uint256 amount) public onlyOwner {
        if (s_withdrawState != WithdrawState.OWNER_WITHDRAW) {
            revert PromiseFund__CantWithdrawOwner();
        }

        if (amount > s_totalFunded) {
            revert PromiseFund__WithdrawProceedsGreaterThanBalance(amount, s_totalFunded);
        }
        s_totalFunded -= amount;

        // Redeem tokens and send them directly to the funder
        approveTransfer(IERC20(i_assetAddress), address(this), amount);
        IERC20(i_assetAddress).transferFrom(address(this), msg.sender, amount);

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

    /// @notice Gets the asset address of this contract
    /// @return assetAddress
    function getAssetAddress() public view returns (address) {
        return i_assetAddress;
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

    function getState() public view returns (WithdrawState) {
        return s_withdrawState;
    }

    /// @notice Get the amount of proceeds that the owner can withdraw
    /// @return The amount of withdrawable proceeds
    function getWithdrawableProceeds() public view returns (uint256) {
        if (s_withdrawState == WithdrawState.OWNER_WITHDRAW) {
            return s_totalFunded;
        }
        return 0;
    }

    function getTotalFunds() public view returns (uint256) {
        return s_totalFunded;
    }
}
