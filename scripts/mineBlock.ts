import { ethers, network } from "hardhat"

async function mineBlock() {
    console.log("Mining Block")

    if (process.env.TIMESKIP) {
        await network.provider.send("evm_increaseTime", [+process.env.TIMESKIP])

    }

    await network.provider.request({
        method: "evm_mine",
        params: [],
    })

    console.log("Done.")
}

mineBlock()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
