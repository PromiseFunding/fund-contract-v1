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
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        callbackGasLimit: "500000", // 500,000 gas
        blockConfirmations: 1,
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
    },
    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const DEFAULT_ASSET_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
export const DEFAULT_POOL_ADDRESS = "0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6"
export const frontEndContractsFile =
    "../nextjs-smartcontract-lottery-fcc/constants/contractAddresses.json"
