import { network, ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
    developmentChains,
    networkConfig,
    DEFAULT_ASSET_ADDRESS,
    DEFAULT_POOL_ADDRESS,
} from "../helper-hardhat-config"

const deployMocks: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId || 31337

    const args = []
    if (developmentChains.includes(network.name)) {
        log("Local Network, deploying mocks")
        await deploy("MockPool", {
            from: deployer,
            log: true,
            args: [],
        })
        log("Mocks Deployed")
        log("-----------------------------------")
    }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
