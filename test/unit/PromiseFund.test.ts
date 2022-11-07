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
        let timestamp: number
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
                assetToken.address, 4, 600
            )
            const txReceipt = await createPromiseFundTx.wait(1)
            const blockNum = txReceipt.blockNumber
            const block = await ethers.provider.getBlock(blockNum)
            timestamp = block.timestamp
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
            it("initializes the asset address correctly", async () => {
                promiseFund = await promiseFundContract.connect(user)
                const response = await promiseFund.getAssetAddress()
                assert.equal(
                    response.toString().toLowerCase(),
                    assetToken.address.toString().toLowerCase()
                )
            })
            it("initializes the tranches correctly", async () => {
                promiseFund = await promiseFundContract.connect(user)
                const response = await promiseFund.getTranches()
                //set length of milestones correctly
                assert.equal(response.length, 4)
                //sets time of beginning of tranche correctly
                assert.equal(response[0].startTime.toNumber(), timestamp)
            })
            it("sets milestone duration correctly", async () => {
                promiseFund = await promiseFundContract.connect(user)
                const response = await promiseFund.getTranches()
                //set duration of milestones correctly
                //assert.equal(response[0].milestoneDuration.toNumber(), 10368000) -test if over maxDuration works
                assert.equal(response[0].milestoneDuration.toNumber(), 600)

            })
        })


        describe("Funding and Withdrawal Tests", function () {
            it("properly adds a funder", async function () {
                promiseFund = promiseFundContract.connect(user)
                assetToken = assetTokenContract.connect(user)

                //tests total amount in the funder amount array equals the total amount in the contract/donated
                //tests each milestone tranche equals the amount in the funder array tranche
                //ex: user donates 1 dollar. Milestones 1-4 each have .25 and the users amount array in indices 0-3 have 0.25
                //to keep track of which rounds they funded to
                const originalFundAmount = await promiseFund.getFundAmount(user.address)
                const originalFundsRaised = await promiseFund.getTotalFunds()
                const originalMilestoneAmountInTrancheOne = (await promiseFund.getTrancheAmountRaised(0))
                const originalFunderAmountInTrancheOne = (await promiseFund.getFunderTrancheAmountRaised(user.address, 0))
                const originalMilestoneAmountInTrancheTwo = (await promiseFund.getTrancheAmountRaised(1))
                const originalFunderAmountInTrancheTwo = (await promiseFund.getFunderTrancheAmountRaised(user.address, 1))
                const originalMilestoneAmountInTrancheThree = (await promiseFund.getTrancheAmountRaised(2))
                const originalFunderAmountInTrancheThree = (await promiseFund.getFunderTrancheAmountRaised(user.address, 2))
                const originalMilestoneAmountInTrancheFour = (await promiseFund.getTrancheAmountRaised(3))
                const originalFunderAmountInTrancheFour = (await promiseFund.getFunderTrancheAmountRaised(user.address, 3))

                const approveTx = await assetToken.approve(
                    promiseFund.address,
                    fundValueWithDecimals
                )
                await approveTx.wait(1)

                const fundTx = await promiseFund.fund(fundValueWithDecimals)
                await fundTx.wait(1)

                const afterFundAmount = await promiseFund.getFundAmount(user.address)
                const afterFundsRaised = await promiseFund.getTotalFunds()
                const afterMilestoneAmountInTrancheOne = (await promiseFund.getTrancheAmountRaised(0))
                const afterFunderAmountInTrancheOne = (await promiseFund.getFunderTrancheAmountRaised(user.address, 0))
                const afterMilestoneAmountInTrancheTwo = (await promiseFund.getTrancheAmountRaised(1))
                const afterFunderAmountInTrancheTwo = (await promiseFund.getFunderTrancheAmountRaised(user.address, 1))
                const afterMilestoneAmountInTrancheThree = (await promiseFund.getTrancheAmountRaised(2))
                const afterFunderAmountInTrancheThree = (await promiseFund.getFunderTrancheAmountRaised(user.address, 2))
                const afterMilestoneAmountInTrancheFour = (await promiseFund.getTrancheAmountRaised(3))
                const afterFunderAmountInTrancheFour = (await promiseFund.getFunderTrancheAmountRaised(user.address, 3))

                assert.equal(
                    afterFundAmount.toString(),
                    originalFundAmount.add(fundValueWithDecimals).toString()
                )
                assert.equal(
                    afterFundsRaised.toString(),
                    originalFundsRaised.add(fundValueWithDecimals).toString(),
                    assetToken.balanceOf(promiseFund.address)
                )
                assert.equal(
                    originalMilestoneAmountInTrancheOne.toString(),
                    originalFunderAmountInTrancheOne.toString()
                )
                assert.equal(
                    afterMilestoneAmountInTrancheOne.toString(),
                    afterFunderAmountInTrancheOne.toString()
                )
                assert.equal(
                    originalMilestoneAmountInTrancheTwo.toString(),
                    originalFunderAmountInTrancheTwo.toString()
                )
                assert.equal(
                    afterMilestoneAmountInTrancheTwo.toString(),
                    afterFunderAmountInTrancheTwo.toString()
                )
                assert.equal(
                    originalMilestoneAmountInTrancheThree.toString(),
                    originalFunderAmountInTrancheThree.toString()
                )
                assert.equal(
                    afterMilestoneAmountInTrancheThree.toString(),
                    afterFunderAmountInTrancheThree.toString()
                )
                assert.equal(
                    originalMilestoneAmountInTrancheFour.toString(),
                    originalFunderAmountInTrancheFour.toString()
                )
                assert.equal(
                    afterMilestoneAmountInTrancheFour.toString(),
                    afterFunderAmountInTrancheFour.toString()
                )
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
                ).to.be.revertedWith("PromiseFund__WithdrawFundsNotEqualToBalance")
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
                const tranche = await promiseFund.getCurrentTranche()
                const withdrawAmount = await promiseFund.getTrancheAmountRaised(tranche)
                const withdrawTx = await promiseFund.withdrawProceeds(withdrawAmount)
                await withdrawTx.wait(1)

                const afterContractBalance = await promiseFund.getTotalFunds()
                const afterDeployerBalance = await assetToken.balanceOf(deployer.address)
                assert.equal(beforeContractBalance.sub(withdrawAmount).toString(), afterContractBalance.toString())
                assert.equal(beforeDeployerBalance.add(withdrawAmount).toString(), afterDeployerBalance.toString())
            })
            it("correctly allows a funder to withdraw what they funded in the correct state", async function () {
                const beforeFunderBalance = await assetToken.balanceOf(user.address)

                await fund()
                await callVote(false)
                await callVote(false)

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
                    promiseFund.startVote(15)
                ).to.be.revertedWith("PromiseFund_FunderCannotCallForVote")
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

                const tranche = await promiseFund.getCurrentTranche()
                const withdrawAmount = await promiseFund.getTrancheAmountRaised(tranche)

                const beforeDeployerBalance = await assetToken.balanceOf(deployer.address)
                const beforeContractBalance = await promiseFund.getTotalFunds()

                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.withdrawProceeds(withdrawAmount)

                const afterContractBalance = await promiseFund.getTotalFunds()
                const afterDeployerBalance = await assetToken.balanceOf(deployer.address)
                assert.equal(beforeContractBalance.sub(withdrawAmount).toString(), afterContractBalance.toString())
                assert.equal(beforeDeployerBalance.add(withdrawAmount).toString(), afterDeployerBalance.toString())
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


