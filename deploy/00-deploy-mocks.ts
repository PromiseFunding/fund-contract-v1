import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const deployMocks: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId || 31337

    if (network.name == "hardhat") {
        log("Deploying MockPool...")
        const mockToken = await deploy("MockERC20Token", {
            from: deployer,
            log: true,
            args: [],
        })
        log("-----------------------------------")

        log("Deploying MockPool...")
        const mockPool = await deploy("MockPool", {
            from: deployer,
            log: true,
            args: [mockToken.address],
        })
        log("-----------------------------------")

        log("Deploying MockAToken...")
        const args = [mockPool.address]
        await deploy("MockAToken", {
            from: deployer,
            log: true,
            args: args,
        })
        log("-----------------------------------")

        log("Mocks Deployed")
    }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
