import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { utils } from "ethers"
import {
    networkConfig,
    DEFAULT_ASSET_ADDRESS,
    DEFAULT_POOL_ADDRESS,
    DEFAULT_AAVE_TOKEN_ADDRESS,
} from "../helper-hardhat-config"
import { resolve } from "path"

const deployYieldFund: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId || 31337
    let assetAddress, aaveTokenAddress, poolAddress
    const locktime = chainId === 31337 ? 360000 : 0

    if (network.name == "hardhat") {
        const token = await ethers.getContract("MockERC20Token", deployer)
        assetAddress = token.address
        const pool = await ethers.getContract("MockPool", deployer)
        poolAddress = pool.address
        const aToken = await ethers.getContract("MockAToken", deployer)
        aaveTokenAddress = aToken.address
    } else {
        assetAddress = networkConfig[chainId].assetAddress || DEFAULT_ASSET_ADDRESS
        aaveTokenAddress = networkConfig[chainId].aaveTokenAddress || DEFAULT_AAVE_TOKEN_ADDRESS
        poolAddress = networkConfig[chainId].poolAddress || DEFAULT_POOL_ADDRESS
    }

    log("----------------------------------------------------")
    await deploy("FundFactory", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: networkConfig[chainId].blockConfirmations || 1,
    })

    const fundFactory = await ethers.getContract("FundFactory")

    const createFundTx = await fundFactory.createYieldFund(
        locktime,
        assetAddress,
        aaveTokenAddress,
        poolAddress
    )
    await createFundTx.wait(1)

    const yieldFundAddress = await fundFactory.getYieldFund(0)
    console.log(`Yield Fund Address: ${yieldFundAddress}`)

    log("----------------------------------------------------")
}

export default deployYieldFund
deployYieldFund.tags = ["all", "yieldfund"]
