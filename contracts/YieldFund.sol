// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

// errors
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract YieldFund {
    // Type Declarations
    // State variables
    address payable public i_owner;
    address public i_assetAddress;
    address public i_poolAddress;
    mapping(address => uint256) public s_funders;
    uint256 public immutable i_lockTime;

    // Constants
    // Events

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

    function fund(address sender, uint256 amount) public {
        // Set initial amount for funder
        IERC20(i_assetAddress).transferFrom(sender, address(this), amount);
        s_funders[sender] = amount;
    }

    function withdrawFunds() public {
        /* ----- NOTES FOR LATER: -----
         * address payable addr4 = payable(addr1);
         * https://solidity-by-example.org/payable/
         * https://docs.aave.com/developers/v/1.0/developing-on-aave/the-protocol/atokens#redeem
         * IERC20(tokenAddress).balanceOf(address(this))
         *  ---------------------------- */
    }

    function getFundAmount(address funder) public view returns (uint256) {
        return s_funders[funder];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }
}
