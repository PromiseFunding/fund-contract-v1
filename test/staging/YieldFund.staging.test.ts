import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, ethers } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { FundFactory, YieldFundAAVE } from "../../typechain-types/"
import * as fs from "fs"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("YieldFund Staging Tests", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress
          const fundValue = 1
          let fundValueWithDecimals = BigNumber.from("1")
          let decimals: number
          let yieldFundAddress: string
          let yieldFundContract: YieldFundAAVE,
              yieldFund: YieldFundAAVE,
              assetToken: any,
              fundFactory: FundFactory
          const chainId = network.config.chainId || 31337

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              fundFactory = await ethers.getContract("FundFactory")
              const abi = fs.readFileSync("./abis/erc20Abi.abi.json", "utf8")
              const assetTokenContract = new ethers.Contract(
                  networkConfig[chainId].assetAddress!,
                  abi,
                  deployer
              )
              assetToken = await assetTokenContract.connect(deployer)
              decimals = await assetToken.decimals()
              fundValueWithDecimals = BigNumber.from((fundValue * 10 ** decimals).toString())
          })
          describe("Funding and Withdrawal", function () {
              it("Emits an event when creating a new contract", async function () {
                  await expect(
                      fundFactory.createYieldFundAAVE(
                          0,
                          networkConfig[chainId].assetAddress!,
                          networkConfig[chainId].aaveTokenAddress!,
                          networkConfig[chainId].poolAddress!
                      )
                  ).to.emit(fundFactory, "Created")

                  yieldFundAddress = await fundFactory.getYieldFundAAVE(0)
                  yieldFundContract = await ethers.getContractAt("YieldFundAAVE", yieldFundAddress)
              })
              let fundAmount: BigNumber, originalFundAmount: BigNumber

              it("correctly fund adds a funder and correctly gets aTokens back", async function () {
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
                      (fundAmount.toNumber() - originalFundAmount.toNumber()).toString(),
                      fundValueWithDecimals.toString()
                  )
              })
              it("correctly withdraws the funders tokens", async function () {
                  yieldFund = yieldFundContract.connect(deployer)
                  fundAmount = await yieldFund.getFundAmount(deployer.address)
                  const originalBalance = (
                      await assetToken.balanceOf(await deployer.address)
                  ).toNumber()
                  const withdrawTx = await yieldFund.withdrawFundsFromPool(fundAmount)
                  await withdrawTx.wait(1)
                  const afterFundAmount = await yieldFund.getFundAmount(deployer.address)
                  const balance = (await assetToken.balanceOf(await deployer.address)).toNumber()
                  // Ensure the balance in the contract is now zero
                  assert.equal(afterFundAmount.toNumber(), 0)
                  // ensure the user's wallet is replenished
                  assert.equal(balance, fundAmount.toNumber() + originalBalance)
              })
          })
      })
