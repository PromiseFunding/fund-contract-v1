import { ethers, network } from "hardhat"

async function payout() {
    console.log("Paying out interest to YieldFund")
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]
    const mockPool = await ethers.getContract("MockPool")
    const yieldFund = await ethers.getContract("YieldFund")
    const payoutTx = await mockPool.payoutInterest(yieldFund.address, deployer.address)

    const fundAmt = await yieldFund.getFundAmount("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    console.log(fundAmt.toString())
    await payoutTx.wait(1)
    console.log("Done.")
}

payout()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
