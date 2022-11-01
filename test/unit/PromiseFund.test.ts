import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import {
    networkConfig
} from "../../helper-hardhat-config"
import { PromiseFund } from "../../typechain-types/"
import * as fs from "fs"

// These tests are built to run on the local hardhat network using the mocks
!(network.name == "hardhat")
    ? describe.skip
    : describe("PromiseFund Unit Tests", function () {
        let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
        const fundValue = 1
        let promiseFundContract: PromiseFund, promiseFund: PromiseFund, assetToken: any, assetTokenContract: any
        let fundValueWithDecimals = BigNumber.from("1")
        let decimals: number
        const chainId = network.config.chainId || 31337

        beforeEach(async function () {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            user = accounts[1]
            await deployments.fixture(["all"])

            const fundFactory = await ethers.getContract("FundFactory")
            const createPromiseFundTx = await fundFactory.createPromiseFund(
                networkConfig[chainId].assetAddress!,
            )
            const txReceipt = await createPromiseFundTx.wait(1)
            const promiseFundAddress = txReceipt.events[2].args.fundAddress
            promiseFundContract = await ethers.getContractAt("PromiseFund", promiseFundAddress)
            const abi = fs.readFileSync("./abis/erc20Abi.abi.json", "utf8")
            assetTokenContract = new ethers.Contract(
                networkConfig[chainId].assetAddress!,
                abi,
                deployer
            )
            assetToken = await assetTokenContract.connect(user)
            decimals = await assetToken.decimals()
            fundValueWithDecimals = BigNumber.from((fundValue * 10 ** decimals).toString())
        })

        describe("constructor", function () {
            it("")
        })
    })
