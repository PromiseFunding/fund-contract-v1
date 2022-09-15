import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { MockPool, YieldFund } from "../../typechain-types/"
import { MockERC20Token } from "../../typechain-types/contracts/test"

// These tests are built to run on the local hardhat network using the mocks
!(network.name == "hardhat")
    ? describe.skip
    : describe("YieldFund Unit Tests", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
          const fundValue = 1
          let mockPoolContract: MockPool,
              yieldFundContract: YieldFund,
              yieldFund: YieldFund,
              aToken: any,
              assetTokenContract: MockERC20Token,
              assetToken: MockERC20Token
          let fundValueWithDecimals = BigNumber.from("1")
          let decimals: number,
              fundAmount: BigNumber,
              originalFundAmount: BigNumber,
              timeLeft: BigNumber
          const chainId = network.config.chainId || 31337

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              user = accounts[1]
              await deployments.fixture(["all"])
              mockPoolContract = await ethers.getContract("MockPool")
              yieldFundContract = await ethers.getContract("YieldFund")
              yieldFund = yieldFundContract.connect(deployer)
              assetTokenContract = await ethers.getContract("MockERC20Token")
              assetToken = assetTokenContract.connect(deployer)
              const aTokenContract = await ethers.getContract("MockAToken")
              aToken = await aTokenContract.connect(deployer)
              decimals = await aToken.decimals()
              fundValueWithDecimals = BigNumber.from((fundValue * 10 ** decimals).toString())
          })

          describe("MockAToken Tests", function () {
              it("correctly funds the contracts", async function () {
                  yieldFund = await yieldFundContract.connect(deployer)
                  originalFundAmount = await yieldFund.getFundAmount(deployer.address)
                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(fundValueWithDecimals)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmount(deployer.address)
                  console.log(
                      `| initial funds: ${originalFundAmount} | fund value: ${fundValueWithDecimals} | final funds: ${fundAmount} |`
                  )
                  assert.equal(
                      fundValueWithDecimals.toString(),
                      (await aToken.balanceOf(yieldFund.address)).toString(),
                      (await assetToken.balanceOf(mockPoolContract.address)).toString()
                  )
              })
              it("correctly withdraws from the contracts", async function () {
                  yieldFund = await yieldFundContract.connect(deployer)
                  originalFundAmount = await yieldFund.getFundAmount(deployer.address)
                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(fundValueWithDecimals)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmount(deployer.address)

                  const originalBalance = (
                      await assetToken.balanceOf(await deployer.address)
                  ).toString()

                  //should increase time of chain to test if withdraw works
                  timeLeft = await yieldFund.getTimeLeft(deployer.address)
                  await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                  const withdrawTx = await yieldFund.withdrawFundsFromPool(fundAmount)
                  await withdrawTx.wait(1)
                  const afterFundAmount = await yieldFund.getFundAmount(deployer.address)
                  const balance = await assetToken.balanceOf(await deployer.address)
                  // Ensure the balance in the contract is now zero
                  assert.equal(afterFundAmount.toString(), BigNumber.from(0).toString())
                  // ensure the deployer's wallet is replenished
                  assert.equal(balance.toString(), fundAmount.add(originalBalance).toString())
              })
          })
      })
