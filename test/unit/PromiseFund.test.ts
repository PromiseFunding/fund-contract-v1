import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { PromiseFund } from "../../typechain-types/"
import { networkConfig, DEFAULT_ASSET_ADDRESS } from "../../helper-hardhat-config"

// These tests are built to run on the local hardhat network using the mocks
!(network.name == "hardhat")
    ? describe.skip
    : describe("PromiseFund Unit Tests", function () {
        let accounts: SignerWithAddress[], deployer: SignerWithAddress, user: SignerWithAddress
        const fundValue = 1
        let promiseFundContract: PromiseFund, promiseFund: PromiseFund, assetToken: any, assetTokenContract: any
        let fundValueWithDecimals = BigNumber.from("1")
        let decimals: number
        const chainId = network.config.chainId || 31337

        beforeEach(async function () {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            user = accounts[1]
            await deployments.fixture(["all"])

            const fundFactory = await ethers.getContract("PromiseFundFactory")
            assetTokenContract = await ethers.getContract("MockERC20Token")
            assetToken = await assetTokenContract.connect(deployer)
            const createPromiseFundTx = await fundFactory.createPromiseFund(
                assetToken.address
            )
            const txReceipt = await createPromiseFundTx.wait(1)
            const promiseFundAddress = txReceipt.events[txReceipt.events.length - 1].args.fundAddress
            promiseFundContract = await ethers.getContractAt("PromiseFund", promiseFundAddress)
            promiseFund = await promiseFundContract.connect(deployer)

            decimals = await assetToken.decimals()
            fundValueWithDecimals = BigNumber.from((fundValue * 10 ** decimals).toString())

            const approveTx = await assetToken.approve(
                deployer.address,
                fundValueWithDecimals
            )
            await approveTx.wait(1)

            assetToken.transferFrom(deployer.address, user.address, fundValueWithDecimals)
        })

        describe("constructor", function () {
            it("correctly sets the state", async function () {
                const state = await promiseFund.getState()
                assert.equal(state, 0)
            })
        })
        describe("Funding and Withdrawal Tests", function () {
            it("properly adds a funder", async function () {
                const originalFundAmount = await promiseFund.getFundAmount(user.address)
                const originalFundsRaised = await promiseFund.getTotalFunds();

                await fund()

                const afterFundAmount = await promiseFund.getFundAmount(user.address)
                const afterFundsRaised = await promiseFund.getTotalFunds()

                assert.equal(afterFundAmount.toString(), originalFundAmount.add(fundValueWithDecimals).toString())
                assert.equal(afterFundsRaised.toString(), originalFundsRaised.add(fundValueWithDecimals).toString(), assetToken.balanceOf(promiseFund.address))
            })
            it("fails when an owner withdraws in the wrong state", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await expect(
                    promiseFund.withdrawProceeds(1)
                ).to.be.revertedWith("PromiseFund__CantWithdrawOwner")
            })
            it("fails when an owner tries to withdraw too much", async function () {
                await fund()
                await callVote(true)

                promiseFund = promiseFundContract.connect(deployer)

                await expect(
                    promiseFund.withdrawProceeds(fundValueWithDecimals.add(1))
                ).to.be.revertedWith("PromiseFund__WithdrawProceedsGreaterThanBalance")
            })
            it("fails when a funder tries to withdraw in the wrong state", async function () {
                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)

                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.withdrawProceedsFunder(1)
                ).to.be.revertedWith("PromiseFund__CantWithdrawFunder")
            })
            it("fails when a funder tries to withdraw too much", async function () {
                await fund()

                await callVote(false)
                await callVote(false)

                await expect(
                    promiseFund.withdrawProceedsFunder(fundValueWithDecimals.add(1))
                ).to.be.revertedWith("PromiseFund__WithdrawFundsGreaterThanBalance")
            })
            it("fails when a funder tries to fund when the state isn't pending", async function () {
                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)

                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.fund(fundValueWithDecimals)
                ).to.be.revertedWith("PromiseFund__NotFundingPeriod")
            })
            it("correctly allows the owner to withdraw proceeds in the correct state", async function () {
                await fund()

                const beforeContractBalance = await promiseFund.getTotalFunds()
                const beforeDeployerBalance = await assetToken.balanceOf(deployer.address)

                await callVote(true)

                promiseFund = promiseFundContract.connect(deployer)

                const withdrawTx = await promiseFund.withdrawProceeds(fundValueWithDecimals)
                await withdrawTx.wait(1)

                const afterContractBalance = await promiseFund.getTotalFunds()
                const afterDeployerBalance = await assetToken.balanceOf(deployer.address)
                assert.equal(beforeContractBalance.sub(fundValueWithDecimals).toString(), afterContractBalance.toString())
                assert.equal(beforeDeployerBalance.add(fundValueWithDecimals).toString(), afterDeployerBalance.toString())
            })
            it("correctly allows a funder to withdraw what they funded in the correct state", async function () {
                const beforeFunderBalance = await assetToken.balanceOf(user.address)

                await fund()
                await callVote(false)
                await callVote(false)

                const withdrawTx = await promiseFund.withdrawProceedsFunder(fundValueWithDecimals)
                await withdrawTx.wait(1)

                const afterFunderBalance = await assetToken.balanceOf(user.address)

            })
        })
        describe("Voting Tests", function () {
            it("fails when a non-owner tries to call a vote", async function () {
                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.startVote(1)
                ).to.be.revertedWith("Ownable: caller is not the owner")
            })
            it("fails when the vote length is too short", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await expect(
                    promiseFund.startVote(1)
                ).to.be.revertedWith("PromiseFund__VoteTooShort")
            })
            it("fails when the fund state isn't pending", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.startVote(15)

                await expect(
                    promiseFund.startVote(15)
                ).to.be.revertedWith("PromiseFund__StateNotPending")
            })
            it("fails when the fund state isn't voting and a user tries to vote", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund__StateNotVoting")
            })
            it("fails when the vote period has ended", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.startVote(15)
                const timeLeft = await promiseFund.getTimeLeftVoting()
                await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund__VoteEnded")
            })
            it("fails when a funder tries to vote twice", async function () {
                await fund()

                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.submitVote(true)

                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund__NoVotesLeft")
            })
            it("fails if someone tries to end the vote in the wrong state", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await expect(
                    promiseFund.endVote()
                ).to.be.revertedWith("PromiseFund__StateNotVoting")
            })
            it("fails if someone tries to end the vote while it is still in the voting period", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.startVote(15)
                await expect(
                    promiseFund.endVote()
                ).to.be.revertedWith("PromiseFund__VoteStillGoing")
            })
            it("properly sets the end date", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.startVote(15)
                const voteEnd = await promiseFund.getVoteEnd()
                assert.notEqual(voteEnd.toNumber(), 0)
            })
            it("properly allows a funder to vote in support", async function () {
                const votesProBefore = await promiseFund.getVotesPro()

                await fund()

                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.submitVote(true)

                const votesProAfter = await promiseFund.getVotesPro()
                assert.equal(votesProAfter.toNumber(), votesProBefore.add(1).toNumber())
            })
            it("properly allows a funder to vote against", async function () {
                const votesConBefore = await promiseFund.getVotesCon()

                await fund()

                await callVote(false)

                const votesConAfter = await promiseFund.getVotesCon()
                assert.equal(votesConAfter.toNumber(), votesConBefore.add(1).toNumber())
            })
            it("properly ends the vote in support of the owner", async function () {
                await fund()

                await callVote(true)

                const state = await promiseFund.getState()
                assert.equal(state, 2)
            })
            it("properly ends the vote against the owner", async function () {
                await fund()
                await callVote(false)
                await callVote(false)

                const state = await promiseFund.getState()
                assert.equal(state, 3)
            })
            it("properly allows the owner to withdraw proceeds after failing the first vote and succeeding on the second", async function () {
                promiseFund = promiseFundContract.connect(user)

                await fund()
                await callVote(false)
                await callVote(true)

                const beforeDeployerBalance = await assetToken.balanceOf(deployer.address)
                const beforeContractBalance = await promiseFund.getTotalFunds()

                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.withdrawProceeds(beforeContractBalance)

                const afterContractBalance = await promiseFund.getTotalFunds()
                const afterDeployerBalance = await assetToken.balanceOf(deployer.address)
                assert.equal(beforeContractBalance.sub(fundValueWithDecimals).toString(), afterContractBalance.toString())
                assert.equal(beforeDeployerBalance.add(fundValueWithDecimals).toString(), afterDeployerBalance.toString())
            })
        })

        // --------------------------------------------------------------------------
        // HELPER FUNCTIONS - These two we're called over and over again, so to save
        // space I made them their own functions to be used repeatedly.
        // --------------------------------------------------------------------------

        // Execute a vote from start to finish resulting in support of the owner
        // if voteResult is true and against if voteResult is false
        async function callVote(voteResult: boolean) {
            promiseFund = promiseFundContract.connect(deployer)
            await promiseFund.startVote(15)
            promiseFund = promiseFundContract.connect(user)

            await promiseFund.submitVote(voteResult)

            const timeLeft = await promiseFund.getTimeLeftVoting()
            await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

            await promiseFund.endVote()
        }

        // Fund from the user account using the fundValue specified at the beginning of the file.
        async function fund() {
            promiseFund = promiseFundContract.connect(user)
            assetToken = assetTokenContract.connect(user)

            const approveTx = await assetToken.approve(
                promiseFund.address,
                fundValueWithDecimals
            )
            await approveTx.wait(1)

            const fundTx = await promiseFund.fund(fundValueWithDecimals)
            await fundTx.wait(1)
        }
    })


