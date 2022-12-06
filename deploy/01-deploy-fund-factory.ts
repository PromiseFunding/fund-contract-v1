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

const deployFundFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId || 31337

    log("----------------------------------------------------")
    await deploy("FundFactory", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: networkConfig[chainId].blockConfirmations || 1,
    })

    log("----------------------------------------------------")

    await deploy("PromiseFundFactory", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: networkConfig[chainId].blockConfirmations || 1,
    })

    log("----------------------------------------------------")

    const promiseFundFactory = await ethers.getContract("PromiseFundFactory")
    const createTx = await promiseFundFactory.createPromiseFund(networkConfig[chainId].assetAddress, [100, 400, 20368000, 100], 5184000)
    await createTx.wait(1)
}

export default deployFundFactory
deployFundFactory.tags = ["all", "fundfactory"]
