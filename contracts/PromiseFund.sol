// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import {IFund} from "./interfaces/IFund.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error PromiseFund__FundAmountMustBeAboveZero();
error PromiseFund__WithdrawFundsGreaterThanBalance(uint256 amount, uint256 balance);
error PromiseFund__NotOwner();
error PromiseFund__WithdrawProceedsGreaterThanBalance(uint256 amount, uint256 balance);
error PromiseFund__FundsStillTimeLocked(uint256 entryTime, uint256 timeLeft);
error PromiseFund__CantWithdrawFunder();
error PromiseFund__CantWithdrawOwner();
error PromiseFund__NotFundingPeriod();
error PromiseFund__VoteTooShort(uint256 minVoteLength);
error PromiseFund__StateNotPending();
error PromiseFund__StateNotVoting();
error PromiseFund__NoVotesLeft();
error PromiseFund__VoteEnded();
error PromiseFund__VoteStillGoing();

/// @title PromiseFund
/// @author Silas Lenihan and Dylan Paul
/// @notice Use contract at your own risk, it is still in development
/// @dev Not all functions are fully tested yet
/// @custom:experimental This is an experimental contract.
contract PromiseFund is IFund, Ownable {
    // Type Declarations
    struct Funder {
        uint256[5] amount; //max amount of milestones
        //uint256 entryTime; //need to implement in future with interest generating
        uint256 votes;
        uint256 timesVoted;
    }

    struct Milestone {
        uint256 amountRaised;
        uint256 startTime;
        uint256 milestoneDuration; //useful in future if we have different lengths of milestones
    }

    // State variables
    address payable public i_owner;
    address public i_assetAddress;
    uint8 public i_numberOfMilestones;
    uint256 public i_milestoneDuration;
    uint256 public s_totalFunded;
    uint256 public s_voteEnd;
    uint256 public s_votesTried;
    uint256 public s_votesPro;
    uint256 public s_votesCon;
    FundState private s_fundState;
    uint8 private tranche;
    uint256 public maxDuration = 10368000; //for now 120 days for each milestone
    uint8 public maxMilestones = 5;
    Milestone[] public tranches; //determine if we want this public?
    mapping(address => Funder) public s_allFunders;

    // Constants
    uint256 MIN_VOTE_LENGTH = 14;

    // Events

    constructor(
        address assetAddress,
        uint8 numberOfMilestones,
        uint256 milestoneDuration
    ) {
        i_owner = payable(tx.origin);
        transferOwnership(i_owner);
        i_assetAddress = assetAddress;
        i_numberOfMilestones = numberOfMilestones < maxMilestones
            ? numberOfMilestones
            : maxMilestones;
        i_milestoneDuration = milestoneDuration < maxDuration ? milestoneDuration : maxDuration;
        //tranches = new Milestone[](numberOfMilestones);
        //tranches[0].startTime = block.timestamp;
        for (uint256 i = 0; i < numberOfMilestones; i++) {
            Milestone memory temp;
            tranches.push(temp);
        }
        tranches[0].startTime = block.timestamp;
        tranches[0].milestoneDuration = i_milestoneDuration;
        tranche = 0;
        s_totalFunded = 0;
        s_votesTried = 0;
        s_fundState = FundState.PENDING;
    }

    /// @notice Fund the contract with a token
    /// @dev Possibly a way to make it more gas efficient with different variables
    /// @param amount the amount to be funded to the contract
    function fund(uint256 amount) public {
        if (s_fundState != FundState.PENDING) {
            revert PromiseFund__NotFundingPeriod();
        }
        if (amount == 0) {
            revert PromiseFund__FundAmountMustBeAboveZero();
        }
        // Set initial amount for funder
        IERC20(i_assetAddress).transferFrom(msg.sender, address(this), amount);
        // Whenever you exchange ERC20 tokens, you have to approve the tokens for spend.

        //set entryTime if first time depositing
        if (s_allFunders[msg.sender].amount[i_numberOfMilestones - 1] == 0) {
            s_allFunders[msg.sender].timesVoted = 0;
        }
        //useful for rounding errors with division. Can do decimals in future but this works for now.
        uint256 temp = amount;
        //loop through tranches and update the amount funded. uniform split of funds
        for (uint256 trancheIndex = tranche; trancheIndex < tranches.length; trancheIndex++) {
            //not perfect division so give last tranche rest of funds if extra decimals exist
            if (trancheIndex + 1 == tranches.length) {
                tranches[trancheIndex].amountRaised += temp;
                s_allFunders[msg.sender].amount[trancheIndex] += temp;
            } else {
                tranches[trancheIndex].amountRaised += (amount / i_numberOfMilestones);
                temp -= (amount / i_numberOfMilestones);
                s_allFunders[msg.sender].amount[trancheIndex] += (amount / i_numberOfMilestones);
            }
        }

        //add to total deposits and user deposits
        s_totalFunded = s_totalFunded + amount;
        // Set the number of votes to 1 for now. Will be weighted in the future.
        s_allFunders[msg.sender].votes = 1;

        emit FunderAdded(msg.sender, i_owner, i_assetAddress, amount);
    }

    /// @notice Approve a recipient to spend the supplied token
    /// @param token the ERC20 token being supplied
    /// @param recipient the address of the contract being approved to spend
    function approveTransfer(
        IERC20 token,
        address recipient,
        uint256 amount
    ) public {
        token.approve(recipient, amount);
    }

    /// @notice Funder withdraws tokens up to the amount they supplied from the LP
    /// @param amount The amount being withdrawn
    function withdrawProceedsFunder(uint256 amount) public {
        if (s_fundState != FundState.FUNDER_WITHDRAW) {
            revert PromiseFund__CantWithdrawFunder();
        }
        if (amount > s_allFunders[msg.sender].amount[0]) {
            revert PromiseFund__WithdrawFundsGreaterThanBalance(
                amount,
                s_allFunders[msg.sender].amount[0]
            );
        }
        // Before actual transfer to deter reentrancy (I think)
        // https://medium.com/loom-network/how-to-secure-your-smart-contracts-6-solidity-vulnerabilities-and-how-to-avoid-them-part-1-c33048d4d17d
        s_allFunders[msg.sender].amount[0] -= amount;
        s_totalFunded -= amount;

        approveTransfer(IERC20(i_assetAddress), address(this), amount);
        IERC20(i_assetAddress).transferFrom(address(this), msg.sender, amount);

        emit FundsWithdrawn(msg.sender, i_owner, i_assetAddress, amount);
    }

    function withdrawProceeds(uint256 amount) public onlyOwner {
        if (s_fundState != FundState.OWNER_WITHDRAW) {
            revert PromiseFund__CantWithdrawOwner();
        }

        if (amount > s_totalFunded) {
            revert PromiseFund__WithdrawProceedsGreaterThanBalance(amount, s_totalFunded);
        }
        s_totalFunded -= amount;

        // Redeem tokens and send them directly to the funder
        approveTransfer(IERC20(i_assetAddress), address(this), amount);
        IERC20(i_assetAddress).transferFrom(address(this), msg.sender, amount);

        emit ProceedsWithdrawn(i_owner, i_assetAddress, amount);
    }

    /// @notice Start a vote for releasing the funds
    /// @param length the length of the vote in days
    function startVote(uint256 length) public onlyOwner {
        if (length < MIN_VOTE_LENGTH) {
            revert PromiseFund__VoteTooShort(MIN_VOTE_LENGTH);
        }
        if (s_fundState != FundState.PENDING && s_fundState != FundState.REVOTE) {
            revert PromiseFund__StateNotPending();
        }
        s_votesTried += 1;

        s_voteEnd = block.timestamp + (length * 86400);
        s_fundState = FundState.VOTING;
    }

    /// @notice Submit a vote pro or against the fundraiser getting their funds
    /// @param support true if you are pro | false if you are agains
    function submitVote(bool support) public {
        if (s_fundState != FundState.VOTING) {
            revert PromiseFund__StateNotVoting();
        }
        if (s_voteEnd < block.timestamp) {
            endVote();
            revert PromiseFund__VoteEnded();
        }
        // They get double their votes for each consecutive vote
        if (s_allFunders[msg.sender].votes * s_votesTried <= s_allFunders[msg.sender].timesVoted) {
            revert PromiseFund__NoVotesLeft();
        }
        s_allFunders[msg.sender].timesVoted += 1;
        support ? s_votesPro += 1 : s_votesCon += 1;
    }

    /// @notice Allows anyone to call the end of the vote. The vote has already
    /// ended before this, since it doesn't allow anyone to
    function endVote() public {
        if (s_fundState != FundState.VOTING) {
            revert PromiseFund__StateNotVoting();
        }
        if (block.timestamp < s_voteEnd) {
            revert PromiseFund__VoteStillGoing();
        }
        s_fundState = s_votesCon > s_votesPro
            ? (s_votesTried < 2 ? FundState.REVOTE : FundState.FUNDER_WITHDRAW)
            : FundState.OWNER_WITHDRAW;
    }

    /** Getter Functions */

    /// @notice Get the fund amount of a given address by looping through their funder array
    /// @param funder the funder whose balance is being checked
    /// @return The uint256 amount the funder currently has funded
    function getFundAmount(address funder) public view returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < s_allFunders[funder].amount.length; i++) {
            sum += s_allFunders[funder].amount[i];
        }
        return sum;
    }

    /// @notice Gets the asset address of this contract
    /// @return assetAddress
    function getAssetAddress() public view returns (address) {
        return i_assetAddress;
    }

    /// @notice Gets the block time... Useing this function for testing purposes. Can be removed later
    function getBlockTime() public view returns (uint256) {
        return block.timestamp;
    }

    /// @notice Get the owner of the contract
    /// @return The address of the contract's owner
    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getState() public view returns (FundState) {
        return s_fundState;
    }

    /// @notice Get the amount of proceeds that the owner can withdraw
    /// @return The amount of withdrawable proceeds
    function getWithdrawableProceeds() public view returns (uint256) {
        if (s_fundState == FundState.OWNER_WITHDRAW) {
            return s_totalFunded;
        }
        return 0;
    }

    /// @notice Get the total amount donated to contract/fundraiser
    /// @return The total amount in contract
    function getTotalFunds() public view returns (uint256) {
        return s_totalFunded;
    }

    /// @notice Get the Milestone Array that keeps track of amount raised, duration, and startTime
    /// @return The entire Milestone tranches array
    function getTranches() public view returns (Milestone[] memory) {
        return tranches;
    }

    /// @notice Get the milestone duration that is currently uniformly set on deployment
    /// @return The milestone duration or time to end
    function getMilestoneDuration() public view returns (uint256) {
        return i_milestoneDuration;
    }

    /// @notice Get the total amount raised for a single Milestone level
    /// @param level the 'tranche' number. Ex: first milestone, second milestone...
    /// @return The uint256 amount raised in that specific tranche
    function getTrancheAmountRaised(uint256 level) public view returns (uint256) {
        return tranches[level].amountRaised;
    }

    /// @notice Get the the specific amount raised in a funders 'tranche'
    /// @param funder the address of the funder you are trying to check
    /// @param level the amount donated to a specific tranche by the donor
    /// @return The uint256 amount donated to a tranche level by the donor
    function getFunderTrancheAmountRaised(address funder, uint256 level)
        public
        view
        returns (uint256)
    {
        return s_allFunders[funder].amount[level];
    }

    function getVoteEnd() public view returns (uint256) {
        if (s_fundState == FundState.VOTING) {
            return s_voteEnd;
        }
        return 0;
    }

    function getTimeLeftVoting() public view returns (uint256) {
        if (s_fundState == FundState.VOTING) {
            return s_voteEnd - block.timestamp;
        }
        return 0;
    }

    function getVotesPro() public view returns (uint256) {
        return s_votesPro;
    }

    function getVotesCon() public view returns (uint256) {
        return s_votesCon;
    }
}
