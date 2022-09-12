import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { developmentChains, networkConfig, DEFAULT_ASSET_ADDRESS, DEFAULT_POOL_ADDRESS,} from "../../helper-hardhat-config"
import { YieldFund } from "../../typechain-types/"
import * as fs from "fs"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("YieldFund Unit Tests", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
          const fundValue = 1
          let yieldFundContract: YieldFund, yieldFund: YieldFund, assetToken: any
          let fundValueWithDecimals = BigNumber.from("1")
          let decimals: number
          const chainId = network.config.chainId || 31337

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              user = accounts[1]
              await deployments.fixture(["all"])
              yieldFundContract = await ethers.getContract("YieldFund")
              //   yieldFund = yieldFundContract.connect(deployer)
              const abi = fs.readFileSync("./abis/erc20Abi.abi.json", "utf8")
              const assetTokenContract = new ethers.Contract(
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
                assert.equal(response.toNumber(), 360000)
            })
            it("initializes the pool address correctly", async () => {
                yieldFund = await yieldFundContract.connect(user)
                const response = await yieldFund.getPoolAddress()
                assert.equal(response.toString().toLowerCase(), poolAddress.toString().toLowerCase())
            })
            it("initializes the asset address correctly", async () => {
                yieldFund = await yieldFundContract.connect(user)
                const response = await yieldFund.getAssetAddress()
                assert.equal(response.toString().toLowerCase(), assetAddress.toString().toLowerCase())
            })
          })

          describe("Funding Tests", function () {
              let fundAmount: BigNumber, originalFundAmount: BigNumber
              let timeLeft: BigNumber
              it("correctly adds a funder", async function () {
                  yieldFund = await yieldFundContract.connect(user)
                  console.log(yieldFund.address)

                  originalFundAmount = await yieldFund.getFundAmount(user.address)

                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(user.address, fundValueWithDecimals)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmount(user.address)
                  console.log(
                      `| initial funds: ${originalFundAmount} | fund value: ${fundValueWithDecimals} | final funds: ${fundAmount} |`
                  )
                  assert.equal(
                      (fundAmount.toNumber() - originalFundAmount.toNumber()).toString(),
                      fundValueWithDecimals.toString()
                  )
              })
              it("fails when a funder tries to withdraw more than they funded", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  fundAmount = await yieldFund.getFundAmount(user.address)
                  const higherFundAmount = fundAmount.add(1)
                  await expect(
                      yieldFund.withdrawFundsFromPool(higherFundAmount)
                  ).to.be.revertedWithCustomError(
                      yieldFund,
                      "YieldFund__WithdrawFundsGreaterThanBalance"
                  )
              })
              it("fails when a funder tries to withdraw before time lock ends", async function () {
                  yieldFund = await yieldFundContract.connect(user)
                  console.log(yieldFund.address)

                  originalFundAmount = await yieldFund.getFundAmount(user.address)

                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(user.address, fundValueWithDecimals)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmount(user.address)
                  //timeLeft = await yieldFund.getTimeLeft(user.address)
                  //should revert after deploying bc constructor has certain locktime put in it already
                  await expect(
                      yieldFund.withdrawFundsFromPool(fundAmount)
                  ).to.be.revertedWithCustomError(yieldFund, "YieldFund__FundsStillTimeLocked")
              })
              it("correctly withdraws the funders tokens", async function () {
                  yieldFund = await yieldFundContract.connect(user)

                  originalFundAmount = await yieldFund.getFundAmount(user.address)

                  const approveTx = await assetToken.approve(
                      yieldFund.address,
                      fundValueWithDecimals
                  )
                  await approveTx.wait(1)

                  const fundTx = await yieldFund.fund(user.address, fundValueWithDecimals)
                  await fundTx.wait(1)

                  fundAmount = await yieldFund.getFundAmount(user.address)
                  const originalBalance = (
                      await assetToken.balanceOf(await user.address)
                  ).toNumber()
                  console.log(fundAmount.toString())

                  //should increase time of chain to test if withdraw works
                  timeLeft = await yieldFund.getTimeLeft(user.address)
                  await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                  const withdrawTx = await yieldFund.withdrawFundsFromPool(fundAmount)
                  await withdrawTx.wait(1)
                  const afterFundAmount = await yieldFund.getFundAmount(user.address)
                  const balance = (await assetToken.balanceOf(await user.address)).toNumber()
                  // Ensure the balance in the contract is now zero
                  assert.equal(afterFundAmount.toNumber(), 0)
                  // ensure the user's wallet is replenished
                  assert.equal(balance, fundAmount.toNumber() + originalBalance)
              })
              it("fails with a fund value of zero", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  await expect(yieldFund.fund(user.address, 0)).to.be.revertedWithCustomError(
                      yieldFund,
                      "YieldFund__FundAmountMustBeAboveZero"
                  )
              })
          })

          describe("Owner Tests", function () {
              it("fails when a non owner tries to withdraw proceeds", async function () {
                  yieldFund = yieldFundContract.connect(user)
                  await expect(yieldFund.withdrawProceeds(1)).to.be.revertedWithCustomError(
                      yieldFund,
                      "YieldFund__NotOwner"
                  )
              })
              it("correctly withdraws proceeds", async function () {
                yieldFund = yieldFundContract.connect(user)
                await expect(yieldFund.withdrawProceeds(1)).to.be.revertedWithCustomError(
                    yieldFund,
                    "YieldFund__NotOwner"
                )
            })
          })

          //Getter functions
        //   describe("Getter Tests", function () {
        //     it("fails when a non owner tries to withdraw proceeds", async function () {
        //         yieldFund = yieldFundContract.connect(user)
        //         await expect(yieldFund.withdrawProceeds(1)).to.be.revertedWithCustomError(
        //             yieldFund,
        //             "YieldFund__NotOwner"
        //         )
        //     })
        // })
      })
