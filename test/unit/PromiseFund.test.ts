import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { PromiseFund } from "../../typechain-types/"

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
                promiseFund = promiseFundContract.connect(user)
                assetToken = assetTokenContract.connect(user)

                const originalFundAmount = await promiseFund.getFundAmount(user.address)
                const originalFundsRaised = await promiseFund.getTotalFunds();
                const approveTx = await assetToken.approve(
                    promiseFund.address,
                    fundValueWithDecimals
                )
                await approveTx.wait(1)

                const fundTx = await promiseFund.fund(fundValueWithDecimals)
                await fundTx.wait(1)

                const afterFundAmount = await promiseFund.getFundAmount(user.address)
                const afterFundsRaised = await promiseFund.getTotalFunds()

                assert.equal(afterFundAmount.toString(), originalFundAmount.add(fundValueWithDecimals).toString())
                assert.equal(afterFundsRaised.toString(), originalFundsRaised.add(fundValueWithDecimals).toString(), assetToken.balanceOf(promiseFund.address))
            })
            it("fails when an owner withdraws in the wrong state", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.setState(3)

                await expect(
                    promiseFund.withdrawProceeds(1)
                ).to.be.revertedWith("PromiseFund__CantWithdrawOwner")
            })
            it("fails when an owner tries to withdraw too much", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.setState(2)

                await expect(
                    promiseFund.withdrawProceeds(1)
                ).to.be.revertedWith("PromiseFund__WithdrawProceedsGreaterThanBalance")
            })
            it("fails when a funder tries to withdraw in the wrong state", async function () {
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.setState(2)

                await expect(
                    promiseFund.withdrawProceedsFunder(1)
                ).to.be.revertedWith("PromiseFund__CantWithdrawFunder")
            })
            it("fails when a funder tries to withdraw too much", async function () {
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.setState(3)

                await expect(
                    promiseFund.withdrawProceedsFunder(1)
                ).to.be.revertedWith("PromiseFund__WithdrawFundsGreaterThanBalance")
            })
            it("fails when a funder tries to fund when the state isn't pending", async function () {
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.setState(3)

                await expect(
                    promiseFund.fund(fundValueWithDecimals)
                ).to.be.revertedWith("PromiseFund__NotFundingPeriod")
            })
            it("correctly allows the owner to withdraw proceeds in the correct state", async function () {
                promiseFund = promiseFundContract.connect(user)
                assetToken = assetTokenContract.connect(user)

                const approveTx = await assetToken.approve(
                    promiseFund.address,
                    fundValueWithDecimals
                )
                await approveTx.wait(1)

                const fundTx = await promiseFund.fund(fundValueWithDecimals)
                await fundTx.wait(1)

                const beforeContractBalance = await promiseFund.getTotalFunds()
                const beforeDeployerBalance = await assetToken.balanceOf(deployer.address)

                await promiseFund.setState(2)

                promiseFund = promiseFundContract.connect(deployer)

                const withdrawTx = await promiseFund.withdrawProceeds(fundValueWithDecimals)
                await withdrawTx.wait(1)

                const afterContractBalance = await promiseFund.getTotalFunds()
                const afterDeployerBalance = await assetToken.balanceOf(deployer.address)
                assert.equal(beforeContractBalance.sub(fundValueWithDecimals).toString(), afterContractBalance.toString())
                assert.equal(beforeDeployerBalance.add(fundValueWithDecimals).toString(), afterDeployerBalance.toString())
            })
            it("correctly allows a funder to withdraw what they funded in the correct state", async function () {
                promiseFund = promiseFundContract.connect(user)
                assetToken = assetTokenContract.connect(user)

                const beforeFunderBalance = await assetToken.balanceOf(user.address)

                const approveTx = await assetToken.approve(
                    promiseFund.address,
                    fundValueWithDecimals
                )
                await approveTx.wait(1)

                const fundTx = await promiseFund.fund(fundValueWithDecimals)
                await fundTx.wait(1)


                await promiseFund.setState(3)

                const withdrawTx = await promiseFund.withdrawProceedsFunder(fundValueWithDecimals)
                await withdrawTx.wait(1)

                const afterFunderBalance = await assetToken.balanceOf(user.address)

                assert.equal(beforeFunderBalance.toString(), afterFunderBalance.toString())
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

                await promiseFund.setState(3)

                await expect(
                    promiseFund.startVote(15)
                ).to.be.revertedWith("PromiseFund__StateNotPending")
            })
            it("fails when the fund state isn't voting and a user tries to vote", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.setState(0)

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
                promiseFund = promiseFundContract.connect(user)
                assetToken = assetTokenContract.connect(user)

                await promiseFund.setState(0)

                const approveTx = await assetToken.approve(
                    promiseFund.address,
                    fundValueWithDecimals
                )
                await approveTx.wait(1)

                const fundTx = await promiseFund.fund(fundValueWithDecimals)
                await fundTx.wait(1)

                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.submitVote(true)

                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund__NoVotesLeft")
            })
            it("properly sets the end date", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.setState(0)

                await promiseFund.startVote(15)
                const voteEnd = await promiseFund.getVoteEnd()
                assert.notEqual(voteEnd.toNumber(), 0)
            })
            it("properly allows a funder to vote in support", async function () {
                promiseFund = promiseFundContract.connect(user)
                assetToken = assetTokenContract.connect(user)

                const votesProBefore = await promiseFund.getVotesPro()
                await promiseFund.setState(0)

                const approveTx = await assetToken.approve(
                    promiseFund.address,
                    fundValueWithDecimals
                )
                await approveTx.wait(1)

                const fundTx = await promiseFund.fund(fundValueWithDecimals)
                await fundTx.wait(1)

                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.submitVote(true)

                const votesProAfter = await promiseFund.getVotesPro()
                assert.equal(votesProAfter.toNumber(), votesProBefore.add(1).toNumber())
            })
            it("properly allows a funder to vote against", async function () {
                promiseFund = promiseFundContract.connect(user)
                assetToken = assetTokenContract.connect(user)

                const votesConBefore = await promiseFund.getVotesCon()
                await promiseFund.setState(0)

                const approveTx = await assetToken.approve(
                    promiseFund.address,
                    fundValueWithDecimals
                )
                await approveTx.wait(1)

                const fundTx = await promiseFund.fund(fundValueWithDecimals)
                await fundTx.wait(1)

                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.submitVote(false)

                const votesConAfter = await promiseFund.getVotesCon()
                assert.equal(votesConAfter.toNumber(), votesConBefore.add(1).toNumber())
            })
        })
    })
