import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { assert } from "console"
import { network, deployments, ethers } from "hardhat"
import { FundFactory } from "../../typechain-types/"

// These tests are built to run on the local hardhat network using the mocks
!(network.name == "hardhat")
    ? describe.skip
    : describe("FundFactory Unit Tests", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress
          let locktime: number, assetAddress: string, aaveTokenAddress: string, poolAddress: string

          let fundFactoryContract: FundFactory, fundFactory: FundFactory

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["all"])

              fundFactoryContract = await ethers.getContract("FundFactory")
              fundFactory = await fundFactoryContract.connect(deployer)
              const assetTokenContract = await ethers.getContract("MockERC20Token")
              const aTokenContract = await ethers.getContract("MockAToken")
              const poolContract = await ethers.getContract("MockPool")

              locktime = 0
              assetAddress = assetTokenContract.address
              aaveTokenAddress = aTokenContract.address
              poolAddress = poolContract.address
          })

          it("Emits an event when creating a new contract", async function () {
              await expect(
                  fundFactory.createYieldFundAAVE(locktime, assetAddress, aaveTokenAddress, poolAddress)
              ).to.emit(fundFactory, "Created")
          })
      })
