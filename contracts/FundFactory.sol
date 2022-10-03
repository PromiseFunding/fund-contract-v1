// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {YieldFundAAVE} from "./YieldFundAAVE.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error FundFactory__CantHaveTwoFunds();

/// @title FundFactory
/// @author Silas Lenihan and Dylan Paul
/// @notice Use contract at your own risk, it is still in development
/// @dev Not all functions are fully tested yet
/// @custom:experimental This is an experimental contract.
contract FundFactory is Ownable {
    // Events
    event Created(address indexed owner, address indexed assetAddress, address indexed fundAddress);

    // Variables
    address public i_owner;
    YieldFundAAVE[] public s_funds_aave;

    constructor() {
        i_owner = msg.sender;
        transferOwnership(i_owner);
    }

    /// @notice Create a new YieldFundAAVE
    /// @param lockTime the time before a user can deposit their donated funds
    /// @param assetAddress the address of the underlying asset to be used in the liquidity pool
    /// @param aaveTokenAddress The token address of the aave token to be exchanged by the pool
    /// @param poolAddress the address of the AAVE pool
    function createYieldFundAAVE(
        uint256 lockTime,
        address assetAddress,
        address aaveTokenAddress,
        address poolAddress
    ) public {
        YieldFundAAVE yieldFund = new YieldFundAAVE(
            lockTime,
            assetAddress,
            aaveTokenAddress,
            poolAddress
        );
        s_funds_aave.push(yieldFund);
        emit Created(msg.sender, assetAddress, address(yieldFund));
    }

    function getYieldFundAAVE(uint256 index) public view returns (address) {
        return address(s_funds_aave[index]);
    }

    function getAllYieldFundsAAVE() public view returns (YieldFundAAVE[] memory) {
        return s_funds_aave;
    }
}
