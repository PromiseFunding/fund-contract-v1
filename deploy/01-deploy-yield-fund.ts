import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
    networkConfig,
    DEFAULT_ASSET_ADDRESS,
    DEFAULT_POOL_ADDRESS,
} from "../helper-hardhat-config"

const deployYieldFund: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId || 31337
    let assetAddress, poolAddress
    const locktime = chainId === 31337 ? 360000 : 0

    if (network.name == "hardhat") {
        const token = await ethers.getContract("MockERC20Token", deployer)
        assetAddress = token.address
        const pool = await ethers.getContract("MockPool", deployer)
        poolAddress = pool.address
    } else {
        assetAddress = networkConfig[chainId].assetAddress || DEFAULT_ASSET_ADDRESS
        poolAddress = networkConfig[chainId].poolAddress || DEFAULT_POOL_ADDRESS
    }

    log("----------------------------------------------------")
    const args = [locktime, assetAddress, poolAddress]
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
