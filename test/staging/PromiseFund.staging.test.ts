import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, ethers } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { PromiseFund, PromiseFundFactory } from "../../typechain-types/"
import * as fs from "fs"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("PromiseFund Staging Tests", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
          const fundValue = 1
          let promiseFundContract: PromiseFund,
              promiseFund: PromiseFund,
              assetToken: any,
              assetTokenContract: any
          let promiseFactoryContract: PromiseFundFactory, promiseFactory: PromiseFundFactory

          let fundValueWithDecimals = BigNumber.from("1")
          let decimals: number
          const chainId = network.config.chainId || 31337

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              user = accounts[1]

              promiseFactoryContract = await ethers.getContract("PromiseFundFactory")
              promiseFactory = await promiseFactoryContract.connect(deployer)
              const abi = fs.readFileSync("./abis/erc20Abi.abi.json", "utf8")
              assetTokenContract = new ethers.Contract(
                  networkConfig[chainId].assetAddress!,
                  abi,
                  deployer
              )
              assetToken = await assetTokenContract.connect(deployer)
              decimals = await assetToken.decimals()
              fundValueWithDecimals = BigNumber.from((fundValue * 10 ** decimals).toString())
          })
          describe("Set up Promise Fund Contract", function () {
              it("Emits an event when creating a new contract", async function () {
                  await expect(
                      promiseFactory.createPromiseFund(
                          assetToken.address, [100, 400, 20368000, 100]
                      )
                  ).to.emit(promiseFactory, "Created")

                  const promiseFundAddress = await promiseFactory.getPromiseFund(0)
                  promiseFundContract = await ethers.getContractAt(
                      "PromiseFund",
                      promiseFundAddress
                  )
              })
          })
      })
