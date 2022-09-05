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
              this.beforeEach(async () => {
                  yieldFund = yieldFundContract.connect(user)
                  await yieldFund.fund(user.address, fundValue)
                  fundAmount = await yieldFund.getFundAmount(user.address)
              })
              it("correctly adds a funder", async function () {
                  assert.equal(fundAmount.toString(), fundValue.toString())
              })

              it("doesn't allow a funder to withdraw more than they funded", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  const higherFundAmount = fundAmount.add(1)
                  await expect(
                      yieldFund.withdrawFundsFromPool(higherFundAmount)
                  ).to.be.revertedWith("YieldFund__WithdrawFundsGreaterThanBalance")
              })
          })
      })
