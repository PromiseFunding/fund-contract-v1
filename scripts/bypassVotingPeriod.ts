import { ethers, network } from "hardhat"

async function bypass() {
    console.log("Fast forwarding time...")
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]
    const contractAddress = process.env.CONTRACT_ADDRESS
    if (!contractAddress) {
        console.log("Please include the contract address as an ENV VAR")
        return
    }
    const promiseFund = await ethers.getContractAt("PromiseFund", contractAddress)
    const timeLeft = await promiseFund.getTimeLeftVoting()
    console.log(timeLeft.toNumber())
    await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 300])
    await network.provider.request({
        method: "evm_mine",
        params: [],
    })

    console.log("Done.")
}

bypass()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
