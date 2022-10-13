import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import {IYieldFund} from "./interfaces/IYieldFund.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

// 0x3EE77595A8459e93C2888b13aDB354017B198188
contract YieldFundCompound is IYieldFund, Ownable {
    struct Funder {
        uint256 amount;
        uint256 entryTime;
    }
    // State variables
    address payable public i_owner;
    address public i_assetAddress;
    address public i_poolAddress;
    mapping(address => Funder) public s_funders;
    uint256 public s_totalFunded;
    uint256 public immutable i_lockTime;

    // Constants
    // Events

    constructor(
        uint256 lockTime,
        address assetAddress,
        address poolAddress
    ) {
        i_lockTime = lockTime;
        i_owner = payable(tx.origin);
        transferOwnership(i_owner);
        i_assetAddress = assetAddress;
        i_poolAddress = poolAddress;
        s_totalFunded = 0;
    }

    function fund(uint256 amount) external override {}

    function approveTransfer(
        IERC20 token,
        address recipient,
        uint256 amount
    ) external override {}

    function withdrawFundsFromPool(uint256 amount) external override {}

    function withdrawProceeds(uint256 amount) external override {}

    function getFundAmount(address funder) external view override returns (uint256) {}

    function getTimeLock() external view override returns (uint256) {}

    function getPoolAddress() external view override returns (address) {}

    function getAssetAddress() external view override returns (address) {}

    function getTimeLeft(address funder) external view override returns (uint256) {}

    function getOwner() external view override returns (address) {}
}
