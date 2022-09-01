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

          it("correctly adds a funder", async function () {
              yieldFund = yieldFundContract.connect(user)
              await yieldFund.fund(deployer.address, fundValue)
              const fundAmount = await yieldFund.getFundAmount(user.address)
              assert.equal(fundAmount.toString(), fundValue.toString())
          })
      })
