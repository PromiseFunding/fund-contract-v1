// SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MockAToken} from "./MockAToken.sol";
import "hardhat/console.sol";

error MockPool__NotOwner();
error MockPool__WithdrawTooMuch();

contract MockPool is IPool {
    mapping(address => uint256) public s_funders;
    uint256 public totalFunded;
    address public i_aaveAssetAddress = address(0);
    address public i_assetAddress;
    address public i_owner;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert MockPool__NotOwner();
        _;
    }

    constructor(address assetAddress) {
        i_owner = msg.sender;
        i_assetAddress = assetAddress;
    }

    function mintUnbacked(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external override {}

    function backUnbacked(
        address asset,
        uint256 amount,
        uint256 fee
    ) external override {}

    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 /*referralCode*/
    ) external override {
        // transfer ERC20 tokens to contract
        IERC20(i_assetAddress).transferFrom(msg.sender, address(this), amount);
        // transfer aTokens from contract
        approveTransfer(IERC20(i_aaveAssetAddress), address(this), amount);
        IERC20(i_aaveAssetAddress).transferFrom(address(this), msg.sender, amount);
        // Alter Mapping
        s_funders[onBehalfOf] += amount;
        totalFunded += amount;
    }

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external override returns (uint256) {
        // get amount of aTokens
        uint256 balance = MockAToken(i_aaveAssetAddress).balanceOf(msg.sender);
        if (balance < amount || s_funders[msg.sender] < amount) {
            revert MockPool__WithdrawTooMuch();
        }
        // burn aTokens
        MockAToken(i_aaveAssetAddress).burnTokens(msg.sender, amount);
        // transfer ERC20 tokens from contract
        approveTransfer(IERC20(asset), address(this), amount);
        MockAToken(asset).transferFrom(address(this), to, amount);
        // Alter mapping
        s_funders[msg.sender] -= amount;
        totalFunded -= amount;
    }

    function setAssetAddress() public {
        if (i_aaveAssetAddress == address(0)) {
            i_aaveAssetAddress = msg.sender;
        }
    }

    // This is a mock function to fake the payout of interest to a pool
    function payoutInterest(address to) public onlyOwner {
        uint256 payout = totalFunded / 100;
        approveTransfer(IERC20(i_aaveAssetAddress), address(this), payout);
        IERC20(i_aaveAssetAddress).transferFrom(address(this), to, payout);
    }

    function approveTransfer(
        IERC20 token,
        address recipient,
        uint256 amount
    ) public {
        token.approve(recipient, amount);
    }

    function supplyWithPermit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external override {}

    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external override {}

    function repay(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf
    ) external override returns (uint256) {}

    function repayWithPermit(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external override returns (uint256) {}

    function repayWithATokens(
        address asset,
        uint256 amount,
        uint256 interestRateMode
    ) external override returns (uint256) {}

    function swapBorrowRateMode(address asset, uint256 interestRateMode) external override {}

    function rebalanceStableBorrowRate(address asset, address user) external override {}

    function setUserUseReserveAsCollateral(address asset, bool useAsCollateral) external override {}

    function liquidationCall(
        address collateralAsset,
        address debtAsset,
        address user,
        uint256 debtToCover,
        bool receiveAToken
    ) external override {}

    function flashLoan(
        address receiverAddress,
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata interestRateModes,
        address onBehalfOf,
        bytes calldata params,
        uint16 referralCode
    ) external override {}

    function flashLoanSimple(
        address receiverAddress,
        address asset,
        uint256 amount,
        bytes calldata params,
        uint16 referralCode
    ) external override {}

    function getUserAccountData(address user)
        external
        view
        override
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        )
    {}

    function initReserve(
        address asset,
        address aTokenAddress,
        address stableDebtAddress,
        address variableDebtAddress,
        address interestRateStrategyAddress
    ) external override {}

    function dropReserve(address asset) external override {}

    function setReserveInterestRateStrategyAddress(address asset, address rateStrategyAddress)
        external
        override
    {}

    function setConfiguration(
        address asset,
        DataTypes.ReserveConfigurationMap calldata configuration
    ) external override {}

    function getConfiguration(address asset)
        external
        view
        override
        returns (DataTypes.ReserveConfigurationMap memory)
    {}

    function getUserConfiguration(address user)
        external
        view
        override
        returns (DataTypes.UserConfigurationMap memory)
    {}

    function getReserveNormalizedIncome(address asset) external view override returns (uint256) {}

    function getReserveNormalizedVariableDebt(address asset)
        external
        view
        override
        returns (uint256)
    {}

    function getReserveData(address asset)
        external
        view
        override
        returns (DataTypes.ReserveData memory)
    {}

    function finalizeTransfer(
        address asset,
        address from,
        address to,
        uint256 amount,
        uint256 balanceFromBefore,
        uint256 balanceToBefore
    ) external override {}

    function getReservesList() external view override returns (address[] memory) {}

    function ADDRESSES_PROVIDER() external view override returns (IPoolAddressesProvider) {}

    function updateBridgeProtocolFee(uint256 bridgeProtocolFee) external override {}

    function updateFlashloanPremiums(
        uint128 flashLoanPremiumTotal,
        uint128 flashLoanPremiumToProtocol
    ) external override {}

    function configureEModeCategory(uint8 id, DataTypes.EModeCategory memory config)
        external
        override
    {}

    function getEModeCategoryData(uint8 id)
        external
        view
        override
        returns (DataTypes.EModeCategory memory)
    {}

    function setUserEMode(uint8 categoryId) external override {}

    function getUserEMode(address user) external view override returns (uint256) {}

    function resetIsolationModeTotalDebt(address asset) external override {}

    function MAX_STABLE_RATE_BORROW_SIZE_PERCENT() external view override returns (uint256) {}

    function FLASHLOAN_PREMIUM_TOTAL() external view override returns (uint128) {}

    function BRIDGE_PROTOCOL_FEE() external view override returns (uint256) {}

    function FLASHLOAN_PREMIUM_TO_PROTOCOL() external view override returns (uint128) {}

    function MAX_NUMBER_RESERVES() external view override returns (uint16) {}

    function mintToTreasury(address[] calldata assets) external override {}

    function rescueTokens(
        address token,
        address to,
        uint256 amount
    ) external override {}

    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external override {}
}
