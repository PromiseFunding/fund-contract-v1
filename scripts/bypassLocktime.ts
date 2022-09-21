import { ethers, network } from "hardhat"

async function payout() {
    console.log("Fast forwarding time...")
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]
    const yieldFund = await ethers.getContract("YieldFund")
    const timeLeft = await yieldFund.getTimeLeft(deployer.address)
    console.log(timeLeft.toNumber())
    await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])
    await network.provider.request({
        method: "evm_mine",
        params: [],
    })

    console.log("Done.")
}

payout()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
