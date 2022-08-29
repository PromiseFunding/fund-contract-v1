// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// errors

contract YieldFund {
    // Type Declarations
    // State variables
    mapping(address => uint256) public s_funders;
    uint256 public immutable i_lockTime;

    // Constants
    // Events

    constructor(uint256 lockTime) {
        i_lockTime = lockTime;
    }

    function fund(uint256 amount) public payable {
        // Set initial amount for funder
        s_funders[msg.sender] = amount;
    }

    function getFundAmount(address funder) public view returns (uint256) {
        return s_funders[funder];
    }
}
