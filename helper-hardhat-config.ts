export interface networkConfigItem {
    name?: string
    subscriptionId?: string
    gasLane?: string
    keepersUpdateInterval?: string
    raffleEntranceFee?: string
    callbackGasLimit?: string
    vrfCoordinatorV2?: string
    blockConfirmations?: number
    assetAddress?: string
    poolAddress?: string
    assetName?: string
    poolAddressProvider?: string
    aaveTokenAddress?: string
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        callbackGasLimit: "500000", // 500,000 gas
        blockConfirmations: 1,
        poolAddress: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        assetAddress: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    },
    4: {
        name: "rinkeby",
        callbackGasLimit: "500000", // 500,000 gas
        blockConfirmations: 6,
    },
    5: {
        name: "goerli",
        blockConfirmations: 6,
        assetAddress: "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49",
        assetName: "TetherToken",
        poolAddress: "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6",
        aaveTokenAddress: "0x73258E6fb96ecAc8a979826d503B45803a382d68",
    },
    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const DEFAULT_ASSET_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
export const DEFAULT_AAVE_TOKEN_ADDRESS = "0x73258E6fb96ecAc8a979826d503B45803a382d68"
export const DEFAULT_POOL_ADDRESS = "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6"
export const frontEndContractsFile = "../fund-me-frontend-v1/constants/contractAddresses.json"
export const frontEndAbiLocation = "../fund-me-frontend-v1/constants/"
