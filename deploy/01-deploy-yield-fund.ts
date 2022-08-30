import { network, ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains, networkConfig } from "../helper-hardhat-config"

const deployYieldFund: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("----------------------------------------------------")
    const args = [360000]
    const yieldFund = await deploy("YieldFund", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: chainId ? networkConfig[chainId].blockConfirmations : 1,
    })
}

export default deployYieldFund
deployYieldFund.tags = ["all", "yieldfund"]
