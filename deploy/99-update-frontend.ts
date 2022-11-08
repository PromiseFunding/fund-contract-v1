import { frontEndContractsFile1, frontEndAbiLocation1, frontEndContractsFile2, frontEndAbiLocation2 } from "../helper-hardhat-config"
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
    const fundFactory = await ethers.getContract("FundFactory")
    const promiseFactory = await ethers.getContract("PromiseFundFactory")

    fs.writeFileSync(
        `${frontEndAbiLocation1}FundFactory.json`,
        fundFactory.interface.format(ethers.utils.FormatTypes.json).toString()
    )

    fs.writeFileSync(
        `${frontEndAbiLocation2}PromiseFundFactory.json`,
        promiseFactory.interface.format(ethers.utils.FormatTypes.json).toString()
    )
}

async function updateContractAddresses() {
    const chainId = network.config.chainId!.toString()
    const fundFactory = await ethers.getContract("FundFactory")
    const promiseFactory = await ethers.getContract("PromiseFundFactory")

    const contractAddresses1 = JSON.parse(fs.readFileSync(frontEndContractsFile1, "utf8"))
    if (chainId in contractAddresses1) {
        contractAddresses1[chainId]["FundFactory"] = [fundFactory.address]
    } else {
        contractAddresses1[chainId] = [{ FundFactory: fundFactory.address }]
    }
    fs.writeFileSync(frontEndContractsFile1, JSON.stringify(contractAddresses1))

    const contractAddresses2 = JSON.parse(fs.readFileSync(frontEndContractsFile2, "utf8"))
    if (chainId in contractAddresses2) {
        contractAddresses2[chainId]["PromiseFundFactory"] = [promiseFactory.address]
    } else {
        contractAddresses2[chainId] = [{ PromiseFundFactory: promiseFactory.address }]
    }
    fs.writeFileSync(frontEndContractsFile2, JSON.stringify(contractAddresses2))
}
export default updateFrontEnd
updateFrontEnd.tags = ["all", "frontend"]
