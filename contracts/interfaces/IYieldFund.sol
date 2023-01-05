// SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IYieldFund {
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

    function fund(uint256 amount, bool interest) external;

    function approveTransfer(
        IERC20 token,
        address recipient,
        uint256 amount
    ) external;

    function withdrawFundsFromPool(uint256 amount) external;

    function withdrawProceeds() external;

    function getFundAmountWithdrawable(address funder) external view returns (uint256);

    function getFundAmountTotal(address funder) external view returns (uint256);

    function getTimeLock() external view returns (uint256);

    function getPoolAddress() external view returns (address);

    function getAssetAddress() external view returns (address);

    function getTimeLeft(address funder) external view returns (uint256);

    function getOwner() external view returns (address);
}
