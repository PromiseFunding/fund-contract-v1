import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { network, deployments, ethers } from "hardhat"
import { FundFactory, PromiseFundFactory } from "../../typechain-types/"

// These tests are built to run on the local hardhat network using the mocks
!(network.name == "hardhat")
    ? describe.skip
    : describe("FundFactory Unit Tests", function () {
        let accounts: SignerWithAddress[], deployer: SignerWithAddress
        let locktime: number, assetAddress: string, aaveTokenAddress: string, poolAddress: string

        let fundFactoryContract: FundFactory, fundFactory: FundFactory
        let promiseFactoryContract: PromiseFundFactory, promiseFactory: PromiseFundFactory

        beforeEach(async function () {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            await deployments.fixture(["all"])

            fundFactoryContract = await ethers.getContract("FundFactory")
            fundFactory = await fundFactoryContract.connect(deployer)

            promiseFactoryContract = await ethers.getContract("PromiseFundFactory")
            promiseFactory = await promiseFactoryContract.connect(deployer)

            const assetTokenContract = await ethers.getContract("MockERC20Token")
            const aTokenContract = await ethers.getContract("MockAToken")
            const poolContract = await ethers.getContract("MockPool")

            locktime = 0
            assetAddress = assetTokenContract.address
            aaveTokenAddress = aTokenContract.address
            poolAddress = poolContract.address
        })
        describe("FundFactory AAVE Tests", function () {
            it("Emits an event when creating a new AAVE contract", async function () {
                await expect(
                    fundFactory.createYieldFundAAVE(locktime, assetAddress, aaveTokenAddress, poolAddress)
                ).to.emit(fundFactory, "Created")
            })
        })

        describe("PromiseFundFactory Tests", function () {
            it("Emits an event when creating a new Promise contract", async function () {
                await expect(
                    promiseFactory.createPromiseFund(assetAddress, [100, 400, 20368000, 100, 200])
                ).to.emit(promiseFactory, "Created")
            })
        })

    })
