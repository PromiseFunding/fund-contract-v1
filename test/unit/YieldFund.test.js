const { assert, expect } = require("chai")
const { BigNumber } = require("ethers")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Nft Marketplace Unit Tests", function () {
          const fundValue = BigNumber.from("1000000000000000000")
          let yieldFundContract, yieldFund
          beforeEach(async () => {
              accounts = await ethers.getSigners() // could also do with getNamedAccounts
              deployer = accounts[0]
              user = accounts[1]
              await deployments.fixture(["all"])
              yieldFundContract = await ethers.getContract("YieldFund")
              yieldFund = yieldFundContract.connect(deployer)
          })

          it("correctly adds a funder", async function () {
              yieldFund = yieldFundContract.connect(user)
              await yieldFund.fund(fundValue)
              const fundAmount = await yieldFund.getFundAmount(user.address)
              assert.equal(fundAmount.toString(), fundValue.toString())
          })
      })
