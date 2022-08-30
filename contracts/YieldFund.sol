// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// errors

contract YieldFund {
    // Type Declarations
    // State variables
    address payable public i_owner;
    mapping(address => uint256) public s_funders;
    uint256 public immutable i_lockTime;

    // Constants
    // Events

    constructor(uint256 lockTime) {
        i_lockTime = lockTime;
        i_owner = payable(msg.sender);
    }

    function fund(uint256 amount) public payable {
        // Set initial amount for funder
        s_funders[msg.sender] = amount;
        // Send funds to lending protocol
    }

    function withdrawFunds() public {
        // address payable addr4 = payable(addr1);
        // https://solidity-by-example.org/payable/
    }

    function getFundAmount(address funder) public view returns (uint256) {
        return s_funders[funder];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }
}
