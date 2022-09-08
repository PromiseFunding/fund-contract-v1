// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

error YieldFund__FundAmountMustBeAboveZero();
error YieldFund__WithdrawFundsGreaterThanBalance(uint256 amount, uint256 balance);
error YieldFund__NotOwner();
error YieldFund__WithdrawProceedsGreaterThanBalance(uint256 amount, uint256 balance);

/// @title YieldFund
/// @author Silas Lenihan
/// @notice Use contract at your own risk, it is still in development
/// @dev Not all functions are fully tested yet
/// @custom:experimental This is an experimental contract.
contract YieldFund {
    // Type Declarations
    // State variables
    address payable public i_owner;
    address public i_assetAddress;
    address public i_poolAddress;
    mapping(address => uint256) public s_funders;
    uint256 public s_totalFunded;
    uint256 public immutable i_lockTime;

    // Constants
    // Events
    event FunderAdded(
        address indexed funder,
        address indexed owner,
        address indexed assetAddress,
        uint256 amount
    );

    event FundsWithdrawn(
        address indexed funder,
        address indexed owner,
        address indexed assetAddress,
        uint256 amount
    );

    event ProceedsWithdrawn(address indexed owner, address indexed assetAddress, uint256 amount);

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert YieldFund__NotOwner();
        _;
    }

    constructor(
        uint256 lockTime,
        address assetAddress,
        address poolAddress
    ) {
        i_lockTime = lockTime;
        i_owner = payable(msg.sender);
        i_assetAddress = assetAddress;
        i_poolAddress = poolAddress;
    }

    /// @notice Fund the contract with a token, returns aTokens from LP to contract
    /// @dev Possibly a way to make it more gas efficient with different variables
    /// @param sender the funder that is supplying the tokens to the contract
    /// @param amount the amount to be funded to the contract
    function fund(address sender, uint256 amount) public {
        if (amount == 0) {
            revert YieldFund__FundAmountMustBeAboveZero();
        }

        // Set initial amount for funder
        IERC20(i_assetAddress).transferFrom(sender, address(this), amount);
        // // Whenever you exchange ERC20 tokens, you have to approve the tokens for spend.
        approveOtherContract(IERC20(i_assetAddress), i_poolAddress);
        IPool(i_poolAddress).supply(i_assetAddress, amount, address(this), 0);

        s_totalFunded = s_totalFunded + amount;
        s_funders[sender] = s_funders[sender] + amount;
        emit FunderAdded(sender, i_owner, i_assetAddress, amount);
    }

    /// @notice Approve a recipient to spend the supplied token
    /// @param token the ERC20 token being supplied
    /// @param recipient the address of the contract being approved to spend
    function approveOtherContract(IERC20 token, address recipient) public {
        token.approve(recipient, 1e18);
    }

    /// @notice Funder withdraws tokens up to the amount they supplied from the LP
    /// @param amount The amount being withdrawn
    function withdrawFundsFromPool(uint256 amount) public {
        if (amount > s_funders[msg.sender]) {
            revert YieldFund__WithdrawFundsGreaterThanBalance(amount, s_funders[msg.sender]);
        }
        // Before actual transfer to deter reentrancy (I think)
        // TODO: Make sure this is safe from underflow
        // https://medium.com/loom-network/how-to-secure-your-smart-contracts-6-solidity-vulnerabilities-and-how-to-avoid-them-part-1-c33048d4d17d
        s_funders[msg.sender] -= amount;
        s_totalFunded -= amount;
        // Redeem tokens and send them directly to the funder
        IPool(i_poolAddress).withdraw(i_assetAddress, amount, msg.sender);
        emit FundsWithdrawn(msg.sender, i_owner, i_assetAddress, amount);
    }

    function withdrawProceeds(uint256 amount) public onlyOwner {
        // # of aTokens in this contract - s_totalFunded
        uint256 aTokenBalance = IERC20(i_assetAddress).balanceOf(address(this));
        uint256 availableToWithdraw = aTokenBalance - s_totalFunded;

        if (amount > availableToWithdraw) {
            console.log(block.timestamp);
            revert YieldFund__WithdrawProceedsGreaterThanBalance(amount, availableToWithdraw);
        }

        // Redeem tokens and send them directly to the funder
        IPool(i_poolAddress).withdraw(i_assetAddress, amount, msg.sender);
        emit ProceedsWithdrawn(i_owner, i_assetAddress, amount);
    }

    /// @notice Get the fund amount of a given address
    /// @param funder the funder whose balance is being checked
    /// @return The uint256 amount the funder currently has funded
    function getFundAmount(address funder) public view returns (uint256) {
        return s_funders[funder];
    }

    /// @notice Get the owner of the contract
    /// @return The address of the contract's owner
    function getOwner() public view returns (address) {
        return i_owner;
    }
}
