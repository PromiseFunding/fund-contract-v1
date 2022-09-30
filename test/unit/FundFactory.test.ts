import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { FundFactory, YieldFund } from "../../typechain-types/"
import { MockERC20Token } from "../../typechain-types/contracts/test"

// These tests are built to run on the local hardhat network using the mocks
!(network.name == "hardhat")
    ? describe.skip
    : describe("FundFactory Unit Tests", function () {
          let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
          const fundValue = 1
          let fundFactoryContract: FundFactory,
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
              const fundFactory = await ethers.getContract("FundFactory")
              const aTokenContract = await ethers.getContract("MockAToken")
              aToken = await aTokenContract.connect(deployer)
              decimals = await aToken.decimals()
              fundValueWithDecimals = BigNumber.from((fundValue * 10 ** decimals).toString())
          })
      })
