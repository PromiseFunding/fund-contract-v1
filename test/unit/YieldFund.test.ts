import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import {
    networkConfig,
    DEFAULT_ASSET_ADDRESS,
    DEFAULT_POOL_ADDRESS,
} from "../../helper-hardhat-config"
import { YieldFundAAVE } from "../../typechain-types/"
import * as fs from "fs"

// These tests are built for the AAVE Sandbox Enivornment
!(network.name == "localhost")
    ? describe.skip
    : describe("YieldFund Unit Tests (On AAVE Sandbox)", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
          const fundValue = 1
          let yieldFundContract: YieldFundAAVE,
              yieldFund: YieldFundAAVE,
              assetToken: any,
              assetTokenContract: any
          let fundValueWithDecimals = BigNumber.from("1")
          let decimals: number,
              fundAmount: BigNumber,
              originalFundAmount: BigNumber,
              timeLeft: BigNumber,
              timeLocked: BigNumber,
              blocktime: BigNumber
          const chainId = network.config.chainId || 31337
          const timelock = 360000

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              user = accounts[1]
              await deployments.fixture(["all"])
              const fundFactory = await ethers.getContract("FundFactory")
              const createYieldFundTx = await fundFactory.createYieldFundAAVE(
                  timelock,
                  networkConfig[chainId].assetAddress!,
                  networkConfig[chainId].aaveTokenAddress!,
                  networkConfig[chainId].poolAddress!
              )
              const txReceipt = await createYieldFundTx.wait(1)
              const yieldFundAddress = txReceipt.events[2].args.fundAddress
              // const yieldFundAddress = await fundFactory.getYieldFundAAVE(0)
              yieldFundContract = await ethers.getContractAt("YieldFundAAVE", yieldFundAddress)
              //   yieldFund = yieldFundContract.connect(deployer)
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
              const assetAddress = networkConfig[chainId].assetAddress || DEFAULT_ASSET_ADDRESS
              const poolAddress = networkConfig[chainId].poolAddress || DEFAULT_POOL_ADDRESS
              it("initializes the time lock correctly", async () => {
                  yieldFund = await yieldFundContract.connect(user)
                  const response = await yieldFund.getTimeLock()
                  assert.equal(response.toNumber(), timelock)
              })
              it("initializes the pool address correctly", async () => {
                  yieldFund = await yieldFundContract.connect(user)
                  const response = await yieldFund.getPoolAddress()
                  assert.equal(
                      response.toString().toLowerCase(),
                      poolAddress.toString().toLowerCase()
                  )
              })
              it("initializes the asset address correctly", async () => {
                  yieldFund = await yieldFundContract.connect(user)
                  const response = await yieldFund.getAssetAddress()
                  assert.equal(
                      response.toString().toLowerCase(),
                      assetAddress.toString().toLowerCase()
                  )
              })
          })

          describe("Funding Tests", function () {
              it("correctly adds a funder", async function () {
                  yieldFund = await yieldFundContract.connect(user)
                  assetToken = await assetTokenContract.connect(user)

                  originalFundAmount = await yieldFund.getFundAmountWithdrawable(user.address)
                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)
                  const balance = await assetToken.balanceOf(user.address)
                  const allowance = await assetToken.allowance(user.address, yieldFund.address)
                  const fundTx = await yieldFund.fund(fundValueWithDecimals, true)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)
                  assert.equal(
                      (fundAmount.toNumber() - originalFundAmount.toNumber()).toString(),
                      fundValueWithDecimals.toString()
                  )
              })
              it("fails when a funder tries to withdraw more than they funded", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)
                  const higherFundAmount = fundAmount.add(1)
                  await expect(yieldFund.withdrawFundsFromPool(higherFundAmount)).to.be.reverted
              })
              it("fails when a funder tries to withdraw before time lock ends", async function () {
                  yieldFund = await yieldFundContract.connect(user)

                  originalFundAmount = await yieldFund.getFundAmountWithdrawable(user.address)

                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(fundValueWithDecimals, true)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)
                  //should revert after deploying bc constructor has certain locktime put in it already
                  await expect(yieldFund.withdrawFundsFromPool(fundAmount)).to.be.reverted
              })
              it("correctly withdraws the funders tokens", async function () {
                  yieldFund = await yieldFundContract.connect(user)
                  timeLeft = await yieldFund.getTimeLeft(user.address)

                  originalFundAmount = await yieldFund.getFundAmountWithdrawable(user.address)

                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(fundValueWithDecimals, true)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)
                  const originalBalance = (
                      await assetToken.balanceOf(await user.address)
                  ).toNumber()

                  //should increase time of chain to test if withdraw works
                  timeLeft = await yieldFund.getTimeLeft(user.address)
                  blocktime = await yieldFund.getBlockTime()
                  await network.provider.send("evm_setNextBlockTimestamp", [
                      blocktime.toNumber() + timeLeft.toNumber() + 1,
                  ])
                  await network.provider.send("evm_mine")
                  const withdrawTx = await yieldFund.withdrawFundsFromPool(fundAmount)
                  await withdrawTx.wait(1)
                  const afterFundAmount = await yieldFund.getFundAmountWithdrawable(user.address)
                  const balance = (await assetToken.balanceOf(await user.address)).toNumber()
                  // Ensure the balance in the contract is now zero
                  assert.equal(afterFundAmount.toNumber(), 0)
                  // ensure the user's wallet is replenished
                  assert.equal(balance, fundAmount.toNumber() + originalBalance)
              })
              it("fails with a fund value of zero", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  await expect(yieldFund.fund(0, true)).to.be.reverted
              })
          })

          describe("Owner Tests", function () {
              it("fails when a non owner tries to withdraw proceeds", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  await expect(yieldFund.withdrawProceeds()).to.be.revertedWith(
                      "Ownable: caller is not the owner"
                  )
              })
          })

          describe("Event tests", function () {
              it("emits an event after funding", async function () {
                  yieldFund = await yieldFundContract.connect(user)

                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)
                  await expect(await yieldFund.fund(fundValueWithDecimals, true)).to.emit(
                      yieldFund,
                      "FunderAdded"
                  )
              })
              it("emits an event after withdrawing", async function () {
                  yieldFund = await yieldFundContract.connect(user)

                  originalFundAmount = await yieldFund.getFundAmountWithdrawable(user.address)

                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(fundValueWithDecimals, true)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmountWithdrawable(user.address)

                  timeLeft = await yieldFund.getTimeLeft(user.address)
                  await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                  await expect(yieldFund.withdrawFundsFromPool(fundAmount)).to.emit(
                      yieldFund,
                      "FundsWithdrawn"
                  )
              })
          })
      })
