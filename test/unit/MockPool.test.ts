import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { MockPool, YieldFundAAVE } from "../../typechain-types/"
import { MockERC20Token } from "../../typechain-types/contracts/test"

// These tests are built to run on the local hardhat network using the mocks
!(network.name == "hardhat")
    ? describe.skip
    : describe("YieldFund Unit Tests (On AAVE Mock Contracts)", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
          const fundValue = 1
          let mockPoolContract: MockPool,
              yieldFundContract: YieldFundAAVE,
              yieldFund: YieldFundAAVE,
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
              const fundFactory = await ethers.getContract("FundFactory")
              // const yieldFundAddress = await fundFactory.getYieldFundAAVE(0)

              assetTokenContract = await ethers.getContract("MockERC20Token")
              assetToken = assetTokenContract.connect(deployer)
              const aTokenContract = await ethers.getContract("MockAToken")
              aToken = await aTokenContract.connect(deployer)
              const createYieldFundTx = await fundFactory.createYieldFundAAVE(
                  0,
                  assetToken.address,
                  aToken.address,
                  mockPoolContract.address
              )
              const txReceipt = await createYieldFundTx.wait(1)
              const yieldFundAddress = txReceipt.events[2].args.fundAddress

              yieldFundContract = await ethers.getContractAt("YieldFundAAVE", yieldFundAddress)
              yieldFund = yieldFundContract.connect(deployer)

              decimals = await aToken.decimals()
              fundValueWithDecimals = BigNumber.from((fundValue * 10 ** decimals).toString())
          })

          describe("MockAToken Tests", function () {
              it("correctly funds the contracts interest donation", async function () {
                  yieldFund = await yieldFundContract.connect(deployer)
                  originalFundAmount = await yieldFund.getFundAmountWithdrawable(deployer.address)
                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )

                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(fundValueWithDecimals, true)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(deployer.address)
                  assert.equal(
                      fundValueWithDecimals.toString(),
                      (await aToken.balanceOf(yieldFund.address)).toString(),
                      (await assetToken.balanceOf(mockPoolContract.address)).toString()
                  )
              })
              it("correctly funds the contracts straight donation", async function () {
                  yieldFund = await yieldFundContract.connect(deployer)
                  originalFundAmount = await yieldFund.getFundAmountTotal(deployer.address)
                  assert.equal("0", originalFundAmount.toString())
                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )

                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(fundValueWithDecimals, false)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountTotal(deployer.address)
                  assert.equal(fundValueWithDecimals.toString(), fundAmount.toString())

                  fundAmount = await yieldFund.getFundAmountWithdrawable(deployer.address)
                  assert.equal("0", fundAmount.toString())
              })
              it("correctly withdraws from the contracts", async function () {
                  yieldFund = await yieldFundContract.connect(deployer)
                  originalFundAmount = await yieldFund.getFundAmountWithdrawable(deployer.address)
                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(fundValueWithDecimals, true)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(deployer.address)

                  const originalBalance = (
                      await assetToken.balanceOf(await deployer.address)
                  ).toString()

                  //should increase time of chain to test if withdraw works
                  timeLeft = await yieldFund.getTimeLeft(deployer.address)
                  await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                  const withdrawTx = await yieldFund.withdrawFundsFromPool(fundAmount)
                  await withdrawTx.wait(1)
                  const afterFundAmount = await yieldFund.getFundAmountWithdrawable(
                      deployer.address
                  )
                  const balance = await assetToken.balanceOf(await deployer.address)
                  // Ensure the balance in the contract is now zero
                  assert.equal(afterFundAmount.toString(), BigNumber.from(0).toString())
                  // ensure the deployer's wallet is replenished
                  assert.equal(balance.toString(), fundAmount.add(originalBalance).toString())
              })
              it("correctly allows the owner to withdraw proceeds from interest donation", async function () {
                  const userFundVal = BigNumber.from((100 * 10 ** decimals).toString())
                  // fund user account
                  const approveTx1 = await assetToken.approve(deployer.address, userFundVal)

                  await approveTx1.wait(1)
                  const transferTx = await assetToken.transferFrom(
                      deployer.address,
                      user.address,
                      userFundVal
                  )
                  await transferTx.wait(1)

                  // user account funds contract
                  yieldFund = await yieldFundContract.connect(user)
                  assetToken = await assetTokenContract.connect(user)

                  const approveTx2 = await assetToken.approve(yieldFund.address, userFundVal)
                  await approveTx2.wait(1)

                  const fundTx = await yieldFund.fund(userFundVal, true)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)
                  // run mock interest
                  const preInterestBalance = await aToken.balanceOf(yieldFund.address)
                  await mockPoolContract.payoutInterest(yieldFund.address)
                  const postInterestBalance = await aToken.balanceOf(yieldFund.address)
                  const proceeds = postInterestBalance.sub(preInterestBalance)
                  assert.equal(
                      postInterestBalance.sub(preInterestBalance).toString(),
                      userFundVal.div(100).toString()
                  )
                  const withdrawableProceeds = await yieldFund.getWithdrawableInterestProceeds()
                  assert.equal(withdrawableProceeds.toString(), proceeds.toString())
                  // withdraw proceeds
                  yieldFund = yieldFundContract.connect(deployer)
                  const prePayoutBalance = await assetToken.balanceOf(deployer.address)
                  const prePayoutContractBalance = await aToken.balanceOf(yieldFund.address)

                  yieldFund.withdrawProceeds()
                  const postPayoutBalance = await assetToken.balanceOf(deployer.address)
                  const postPayoutContractBalance = await aToken.balanceOf(yieldFund.address)

                  assert.equal(
                      postPayoutBalance.sub(prePayoutBalance).toString(),
                      proceeds.toString()
                  )
                  assert.equal(
                      prePayoutContractBalance.sub(postPayoutContractBalance).toString(),
                      proceeds.toString()
                  )

              })
              it("correctly allows the owner to withdraw proceeds from straight donation", async function () {
                  const userFundVal = BigNumber.from((100 * 10 ** decimals).toString())
                  // fund user account
                  const approveTx1 = await assetToken.approve(deployer.address, userFundVal)

                  await approveTx1.wait(1)
                  const transferTx = await assetToken.transferFrom(
                      deployer.address,
                      user.address,
                      userFundVal
                  )
                  await transferTx.wait(1)

                  // user account funds contract
                  yieldFund = await yieldFundContract.connect(user)
                  assetToken = await assetTokenContract.connect(user)

                  const approveTx2 = await assetToken.approve(yieldFund.address, userFundVal)
                  await approveTx2.wait(1)

                  const fundTx = await yieldFund.fund(userFundVal, false)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)

                  const withdrawableProceeds = await yieldFund.getWithdrawableInterestProceeds()
                  assert.equal(withdrawableProceeds.toString(), "0")
                  assert.equal(fundAmount.toString(), "0")

                  fundAmount = await yieldFund.getFundAmountTotal(user.address)

                  // withdraw proceeds
                  yieldFund = yieldFundContract.connect(deployer)
                  const prePayoutBalance = await assetToken.balanceOf(deployer.address)

                  yieldFund.withdrawProceeds()
                  const postPayoutBalance = await assetToken.balanceOf(deployer.address)

                  assert.equal(
                      postPayoutBalance.sub(prePayoutBalance).toString(),
                      fundAmount.toString()
                  )

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)

                  assert.equal("0", fundAmount.toString())
              })
              it("correctly allows the owner to withdraw proceeds from straight donation and interest donation", async function () {
                  const userFundVal = BigNumber.from((2 * 100 * 10 ** decimals).toString())
                  const userFundHalfVal = BigNumber.from((100 * 10 ** decimals).toString())
                  const userFundDoubleVal = BigNumber.from((4 * 100 * 10 ** decimals).toString())
                  // fund user account
                  const approveTx1 = await assetToken.approve(deployer.address, userFundDoubleVal)

                  await approveTx1.wait(1)
                  const transferTx = await assetToken.transferFrom(
                      deployer.address,
                      user.address,
                      userFundVal
                  )
                  await transferTx.wait(1)

                  // user account funds contract
                  yieldFund = await yieldFundContract.connect(user)
                  assetToken = await assetTokenContract.connect(user)

                  const approveTx2 = await assetToken.approve(yieldFund.address, userFundVal)
                  await approveTx2.wait(1)


                  const fundTx = await yieldFund.fund(userFundHalfVal, true)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)
                  // run mock interest
                  const preInterestBalance = await aToken.balanceOf(yieldFund.address)
                  await mockPoolContract.payoutInterest(yieldFund.address)
                  const postInterestBalance = await aToken.balanceOf(yieldFund.address)
                  const proceeds = postInterestBalance.sub(preInterestBalance)
                  assert.equal(
                      postInterestBalance.sub(preInterestBalance).toString(),
                      userFundHalfVal.div(100).toString()
                  )
                  const withdrawableProceeds = await yieldFund.getWithdrawableInterestProceeds()
                  assert.equal(withdrawableProceeds.toString(), proceeds.toString())

                  //user account funds straight donation now
                  const fundTx1 = await yieldFund.fund(userFundHalfVal, false)
                  await fundTx1.wait(1)

                  fundAmount = await yieldFund.getFundAmountTotal(user.address) //now equals total
                  assert.equal(fundAmount.toString(), userFundVal.toString())

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address) //now equals amount straight donated as well as withdrawable by donor
                  assert.equal(fundAmount.toString(), userFundHalfVal.toString())

                  // withdraw proceeds
                  yieldFund = yieldFundContract.connect(deployer)
                  const prePayoutBalance = await assetToken.balanceOf(deployer.address)
                  const prePayoutContractBalance = await aToken.balanceOf(yieldFund.address)

                  yieldFund.withdrawProceeds()
                  const postPayoutBalance = await assetToken.balanceOf(deployer.address)
                  const postPayoutContractBalance = await aToken.balanceOf(yieldFund.address)

                  assert.equal(
                      postPayoutBalance.sub(prePayoutBalance).toString(),
                      proceeds.add(fundAmount).toString() //checks if they add correctly
                  )
                  assert.equal(
                      prePayoutContractBalance.sub(postPayoutContractBalance).toString(),
                      proceeds.toString()
                  )

                  //should increase time of chain to test if withdraw works
                  yieldFund = yieldFundContract.connect(user)
                  timeLeft = await yieldFund.getTimeLeft(user.address)
                  await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                  const withdrawTx = await yieldFund.withdrawFundsFromPool(BigNumber.from("99100000000000000000"))
                //   await withdrawTx.wait(1)
                //   const afterFundAmount = await yieldFund.getFundAmountWithdrawable(
                //       user.address
                //   )
                //   // Ensure the balance in the user is now zero
                //   assert.equal(afterFundAmount.toString(), "0")
              })
          })
      })
