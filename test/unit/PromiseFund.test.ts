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
        const fundValue = 2 //total amount allowed
        const oneFundValue = 1 //amount funded one time on fund()
        let promiseFundContract: PromiseFund, promiseFund: PromiseFund, assetToken: any, assetTokenContract: any
        let fundValueWithDecimals = BigNumber.from("2")
        let oneFundValueWithDecimals = BigNumber.from("1")
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
            oneFundValueWithDecimals = BigNumber.from((oneFundValue * 10 ** decimals).toString())

            const approveTx = await assetToken.approve(
                deployer.address,
                fundValueWithDecimals.mul(5)
            )
            await approveTx.wait(1)

            assetToken.transferFrom(deployer.address, user.address, fundValueWithDecimals)
            assetToken.transferFrom(deployer.address, accounts[1].address, fundValueWithDecimals)
            assetToken.transferFrom(deployer.address, accounts[2].address, fundValueWithDecimals)
            assetToken.transferFrom(deployer.address, accounts[3].address, fundValueWithDecimals)
            assetToken.transferFrom(deployer.address, accounts[4].address, fundValueWithDecimals)
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
            it("properly adds a current tranche funder followed by funding to all tranches", async function () {
                promiseFund = promiseFundContract.connect(user)

                await currentFund()
                await fund()

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
                    fundValueWithDecimals.toString()
                )
                assert.equal(
                    afterFundsRaised.toString(),
                    fundValueWithDecimals.toString(),
                )
                assert.equal(
                    afterMilestoneAmountInTrancheOne.toString(),
                    afterFunderAmountInTrancheOne.toString()
                )
                assert.equal(
                    afterMilestoneAmountInTrancheTwo.toString(),
                    afterFunderAmountInTrancheTwo.toString()
                )
                assert.equal(
                    afterMilestoneAmountInTrancheThree.toString(),
                    afterFunderAmountInTrancheThree.toString()
                )
                assert.equal(
                    afterMilestoneAmountInTrancheFour.toString(),
                    afterFunderAmountInTrancheFour.toString()
                )
                assert.equal(afterMilestoneAmountInTrancheOne.toString(), "1250000000000000000")
                assert.equal(afterMilestoneAmountInTrancheTwo.toString(), "250000000000000000")
                assert.equal(afterMilestoneAmountInTrancheThree.toString(), "250000000000000000")
                assert.equal(afterMilestoneAmountInTrancheFour.toString(), "250000000000000000")
            })
            it("fails when an owner withdraws in the wrong state", async function () {
                promiseFund = promiseFundContract.connect(deployer)

                await expect(
                    promiseFund.withdrawProceeds()
                ).to.be.revertedWith("PromiseFund__CantWithdrawOwner")
            })
            // it("fails when an owner tries to withdraw too much or too little", async function () {
            //     await fund()
            //     await callVote(true)

            //     promiseFund = promiseFundContract.connect(deployer)

            //     await expect(
            //         promiseFund.withdrawProceeds(fundValueWithDecimals.add(1))
            //     ).to.be.revertedWith("PromiseFund__WithdrawProceedsNotEqualToBalance")
            //     await expect(
            //         promiseFund.withdrawProceeds(fundValueWithDecimals.sub(1))
            //     ).to.be.revertedWith("PromiseFund__WithdrawProceedsNotEqualToBalance")
            // })
            it("fails when a funder tries to withdraw in the wrong state", async function () {
                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)

                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.withdrawProceedsFunder()
                ).to.be.revertedWith("PromiseFund__CantWithdrawFunder")
            })
            // it("fails when a funder tries to withdraw too much or too little", async function () {
            //     await fund()

            //     await callVote(false)
            //     await callVote(false)
            //     await expect(
            //         promiseFund.withdrawProceedsFunder(oneFundValueWithDecimals.add(1))
            //     ).to.be.revertedWith("PromiseFund__WithdrawFundsNotEqualToBalance")
            //     await expect(
            //         promiseFund.withdrawProceedsFunder(oneFundValueWithDecimals.sub(1))
            //     ).to.be.revertedWith("PromiseFund__WithdrawFundsNotEqualToBalance")
            // })
            it("fails when a funder tries to fund when the state isn't pending", async function () {
                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)

                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.fund(fundValueWithDecimals)
                ).to.be.revertedWith("PromiseFund__NotFundingPeriod")
            })
            it("correctly allows the owner to withdraw proceeds in the correct state with exact amount if not last tranche", async function () {
                await fund()

                const beforeContractBalance = await promiseFund.getTotalFunds()
                const beforeDeployerBalance = await assetToken.balanceOf(deployer.address)

                await callVote(true)
                // const prevstate = await promiseFund.getState()
                // console.log(prevstate)

                promiseFund = promiseFundContract.connect(deployer)
                const tranche = await promiseFund.getCurrentTranche()
                
                
                const withdrawAmount = await promiseFund.getTrancheAmountRaised(tranche)

                const withdrawTx = await promiseFund.withdrawProceeds()

                const withdrawTxReceipt = await withdrawTx.wait(1)
                const blockNum1 = withdrawTxReceipt.blockNumber
                const block = await ethers.provider.getBlock(blockNum1)
                timestamp = block.timestamp

                const response = await promiseFund.getTranches()
                const state = await promiseFund.getState()

                const aftertranche = await promiseFund.getCurrentTranche()
                const trancheAmountAfter = await promiseFund.getTrancheAmountRaised(tranche)
                const votesPro = await promiseFund.getVotesPro()
                const votesCon = await promiseFund.getVotesCon()
                const votesTried = await promiseFund.getVotesTried()
                const funderCallVote = await promiseFund.getFunderCalledVote()
                const afterContractBalance = await promiseFund.getTotalFunds()
                const afterDeployerBalance = await assetToken.balanceOf(deployer.address)
                assert.equal(beforeContractBalance.sub(withdrawAmount).toString(), afterContractBalance.toString())
                assert.equal(beforeDeployerBalance.add(withdrawAmount).toString(), afterDeployerBalance.toString())
                assert.equal(trancheAmountAfter.toString(), "0")
                assert.equal(tranche.toString(), (aftertranche-1).toString())
                assert.equal(timestamp, response[aftertranche].startTime.toNumber())
                assert.equal(response[aftertranche].milestoneDuration.toNumber(), 600)
                assert.equal(state, 0)
                assert.equal(votesPro.toNumber(), 0)
                assert.equal(votesCon.toNumber(), 0)
                assert.equal(votesTried.toNumber(), 0)
                assert.equal(funderCallVote, false)
            })
            it("correctly allows the owner to withdraw proceeds in the correct state with exact amount if in the last tranche", async function () {
                //votes tried, votes pro, fund state, and tranche should all be not changing after the transaction
                await fund()

                const beforeContractBalance = await promiseFund.getTotalFunds()
                const beforeDeployerBalance = await assetToken.balanceOf(deployer.address)
                console.log(beforeDeployerBalance)

                await callVote(true)

                let sum : BigNumber = BigNumber.from("0")

                promiseFund = promiseFundContract.connect(deployer)

                const tranche = await promiseFund.getCurrentTranche()
                console.log(tranche + "0")
                const withdrawAmount = await promiseFund.getTrancheAmountRaised(tranche)
                console.log(withdrawAmount)
                sum = sum.add(withdrawAmount)
                const withdrawTx = await promiseFund.withdrawProceeds() 
                await withdrawTx.wait(1)
                await callVote(true)

                promiseFund = promiseFundContract.connect(deployer)

                const tranche1 = await promiseFund.getCurrentTranche()
                console.log(tranche1 + "1")
                const withdrawAmount1 = await promiseFund.getTrancheAmountRaised(tranche1)
                console.log(withdrawAmount1)
                sum = sum.add(withdrawAmount1)
                const withdrawTx1 = await promiseFund.withdrawProceeds() 
                await withdrawTx1.wait(1)
                await callVote(true)

                promiseFund = promiseFundContract.connect(deployer)

                const tranche2 = await promiseFund.getCurrentTranche()
                console.log(tranche2 + "2")
                const withdrawAmount2 = await promiseFund.getTrancheAmountRaised(tranche2)
                console.log(withdrawAmount2)
                sum = sum.add(withdrawAmount2)
                const withdrawTx2 = await promiseFund.withdrawProceeds() 
                await withdrawTx2.wait(1)

                await fund() //shows how if user funds again at the end it all goes in the last tranche

                await callVote(true)


                promiseFund = promiseFundContract.connect(deployer)
                 
                const tranche3 = await promiseFund.getCurrentTranche()
                console.log(tranche3 + "3")
                const withdrawAmount3 = await promiseFund.getTrancheAmountRaised(tranche3)
                console.log(withdrawAmount3)
                sum = sum.add(withdrawAmount3)
                const withdrawTx3 = await promiseFund.withdrawProceeds() 
                await withdrawTx3.wait(1)

                promiseFund = promiseFundContract.connect(deployer)

                //went through each tranche. Now check last tranche didnt update everything
                const trancheAmountAfter = await promiseFund.getTrancheAmountRaised(tranche3)
                const tranche4 = await promiseFund.getCurrentTranche()
                const state = await promiseFund.getState()

                const votesPro = await promiseFund.getVotesPro()
                const votesCon = await promiseFund.getVotesCon()
                const votesTried = await promiseFund.getVotesTried()
                const afterContractBalance = await promiseFund.getTotalFunds()
                const afterDeployerBalance = await assetToken.balanceOf(deployer.address)
                assert.equal("0", afterContractBalance.toString()) //no funds in contract bc voted yes each time
                assert.equal(beforeDeployerBalance.add(sum).toString(), afterDeployerBalance.toString()) //all funds with owner
                assert.equal(trancheAmountAfter.toString(), "0") //error occuring here
                assert.equal((tranche4).toString(), (tranche3).toString()) //tranche4 shouldnt have updated
                assert.equal(state, 2) //state should still be owner_withdraw
                assert.equal(votesPro.toNumber(), 1) //1 vote for pro called
                assert.equal(votesCon.toNumber(), 0)
                assert.equal(votesTried.toNumber(), 1) //never resets votes tried
            })
            it("correctly allows a funder to withdraw what they funded in the correct state", async function () {
                const beforeFunderBalance = await assetToken.balanceOf(user.address)

                await fund()
                await callVote(false)
                await callVote(false)

                const withdrawTx = await promiseFund.withdrawProceedsFunder()
                await withdrawTx.wait(1)

                const afterFunderBalance = await assetToken.balanceOf(user.address)
                assert.equal(beforeFunderBalance.toString(), afterFunderBalance.toString())
            })
            it("correctly allows a funder to withdraw what they funded in the correct state starting at a non zero tranche", async function () {
                const beforeFunderBalance = await assetToken.balanceOf(user.address)

                await fund()

                //DONT DELETE COMMENTS
                //gets tranche values before withdrawn by owner
                const bwithdrawAmount0 = await promiseFund.getTrancheAmountRaised(0)
                console.log(bwithdrawAmount0)
                const bwithdrawAmount1 = await promiseFund.getTrancheAmountRaised(1)
                console.log(bwithdrawAmount1)
                const bwithdrawAmount2 = await promiseFund.getTrancheAmountRaised(2)
                console.log(bwithdrawAmount2)
                const bwithdrawAmount3 = await promiseFund.getTrancheAmountRaised(3)
                console.log(bwithdrawAmount3)

                await callVote(true)

                let sum : BigNumber = BigNumber.from("0")

                promiseFund = promiseFundContract.connect(deployer)

                const tranche = await promiseFund.getCurrentTranche()
                const withdrawAmount = await promiseFund.getTrancheAmountRaised(tranche)
                sum = sum.add(withdrawAmount)
                const withdrawTx = await promiseFund.withdrawProceeds() 
                await withdrawTx.wait(1)


                await fund()

                //DONT DELETE COMMENTS
                //get tranche values after owner withdrew funds and funder funds again
                const tranche1 = await promiseFund.getCurrentTranche()
                console.log(tranche1)
                const withdrawAmount0 = await promiseFund.getTrancheAmountRaised(tranche)
                console.log(withdrawAmount0)
                const withdrawAmount1 = await promiseFund.getTrancheAmountRaised(tranche1)
                console.log(withdrawAmount1)
                const withdrawAmount2 = await promiseFund.getTrancheAmountRaised(2)
                console.log(withdrawAmount2)
                const withdrawAmount3 = await promiseFund.getTrancheAmountRaised(3)
                console.log(withdrawAmount3)
                
                // double checks getFundAmount working properly
                const fundAmountAfterTranche10 = await promiseFund.getFundAmount(user.address)
                console.log(fundAmountAfterTranche10) //equals 1.75 as expected

                await callVote(false)
                await callVote(false)
                const withdrawTx1 = await promiseFund.withdrawProceedsFunder()
                await withdrawTx1.wait(1)

                promiseFund = promiseFundContract.connect(user)
                const fundAmountAfterTranche1 = await promiseFund.getFundAmount(user.address)
                console.log(fundAmountAfterTranche1) //equals 0 as expeced because Funder withdrew

                const afterFunderBalance = await assetToken.balanceOf(user.address)
                assert.equal(beforeFunderBalance.sub(sum).toString(), afterFunderBalance.toString())
            })
            it("fails when a funder wants to withdraw before owner withdraws", async function () {
                const beforeFunderBalance = await assetToken.balanceOf(user.address)

                await fund()
                await callVote(false)
                await callVote(true)

                await expect(
                    promiseFund.withdrawProceedsFunder()
                ).to.be.revertedWith("PromiseFund__CantWithdrawFunder")
            })
        })
        describe("Owner Withdraw period expired tests", function () {
            it("fails when a funder tries to call function before vote ends", async function () {
                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.ownerWithdrawPeriodExpired()
                ).to.be.revertedWith("PromiseFund_OwnerWithdrewOrVoteNotDone")

                await fund()
                await callVote(false)

                await expect(
                    promiseFund.ownerWithdrawPeriodExpired()
                ).to.be.revertedWith("PromiseFund_OwnerWithdrewOrVoteNotDone")

                await callVote(true)

                await expect(
                    promiseFund.ownerWithdrawPeriodExpired()
                ).to.be.revertedWith("PromiseFund_OwnerCanStillWithdraw")

                promiseFund = promiseFundContract.connect(deployer)
                const tranche = await promiseFund.getCurrentTranche()
                const withdrawAmount = await promiseFund.getTrancheAmountRaised(tranche)
                const withdrawTx = await promiseFund.withdrawProceeds() 
                await withdrawTx.wait(1)

                await expect(
                    promiseFund.ownerWithdrawPeriodExpired()
                ).to.be.revertedWith("PromiseFund_OwnerWithdrewOrVoteNotDone")
                
                //now make it so that it is possible for funders to call function
                await fund()
                await callVote(false)
                await callVote(true)

                await expect(
                    promiseFund.ownerWithdrawPeriodExpired()
                ).to.be.revertedWith("PromiseFund_OwnerCanStillWithdraw")
                await network.provider.send("evm_increaseTime", [86400*30])
                await promiseFund.ownerWithdrawPeriodExpired()
                const state = await promiseFund.getState()
                assert.equal(state, 3)
            })
        })
        describe("Multiple funders, withdrawing and voting tests", function () {
            it("correctly accumulates the funds in the tranches from multiple funders", async function () {
                let sum : BigNumber = BigNumber.from("0")
                promiseFund = promiseFundContract.connect(accounts[1])

                //funders original amount
                const originalFundAmount1 = await promiseFund.getFundAmount(accounts[1].address)
                const originalFundAmount2 = await promiseFund.getFundAmount(accounts[2].address)
                const originalFundAmount3 = await promiseFund.getFundAmount(accounts[3].address)
                const originalFundAmount4 = await promiseFund.getFundAmount(accounts[4].address)

                //tranche and contract original amounts
                const originalFundsRaised = await promiseFund.getTotalFunds()
                const originalMilestoneAmountInTrancheOne = (await promiseFund.getTrancheAmountRaised(0))
                const originalMilestoneAmountInTrancheTwo = (await promiseFund.getTrancheAmountRaised(1))
                const originalMilestoneAmountInTrancheThree = (await promiseFund.getTrancheAmountRaised(2))
                const originalMilestoneAmountInTrancheFour = (await promiseFund.getTrancheAmountRaised(3))

                //funding from accounts 1 to 4
                for(let i = 1; i < 5; i++){
                    const promiseFund = promiseFundContract.connect(accounts[i])
                    const assetToken = assetTokenContract.connect(accounts[i])
                    
                    const approveTx = await assetToken.approve(
                        promiseFund.address,
                        fundValueWithDecimals
                    )
                    await approveTx.wait(1)
        
                    const fundTx = await promiseFund.fund(oneFundValueWithDecimals)
                    await fundTx.wait(1)

                    sum = sum.add(oneFundValueWithDecimals)
                }

                //after funders amount
                const afterFundAmount1 = await promiseFund.getFundAmount(accounts[1].address)
                const afterFundAmount2 = await promiseFund.getFundAmount(accounts[2].address)
                const afterFundAmount3 = await promiseFund.getFundAmount(accounts[3].address)
                const afterFundAmount4 = await promiseFund.getFundAmount(accounts[4].address)


                //check from each funder... everyone funded same amount so should be equal
                const afterFundsRaised = await promiseFund.getTotalFunds()
                const afterMilestoneAmountInTrancheOne = (await promiseFund.getTrancheAmountRaised(0))
                const afterFunderAmountInTrancheOne = (await promiseFund.getFunderTrancheAmountRaised(accounts[1].address, 0))
                const afterMilestoneAmountInTrancheTwo = (await promiseFund.getTrancheAmountRaised(1))
                const afterFunderAmountInTrancheTwo = (await promiseFund.getFunderTrancheAmountRaised(accounts[2].address, 1))
                const afterMilestoneAmountInTrancheThree = (await promiseFund.getTrancheAmountRaised(2))
                const afterFunderAmountInTrancheThree = (await promiseFund.getFunderTrancheAmountRaised(accounts[3].address, 2))
                const afterMilestoneAmountInTrancheFour = (await promiseFund.getTrancheAmountRaised(3))
                const afterFunderAmountInTrancheFour = (await promiseFund.getFunderTrancheAmountRaised(accounts[4].address, 3))

                // console.log(afterFunderAmountInTrancheFour)
                // console.log(afterFundsRaised)
                // console.log(sum)

                //total funders amount accumulated correct
                assert.equal(
                    afterFundAmount1.toString(),
                    originalFundAmount1.add(oneFundValueWithDecimals).toString()
                )
                assert.equal(
                    afterFundAmount2.toString(),
                    originalFundAmount2.add(oneFundValueWithDecimals).toString()
                )
                assert.equal(
                    afterFundAmount3.toString(),
                    originalFundAmount3.add(oneFundValueWithDecimals).toString()
                )
                assert.equal(
                    afterFundAmount4.toString(),
                    originalFundAmount4.add(oneFundValueWithDecimals).toString()
                )

                //tranches accumulated correct
                assert.equal(
                    afterFundsRaised.toString(),
                    originalFundsRaised.add(sum).toString()
                )
                assert.equal(
                    originalMilestoneAmountInTrancheOne.add(oneFundValueWithDecimals).toString(),
                    oneFundValueWithDecimals.toString(),
                    afterMilestoneAmountInTrancheOne.toString()
                )
                assert.equal(
                    originalMilestoneAmountInTrancheTwo.add(oneFundValueWithDecimals).toString(),
                    oneFundValueWithDecimals.toString(),
                    afterMilestoneAmountInTrancheTwo.toString()
                )
                assert.equal(
                    originalMilestoneAmountInTrancheThree.add(oneFundValueWithDecimals).toString(),
                    oneFundValueWithDecimals.toString(),
                    afterMilestoneAmountInTrancheThree.toString()
                )
                assert.equal(
                    originalMilestoneAmountInTrancheFour.add(oneFundValueWithDecimals).toString(),
                    oneFundValueWithDecimals.toString(),
                    afterMilestoneAmountInTrancheFour.toString()
                )

                //each funder has correct amount in each tranche
                assert.equal(
                    afterFunderAmountInTrancheOne.add(afterFunderAmountInTrancheTwo).add(afterFunderAmountInTrancheThree).add(afterFunderAmountInTrancheFour).toString(),
                    oneFundValueWithDecimals.toString()
                )

            })
            it("correctly allows multiple funders to withdraw their funding amounts", async function () {

                for(let i = 1; i < 5; i++){
                    const promiseFund = promiseFundContract.connect(accounts[i])
                    const assetToken = assetTokenContract.connect(accounts[i])
                    
                    const approveTx = await assetToken.approve(
                        promiseFund.address,
                        fundValueWithDecimals
                    )
                    await approveTx.wait(1)
        
                    const fundTx = await promiseFund.fund(oneFundValueWithDecimals)
                    await fundTx.wait(1)
                }

                const beforeFunderBalance1 = await assetToken.balanceOf(accounts[1].address)
                const beforeFunderBalance2 = await assetToken.balanceOf(accounts[2].address)
                const beforeFunderBalance3 = await assetToken.balanceOf(accounts[3].address)
                const beforeFunderBalance4 = await assetToken.balanceOf(accounts[4].address)

                await callVote(false)
                await callVote(false)

                for(let i = 1; i < 5; i++){
                    const promiseFund = promiseFundContract.connect(accounts[i])
                    
                    const withdrawTx1 = await promiseFund.withdrawProceedsFunder()
                    await withdrawTx1.wait(1)
                }


                const afterFunderBalance1 = await assetToken.balanceOf(accounts[1].address)
                const afterFunderBalance2 = await assetToken.balanceOf(accounts[2].address)
                const afterFunderBalance3 = await assetToken.balanceOf(accounts[3].address)
                const afterFunderBalance4 = await assetToken.balanceOf(accounts[4].address)

                assert.equal(beforeFunderBalance1.add(oneFundValueWithDecimals).toString(), afterFunderBalance1.toString())
                assert.equal(beforeFunderBalance2.add(oneFundValueWithDecimals).toString(), afterFunderBalance2.toString())
                assert.equal(beforeFunderBalance3.add(oneFundValueWithDecimals).toString(), afterFunderBalance3.toString())
                assert.equal(beforeFunderBalance4.add(oneFundValueWithDecimals).toString(), afterFunderBalance4.toString())
                
            })
            it("correctly allows multiple funders to vote accordingly", async function () {
                for(let i = 1; i < 5; i++){
                    const promiseFund = promiseFundContract.connect(accounts[i])
                    const assetToken = assetTokenContract.connect(accounts[i])
                    
                    const approveTx = await assetToken.approve(
                        promiseFund.address,
                        fundValueWithDecimals
                    )
                    await approveTx.wait(1)
        
                    const fundTx = await promiseFund.fund(oneFundValueWithDecimals)
                    await fundTx.wait(1)
                }
                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)

                for(let i = 1; i < 5; i++){
                    const promiseFund = promiseFundContract.connect(accounts[i])
                    await promiseFund.submitVote(false)
                }

                const votesProAfter = await promiseFund.getVotesCon()
                assert.equal(votesProAfter.toNumber(), 4)

                const timeLeft = await promiseFund.getTimeLeftVoting()
                await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                await promiseFund.endVote()
                
                const state = await promiseFund.getState()
                assert.equal(state, 0) //back to pending
            })
        })
        describe("Funder called for Vote tests after duration", function () {
            it("correctly assigns state if owner called vote before expiry even if only one vote and false", async function () {
                //check s_allFunders[msg.sender].timesVoted[tranche] is updating
                promiseFund = promiseFundContract.connect(user)

                //user funds here so can call for vote if time expired
                await fund()
                const duration = await promiseFund.getMilestoneDuration()

                //vote is called by owner a second before duration ends 
                await network.provider.send("evm_increaseTime", [duration.toNumber() - 1])
                //instead of pending this should result in funder_withdraw because duration is up
                await callVote(false)
                
                //state should be funder withdraw even tho only one vote called by owner because duration is up
                const state = await promiseFund.getState()
                assert.equal(state, 3)
            })
            it("correctly assigns state if owner didn't call for vote and duration expired", async function () {
                //check s_allFunders[msg.sender].timesVoted[tranche] is updating
                promiseFund = promiseFundContract.connect(user)

                //didnt fund so should error 
                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund__StateNotVoting")

                //user funds here so can call for vote if time expired
                await fund()
                const duration = await promiseFund.getMilestoneDuration()
                await expect(
                    promiseFund.startVote(15)
                ).to.be.revertedWith("PromiseFund_FunderCannotCallForVote")
                await network.provider.send("evm_increaseTime", [duration.toNumber()])
                promiseFund = promiseFundContract.connect(user)
                //tests that can start vote correct here with no error
                await promiseFund.startVote(15)

                await promiseFund.submitVote(true)

                const votesProAfter = await promiseFund.getVotesPro()
                assert.equal(votesProAfter.toNumber(), 1)
                
                //vote still going error
                await expect(
                    promiseFund.endVote()
                ).to.be.revertedWith("PromiseFund__VoteStillGoing")

                const timeLeft = await promiseFund.getTimeLeftVoting()
                await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                await promiseFund.endVote()
                
                const state = await promiseFund.getState()
                assert.equal(state, 2)
            })
            it("correctly assigns state if owner called one vote and then duration expired", async function () {
                //check s_allFunders[msg.sender].timesVoted[tranche] is updating
                promiseFund = promiseFundContract.connect(user)

                //didnt fund so should error 
                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund__StateNotVoting")

                const votesTried0 = await promiseFund.getVotesTried()
                assert.equal(votesTried0.toNumber(), 0)

                //user funds here so can call for vote if time expired
                await fund()
                //one vote failed
                await callVote(false)
                //after vote is called false, we want con votes to rest to 0 and pro votes to 0 and votes tried to remain unaffected
                const votesTried1 = await promiseFund.getVotesTried()
                assert.equal(votesTried1.toNumber(), 1)
                const votesconAfter = await promiseFund.getVotesCon()
                assert.equal(votesconAfter.toNumber(), 0)
                const votesproAfter = await promiseFund.getVotesCon()
                assert.equal(votesproAfter.toNumber(), 0)

                const duration = await promiseFund.getMilestoneDuration()
                await network.provider.send("evm_increaseTime", [duration.toNumber()])
                promiseFund = promiseFundContract.connect(user)
                await promiseFund.startVote(15)

                await promiseFund.submitVote(false)

                //resets con votes to 0 and then adds 1 for the next con vote
                const votesConAfter = await promiseFund.getVotesCon()
                assert.equal(votesConAfter.toNumber(), 1)
                
                //vote still going error
                await expect(
                    promiseFund.endVote()
                ).to.be.revertedWith("PromiseFund__VoteStillGoing")

                const timeLeft = await promiseFund.getTimeLeftVoting()
                await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                await promiseFund.endVote()
                
                const votesTried = await promiseFund.getVotesTried()
                assert.equal(votesTried.toNumber(), 2)
                //false vote so fudner withdraw
                const state = await promiseFund.getState()
                assert.equal(state, 3)
            })
        })
        describe("Voting Tests", function () {
            it("fails when a non-owner tries to call a vote prior to end of milestone", async function () {
                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.startVote(15)
                ).to.be.revertedWith("PromiseFund_FunderCannotCallForVote")
            })
            it("fails when a non-funder tries to submit a vote", async function () {
                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                const fundAmount1 = await promiseFund.getFundAmount(user.address)
                assert.equal(fundAmount1.toNumber(), 0)

                const funderVotes = await promiseFund.getFunderVotes(user.address)
                assert.equal(funderVotes.toNumber(), 0)

                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund_FunderDidNotFundThisMilestone")
            })
            it("fails when a current tranche funder tries to submit a vote in next milestone", async function () {
                promiseFund = promiseFundContract.connect(user)

                await currentFund()
                
                await callVote(true)

                promiseFund = promiseFundContract.connect(deployer)

                const tranche = await promiseFund.getCurrentTranche()
                const withdrawAmount = await promiseFund.getTrancheAmountRaised(tranche)
                console.log(withdrawAmount)
                const withdrawAmount1 = await promiseFund.getTrancheAmountRaised(1)
                console.log(withdrawAmount1)
                const withdrawTx = await promiseFund.withdrawProceeds() 
                await withdrawTx.wait(1)

                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund_FunderDidNotFundThisMilestone")
            })
            it("fails when a current tranche funder tries to submit a vote in next milestone then succeeds when funds to all milestones", async function () {
                promiseFund = promiseFundContract.connect(user)

                await currentFund()
                
                await callVote(true)

                promiseFund = promiseFundContract.connect(deployer)

                const tranche = await promiseFund.getCurrentTranche()
                const withdrawAmount = await promiseFund.getTrancheAmountRaised(tranche)
                console.log(withdrawAmount)
                const withdrawAmount1 = await promiseFund.getTrancheAmountRaised(1)
                console.log(withdrawAmount1)
                const withdrawTx = await promiseFund.withdrawProceeds() 
                await withdrawTx.wait(1)

                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                await expect(
                    promiseFund.submitVote(true)
                ).to.be.revertedWith("PromiseFund_FunderDidNotFundThisMilestone")

                //end voting
                const timeLeft = await promiseFund.getTimeLeftVoting()
                await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])
                await promiseFund.endVote()

                const state = await promiseFund.getState()
                assert.equal(state, 2) //tie is owner withdraws

                promiseFund = promiseFundContract.connect(deployer)
                const withdrawTx1 = await promiseFund.withdrawProceeds() 
                await withdrawTx1.wait(1)

                //testing current funding and fund to make sure tranches are updated
                promiseFund = promiseFundContract.connect(user)
                //await currentFund()
                await fund()

                await callVote(true)
                const bwithdrawAmount = await promiseFund.getTrancheAmountRaised(1)
                console.log(bwithdrawAmount)
                const bwithdrawAmount1 = await promiseFund.getTrancheAmountRaised(2)
                console.log(bwithdrawAmount1)
                const bwithdrawAmount2 = await promiseFund.getTrancheAmountRaised(3)
                console.log(bwithdrawAmount2)

                promiseFund = promiseFundContract.connect(deployer)
                const bwithdrawTx = await promiseFund.withdrawProceeds() 
                await bwithdrawTx.wait(1)

                assert.equal(bwithdrawAmount.toString(), "0")
                assert.equal(bwithdrawAmount1.toString(), "500000000000000000") //.5 with 18 decimals
                assert.equal(bwithdrawAmount2.toString(), "500000000000000000")
                
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
                promiseFund = promiseFundContract.connect(user)
                await fund()
                promiseFund = promiseFundContract.connect(deployer)

                await promiseFund.startVote(15)
                const timeLeft = await promiseFund.getTimeLeftVoting()
                await network.provider.send("evm_increaseTime", [timeLeft.toNumber() + 1])

                promiseFund = promiseFundContract.connect(user)

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

                promiseFund = promiseFundContract.connect(deployer)
                await promiseFund.startVote(15)
                promiseFund = promiseFundContract.connect(user)

                await promiseFund.submitVote(false)

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
                await promiseFund.withdrawProceeds()

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

            const fundTx = await promiseFund.fund(oneFundValueWithDecimals)
            await fundTx.wait(1)
        }

        // Fund from the user account using the fundValue specified at the beginning of the file.
        async function currentFund() {
            promiseFund = promiseFundContract.connect(user)
            assetToken = assetTokenContract.connect(user)

            const approveTx = await assetToken.approve(
                promiseFund.address,
                fundValueWithDecimals
            )
            await approveTx.wait(1)

            const fundTx =  await promiseFund.fundCurrentTrancheOnly(oneFundValueWithDecimals)
            await fundTx.wait(1)
        }
    })


