import { network, ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
    developmentChains,
    networkConfig,
    DEFAULT_ASSET_ADDRESS,
    DEFAULT_POOL_ADDRESS,
} from "../helper-hardhat-config"

const deployYieldFund: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId || 31337
    const assetAddress = networkConfig[chainId].assetAddress || DEFAULT_ASSET_ADDRESS
    const poolAddress = networkConfig[chainId].poolAddress || DEFAULT_POOL_ADDRESS

    

    log("----------------------------------------------------")
    const args = [360000, assetAddress, poolAddress]
    const yieldFund = await deploy("YieldFund", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[chainId].blockConfirmations || 1,
    })
    log("----------------------------------------------------")
}

export default deployYieldFund
deployYieldFund.tags = ["all", "yieldfund"]
