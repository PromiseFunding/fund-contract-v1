// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import {IFund} from "./interfaces/IFund.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error PromiseFund__FundAmountMustBeAboveZero();
error PromiseFund_AlreadyWithdrewAllFunds();
error PromiseFund__NotOwner();
error PromiseFund_MaxAmountOfMilestones();
error PromiseFund_OwnerWithdrewOrVoteNotDone();
error PromiseFund_FunderDidNotFundThisMilestone();
error PromiseFund__FundsStillTimeLocked(uint256 entryTime, uint256 timeLeft);
error PromiseFund__CantWithdrawFunder();
error PromiseFund__CantWithdrawOwner();
error PromiseFund__NotFundingPeriod();
error PromiseFund_FunderCannotCallForVote();
error PromiseFund__VoteTooShort(uint256 minVoteLength);
error PromiseFund__VoteTooLong(uint256 maxVoteLength);
error PromiseFund_OwnerCalledTwoVotesAlready();
error PromiseFund__StateNotPending();
error PromiseFund_OwnerCanStillWithdraw();
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
        uint256[5] timesVoted;
        bool withdrewAllFunds;
        bool[5] fundMilestone; //this initializes to all false and blocks ability to submit vote unless made true
    }

    struct Milestone {
        uint256 amountRaised;
        uint256 startTime;
        uint256 milestoneDuration; //useful in future if we have different lengths of milestones
    }

    // State variables
    address payable public i_owner;
    address public i_assetAddress;
    uint256 public i_numberOfMilestones;
    uint256 public s_totalFunded;
    uint256 public s_voteEnd;
    uint256 public s_votesTried;
    uint256 public s_votesPro;
    uint256 public s_votesCon;
    FundState private s_fundState;
    uint8 private tranche;
    uint256 public maxDuration = 10368000; //for now 120 days for each milestone
    uint8 public maxMilestones = 5;
    bool calledVoteAfterExpiry; //checks to see if the funders are the ones who called the vote
    uint256 voteEndTime; //helps in ownerWithdraw function make sure owner cant not withdraw forever
    bool voteEnded; //used for helping define voteEndTime
    Milestone[] public tranches; //determine if we want this public?
    mapping(address => Funder) public s_allFunders;

    // Constants
    uint256 MIN_VOTE_LENGTH = 14;
    uint256 MAX_VOTE_LENGTH = 21;
    uint256 MAX_OWNER_WITHDRAW_PERIOD = 30;

    // Events

    constructor(address assetAddress, uint256[] memory milestoneDuration) {
        i_owner = payable(tx.origin);
        transferOwnership(i_owner);
        i_assetAddress = assetAddress;
        i_numberOfMilestones = milestoneDuration.length;
        for (uint256 i = 0; i < i_numberOfMilestones; i++) {
            Milestone memory temp;
            //pre-set milestone durations
            temp.milestoneDuration = milestoneDuration[i] < maxDuration
                ? milestoneDuration[i]
                : maxDuration;
            tranches.push(temp);
        }
        tranches[0].startTime = block.timestamp;
        tranche = 0;
        s_totalFunded = 0;
        s_votesTried = 0;
        s_fundState = FundState.PENDING;
        calledVoteAfterExpiry = false;
        voteEnded = false;
    }

    /// @notice Fund the contract with a token and evenly splits it between tranches for you
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

        //set entryTime if first time depositing eventually
        //set bool array to true if funder hasn't funded like this before
        if (s_allFunders[msg.sender].amount[i_numberOfMilestones - 1] == 0) {
            s_allFunders[msg.sender].timesVoted[tranche] = 0;
            for (uint256 trancheIndex = tranche; trancheIndex < tranches.length; trancheIndex++) {
                s_allFunders[msg.sender].fundMilestone[trancheIndex] = true;
            }
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
                tranches[trancheIndex].amountRaised += (amount / (i_numberOfMilestones - tranche));
                temp -= (amount / (i_numberOfMilestones - tranche));
                s_allFunders[msg.sender].amount[trancheIndex] += (amount /
                    (i_numberOfMilestones - tranche));
            }
        }

        //add to total deposits and user deposits
        s_totalFunded = s_totalFunded + amount;
        // Set the number of votes to 1 for now. Will be weighted in the future.
        // allows for voting at all milestones
        s_allFunders[msg.sender].votes = 1;
        //set withdrewAllFunds to false (can we do this in constructor?)
        s_allFunders[msg.sender].withdrewAllFunds = false;

        emit FunderAdded(msg.sender, i_owner, i_assetAddress, amount);
    }

    /// @notice Fund the current tranche or milestone period with a token
    /// @dev Possibly a way to make it more gas efficient with different variables
    /// @param amount the amount to be funded to the tranche
    function fundCurrentTrancheOnly(uint256 amount) public {
        if (s_fundState != FundState.PENDING) {
            revert PromiseFund__NotFundingPeriod();
        }
        if (amount == 0) {
            revert PromiseFund__FundAmountMustBeAboveZero();
        }

        // Transferring from sender to contract
        IERC20(i_assetAddress).transferFrom(msg.sender, address(this), amount);

        //set entryTime if first time depositing... this if statement does nothing for now
        if (s_allFunders[msg.sender].amount[i_numberOfMilestones - 1] == 0) {
            s_allFunders[msg.sender].timesVoted[tranche] = 0;
        }

        //increments the current tranche with amount for both funder and milestone array
        tranches[tranche].amountRaised += amount;
        s_allFunders[msg.sender].amount[tranche] += amount;

        //add to total deposits and user deposits
        s_totalFunded = s_totalFunded + amount;
        // Want to limit voting ability only for current tranche but still need this
        s_allFunders[msg.sender].votes = 1;
        //set withdrewAllFunds to false (can we do this in constructor?)
        s_allFunders[msg.sender].withdrewAllFunds = false;
        // set fundMilestone to true even if redundant for current tranche
        s_allFunders[msg.sender].fundMilestone[tranche] = true;

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

    /// @notice When in this state, the funder is eligbible to withdraw the total amount they funded in all tranches
    /// make it so the funder has to withdraw all of their funds. Once in this FUNDER_WITHDRAW state never out of it.
    function withdrawProceedsFunder() public {
        if (s_fundState != FundState.FUNDER_WITHDRAW) {
            revert PromiseFund__CantWithdrawFunder();
        }

        if (s_allFunders[msg.sender].withdrewAllFunds) {
            revert PromiseFund_AlreadyWithdrewAllFunds();
        }
        //test if this works if a non-funder calls function
        uint256 total = getFundAmount(msg.sender);

        // Before actual transfer to deter reentrancy (I think)
        // https://medium.com/loom-network/how-to-secure-your-smart-contracts-6-solidity-vulnerabilities-and-how-to-avoid-them-part-1-c33048d4d17d
        s_allFunders[msg.sender].withdrewAllFunds = true;
        s_totalFunded -= total;

        // Have to give allowance for contract to send funds
        approveTransfer(IERC20(i_assetAddress), address(this), total);
        IERC20(i_assetAddress).transferFrom(address(this), msg.sender, total);

        emit FundsWithdrawn(msg.sender, i_owner, i_assetAddress, total);
    }

    //withdrawing proceeds from the current tranche. Owner must withdraw all funds.
    //after the owner withdraws all of the proceeds:
    //iterate to the next tranche, set the starttime, change the state to pending, reset s_votesTried to 0 and calledVoteAfterExpiry to false
    function withdrawProceeds() public onlyOwner {
        if (s_fundState != FundState.OWNER_WITHDRAW) {
            revert PromiseFund__CantWithdrawOwner();
        }

        uint256 total = tranches[tranche].amountRaised;

        s_totalFunded -= total;
        tranches[tranche].amountRaised -= total;

        // Redeem tokens and send them directly to the funder
        approveTransfer(IERC20(i_assetAddress), address(this), total);
        IERC20(i_assetAddress).transferFrom(address(this), msg.sender, total);

        // reset all variables for following tranche if it isn't the last tranche
        // if it is the last tranche, the contract stayts in the OWNER_WITHDRAW state and no more funding
        // or withdrawing can take place, thereby rendering the functionality useless
        // need to reset vote counting variables (Silas) as well as vote amount!
        if (tranche != i_numberOfMilestones - 1) {
            tranche += 1;
            tranches[tranche].startTime = block.timestamp;
            s_fundState = FundState.PENDING;
            s_votesTried = 0;
            s_votesCon = 0;
            s_votesPro = 0;
            calledVoteAfterExpiry = false;
        }

        // after the owner withdraws, funders can't call ownerWithdrawPeriodExpired
        voteEnded = false;

        emit ProceedsWithdrawn(i_owner, i_assetAddress, total);
    }

    // check to see if 30 days have passed... if they have and their is still more to be withdrawn
    // add that amount funded to be locked in the next tranche or change state to funder withdraw!
    // This ensures that owner is sticking to schedule and not locking everyones money up forever
    // Current Implementation: Switches state so funders can withdraw their money
    // voteEnded bool helps make sure voteEndTime gets updated appropriately and cant call this function continuously
    // and if owner does withdraw can't call function
    // voteEndTime only assigned value in endVote function so need boolean to help
    function ownerWithdrawPeriodExpired() public {
        if (!voteEnded) {
            revert PromiseFund_OwnerWithdrewOrVoteNotDone();
        }
        if (voteEnded && (block.timestamp - voteEndTime < (MAX_OWNER_WITHDRAW_PERIOD * 86400))) {
            revert PromiseFund_OwnerCanStillWithdraw();
        }
        if (voteEnded && (block.timestamp - voteEndTime >= (MAX_OWNER_WITHDRAW_PERIOD * 86400))) {
            s_fundState = FundState.FUNDER_WITHDRAW;
            voteEnded = false;
        }
    }

    /// @notice Start a vote for releasing the funds. Owner can call whenever and funders can only call after duration of milestone.
    /// Max 2 votes called by owner prior to end of milestone and one after by funders
    /// @param length the length of the vote in days. max length ensures that vote doesn't last an infinite amount of time.
    function startVote(uint256 length) public {
        if (length < MIN_VOTE_LENGTH) {
            revert PromiseFund__VoteTooShort(MIN_VOTE_LENGTH);
        }
        if (length > MAX_VOTE_LENGTH) {
            revert PromiseFund__VoteTooLong(MAX_VOTE_LENGTH);
        }
        if (s_fundState != FundState.PENDING) {
            revert PromiseFund__StateNotPending();
        }

        //Funder can call for vote only if time has expired in the current tranche
        if (
            msg.sender != i_owner &&
            (block.timestamp - tranches[tranche].startTime) < tranches[tranche].milestoneDuration
        ) {
            revert PromiseFund_FunderCannotCallForVote();
        }

        if ((block.timestamp - tranches[tranche].startTime) > tranches[tranche].milestoneDuration) {
            calledVoteAfterExpiry = true;
        }

        //counter goes up if the owner called for the vote or if the funder
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
        if (!s_allFunders[msg.sender].fundMilestone[tranche]) {
            revert PromiseFund_FunderDidNotFundThisMilestone();
        }
        if (s_voteEnd < block.timestamp) {
            endVote();
            revert PromiseFund__VoteEnded();
        }
        // They get double their votes for each consecutive vote
        if (didFunderVote(msg.sender)) {
            revert PromiseFund__NoVotesLeft();
        }

        s_allFunders[msg.sender].timesVoted[tranche] =
            s_allFunders[msg.sender].votes *
            s_votesTried;
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

        // if funderCalledVote == true , that means the duration is up and funders can withdraw. if it is false then owner called the vote
        // and the state is pending again and people can donate
        // (FUNDER_WITHDRAW is the terminated state of the contract... cannot get out of this state)
        s_fundState = s_votesCon > s_votesPro
            ? (
                !(calledVoteAfterExpiry || s_votesTried >= 2)
                    ? FundState.PENDING
                    : FundState.FUNDER_WITHDRAW
            )
            : FundState.OWNER_WITHDRAW;

        // if the vote ends with more cons then pros and the duration of the milestone is up, then the state is changed to FUNDER_WITHDRAW
        // even if 2 votes haven't taken place
        if (
            s_fundState == FundState.PENDING &&
            ((block.timestamp - tranches[tranche].startTime) > tranches[tranche].milestoneDuration)
        ) {
            s_fundState == FundState.FUNDER_WITHDRAW;
        }

        // used in ownerWithdrawPeriodExpired
        if (s_fundState == FundState.OWNER_WITHDRAW) {
            voteEndTime = block.timestamp;
            voteEnded = true;
        }

        // if the state is in pending after function called, a vote has taken place and is false so we want to reset
        // the amount of pro votes and con votes for 0 for the second vote
        if (s_fundState == FundState.PENDING) {
            s_votesCon = 0;
            s_votesPro = 0;
        }
    }

    /// @notice Allows the owner of a contract to add a milestone if they haven't already had 5 milestones
    /// @param duration the amount of time for the next milestone
    // should there be a specific state that this function is limited to, ex: Owner_Withdraw
    function addMilestone(uint256 duration) public onlyOwner {
        if (tranches.length >= 5) {
            revert PromiseFund_MaxAmountOfMilestones();
        }

        Milestone memory temp;
        temp.milestoneDuration = duration < maxDuration ? duration : maxDuration;
        tranches.push(temp);

        i_numberOfMilestones += 1;
    }

    /** Getter Functions */

    /// @notice Get the fund amount of a given address by looping through their funder array starting at most recent tranche
    /// @param funder the funder whose balance is being checked
    /// @return The uint256 amount the funder currently has funded
    function getFundAmount(address funder) public view returns (uint256) {
        if (s_allFunders[funder].withdrewAllFunds) {
            return 0;
        }
        uint256 sum = 0;
        for (uint256 i = tranche; i < s_allFunders[funder].amount.length; i++) {
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

    /// @notice Get the current tranche
    /// @return The current tranche
    function getCurrentTranche() public view returns (uint8) {
        return tranche;
    }

    /// @notice Get the Milestone Array that keeps track of amount raised, duration, and startTime
    /// @return The entire Milestone tranches array
    function getTranches() public view returns (Milestone[] memory) {
        return tranches;
    }

    /// @notice Get the milestone duration that is currently uniformly set on deployment
    /// @return The milestone duration or time to end for specific tranche
    function getMilestoneDuration(uint256 index) public view returns (uint256) {
        return tranches[index].milestoneDuration;
    }

    /// @notice Get the array of milestone durations
    /// @return The milestone durations or time to end for all tranches
    function getMilestoneDurations() public view returns (uint256[] memory) {
        uint256[] memory temp = new uint256[](tranches.length);
        for (uint8 i = 0; i < tranches.length; i++) {
            temp[i] = tranches[i].milestoneDuration;
        }

        return temp;
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
        if (s_fundState == FundState.VOTING && s_voteEnd > block.timestamp) {
            return s_voteEnd - block.timestamp;
        }
        return 0;
    }

    function didFunderVote(address funder) public view returns (bool) {
        if (s_allFunders[funder].votes * s_votesTried <= s_allFunders[funder].timesVoted[tranche]) {
            return true;
        }
        return false;
    }

    function getFunderVotes(address funder) public view returns (uint256) {
        return s_allFunders[funder].votes;
    }

    function getFunderCalledVote() public view returns (bool) {
        return calledVoteAfterExpiry;
    }

    function getVotesTried() public view returns (uint256) {
        return s_votesTried;
    }

    function getVotesPro() public view returns (uint256) {
        return s_votesPro;
    }

    function getVotesCon() public view returns (uint256) {
        return s_votesCon;
    }
}
