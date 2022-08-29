const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")
    const args = [
        360000
    ]
    const yieldFund = await deploy("YieldFund", {
        from: deployer,
        args: args,
        log:true,
        waitConfiratmions: network.config.blockConfirmations || 1
    })
}

module.exports.tags = ["all", "yieldfund"]

