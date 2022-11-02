// SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFund {
    enum FundState {
        PENDING,
        VOTING,
        OWNER_WITHDRAW,
        FUNDER_WITHDRAW
    }

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

    function fund(uint256 amount) external;

    function approveTransfer(
        IERC20 token,
        address recipient,
        uint256 amount
    ) external;

    function withdrawProceedsFunder(uint256 amount) external;

    function withdrawProceeds(uint256 amount) external;

    function getFundAmount(address funder) external view returns (uint256);

    function getAssetAddress() external view returns (address);

    function getOwner() external view returns (address);

    function getState() external view returns (FundState);

    function getTotalFunds() external view returns (uint256);

    function getVoteEnd() external view returns (uint256);

    function getTimeLeftVoting() external view returns (uint256);

    function getVotesPro() external view returns (uint256);

    function getVotesCon() external view returns (uint256);
}
