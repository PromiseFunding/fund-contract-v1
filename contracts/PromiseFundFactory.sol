// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {PromiseFund} from "./PromiseFund.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error PromiseFundFactory_TooManyMilestones();
error PromiseFundFactory_NeedToAddAMilestone();

/// @title PromiseFundFactory
/// @author Silas Lenihan and Dylan Paul
/// @notice Use contract at your own risk, it is still in development
/// @dev Not all functions are fully tested yet
/// @custom:experimental This is an experimental contract.
contract PromiseFundFactory is Ownable {
    // Events
    event Created(address indexed owner, address indexed assetAddress, address indexed fundAddress);

    // Variables
    address public i_owner;
    PromiseFund[] public s_funds_promise;

    constructor() {
        i_owner = msg.sender;
        transferOwnership(i_owner);
    }

    /// @notice Create a new PromiseFund
    /// @param assetAddress the address of the underlying asset
    function createPromiseFund(address assetAddress, uint256[] memory milestoneDuration) public {
        if(milestoneDuration.length > 5){
            revert PromiseFundFactory_TooManyMilestones();
        }
        if(milestoneDuration.length < 1){
            revert PromiseFundFactory_NeedToAddAMilestone();
        }
        PromiseFund promiseFund = new PromiseFund(assetAddress, milestoneDuration);
        s_funds_promise.push(promiseFund);
        emit Created(msg.sender, assetAddress, address(promiseFund));
    }

    function getPromiseFund(uint256 index) public view returns (address) {
        return address(s_funds_promise[index]);
    }

    function getAllPromiseFund() public view returns (PromiseFund[] memory) {
        return s_funds_promise;
    }
}
