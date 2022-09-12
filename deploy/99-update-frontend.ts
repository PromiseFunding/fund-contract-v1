import { frontEndContractsFile, frontEndAbiLocation } from "../helper-hardhat-config"
import "dotenv/config"
import fs from "fs"
import { network, ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const updateFrontEnd: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("ABI(s) & Contract Addresse(s) updated.")
    }
}

async function updateAbi() {
    const yieldFund = await ethers.getContract("YieldFund")
    fs.writeFileSync(
        `${frontEndAbiLocation}YieldFund.json`,
        yieldFund.interface.format(ethers.utils.FormatTypes.json).toString()
    )
}

async function updateContractAddresses() {
    const chainId = network.config.chainId!.toString()
    const yieldFund = await ethers.getContract("YieldFund")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["YieldFund"].includes(yieldFund.address)) {
            contractAddresses[chainId]["YieldFund"].push(yieldFund.address)
        }
    } else {
        contractAddresses[chainId] = { YieldFund: [yieldFund.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
export default updateFrontEnd
updateFrontEnd.tags = ["all", "frontend"]
