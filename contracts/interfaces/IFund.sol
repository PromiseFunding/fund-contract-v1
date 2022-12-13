// SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFund {
    enum FundState {
        PENDING,
        VOTING,
        OWNER_WITHDRAW,
        FUNDER_WITHDRAW,
        PREFUNDING
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
        uint256 total
    );

    event ProceedsWithdrawn(address indexed owner, address indexed assetAddress, uint256 total);

    function fund(uint256 amount, bool current) external;

    function approveTransfer(
        IERC20 token,
        address recipient,
        uint256 amount
    ) external;

    function withdrawProceedsFunder() external;

    function withdrawProceeds() external;

    function getFundAmount(address funder) external view returns (uint256);

    function getAssetAddress() external view returns (address);

    function getOwner() external view returns (address);

    function getState() external view returns (FundState);

    function getCurrentTotalFunds() external view returns (uint256);

    function getLifeTimeAmountFunded() external view returns (uint256);

    function getPreMilestoneTotalFunds() external view returns (uint256);

    function getVoteEnd() external view returns (uint256);

    function getTimeLeftVoting() external view returns (uint256);

    function getVotesPro() external view returns (uint256);

    function getVotesCon() external view returns (uint256);
}
