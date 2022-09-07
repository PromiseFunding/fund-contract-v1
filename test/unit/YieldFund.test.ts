import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { YieldFund } from "../../typechain-types/"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("YieldFund Unit Tests", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
          const fundValue: BigNumber = BigNumber.from("1000000000000000000")
          let yieldFundContract: YieldFund, yieldFund: YieldFund
          const chainId = network.config.chainId || 31337

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              user = accounts[1]
              await deployments.fixture(["all"])
              yieldFundContract = await ethers.getContract("YieldFund")
              yieldFund = yieldFundContract.connect(deployer)
          })
          describe("Funding Tests", function () {
              let fundAmount: BigNumber
              it("correctly adds a funder", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  await yieldFund.fund(user.address, fundValue)
                  fundAmount = await yieldFund.getFundAmount(user.address)
                  assert.equal(fundAmount.toString(), fundValue.toString())
              })
              it("fails with a fund value of zero", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  await expect(yieldFund.fund(user.address, 0)).to.be.revertedWithCustomError(
                      yieldFund,
                      "YieldFund__FundAmountMustBeAboveZero"
                  )
              })

              //   it("doesn't allow a funder to withdraw more than they funded", async function () {
              //       yieldFund = yieldFundContract.connect(user)
              //       const higherFundAmount = fundAmount.add(1)
              //       await expect(
              //           yieldFund.withdrawFundsFromPool(higherFundAmount)
              //       ).to.be.revertedWith("YieldFund__WithdrawFundsGreaterThanBalance")
              //   })
          })
          describe("Owner Tests", function () {
              it("fails when a non owner tries to withdraw proceeds", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  await expect(yieldFund.withdrawProceeds(1)).to.be.revertedWithCustomError(
                      yieldFund,
                      "YieldFund__NotOwner"
                  )
              })
          })
      })
