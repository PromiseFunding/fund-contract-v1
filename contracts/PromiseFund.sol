// SPDX-License-Identifier: MIT

//locking solidity version
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import {IFund} from "./interfaces/IFund.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error PromiseFund__FundAmountMustBeAboveZero();
error PromiseFund_AlreadyWithdrewAllFunds();
error PromiseFund__NotOwner();
error PromiseFund_OwnerMustWaitForPreFundingToEnd();
error PromiseFund_MaxAmountOfMilestones();
error PromiseFund__StateNotAbleToAddMilestone();
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
error PromiseFund_NothingToWithdraw();
error PromiseFund_NotInteractingWithContractCorrectly();
error PromiseFund_CannotFundRoundEnded();

/// @title PromiseFund
/// @author Silas Lenihan and Dylan Paul
/// @notice Use contract at your own risk, it is still in development
/// @dev Not all functions are fully tested yet
/// @custom:experimental This is an experimental contract.

contract PromiseFund is IFund, Ownable {
    // Type Declarations
    struct Funder {
        uint256[5] amount; //max amount of milestones is 5
        uint256 votes;
        uint256[5] timesVoted;
        bool withdrewAllFunds;
        bool[5] fundMilestone; //this initializes to all false and blocks ability to submit vote unless made true
    }

    struct Milestone {
        uint256 activeRaised; //when withdraws occur, this value decreases
        uint256 totalRaised;
        uint256 startTime;
        uint256 milestoneDuration;
    }

    struct MilestoneSummary {
        Milestone[] milestones;
        uint8 currentTranche;
        address assetAddress;
        FundState state;
        uint256 preTotalFunds;
        uint256 lifeTimeRaised;
        address owner;
        uint256 timeLeftRound;
        uint256 votesTried;
        uint256 timeLeftVoting;
        bool funderCalledVote;
        uint256 preMilestoneTotalFunded;
        uint256 preFundingDuration;
        uint256 preFundingEnd;
        uint256 roundEnd;
        bool withdrawExpired;
    }

    struct FunderSummary {
        bool didFunderWithdraw;
        bool didFunderVote;
        uint256 funderTrancheAmountRaised;
        uint256 trancheAmountRaised;
        uint256 trancheTotalAmountRaised;
        uint256 fundAmount;
    }

    // State variables
    address payable private immutable i_owner;
    address private immutable i_assetAddress;
    uint256 private immutable i_preFundingDuration;
    uint256 private immutable i_preFundingStartTime;
    uint256 private s_numberOfMilestones;
    uint256 private s_activeFunded;
    uint256 private s_totalFunded; //accounting purposes
    uint256 private s_preMilestoneFunded; //accounting purposes
    uint256 private s_voteEnd;
    uint256 private s_votesTried;
    uint256 private s_votesPro;
    uint256 private s_votesCon;
    FundState private s_fundState;
    uint8 private s_tranche;
    bool private calledVoteAfterExpiry; //checks to see if the funders are the ones who called the vote
    uint256 private voteEndTime; //helps in ownerWithdraw function make sure owner cant not withdraw forever
    bool private voteEnded; //used for helping define voteEndTime
    Milestone[] private s_tranches;
    mapping(address => Funder) private s_allFunders;

    // Constants
    uint256 private constant MIN_VOTE_LENGTH = 7;
    uint256 private constant MAX_VOTE_LENGTH = 14;
    uint256 private constant MAX_OWNER_WITHDRAW_PERIOD = 30;
    uint256 private constant MAX_DURATION = 10368000; //for now 120 days for each milestone
    uint8 private constant MAX_MILESTONES = 5;

    constructor(
        address assetAddress,
        uint256[] memory milestoneDuration,
        uint256 preFundingDuration
    ) {
        i_owner = payable(tx.origin);
        transferOwnership(i_owner);
        i_assetAddress = assetAddress;
        i_preFundingDuration = preFundingDuration;
        s_numberOfMilestones = milestoneDuration.length;
        for (uint256 i = 0; i < s_numberOfMilestones; i++) {
            Milestone memory temp;
            //pre-set milestone durations
            temp.milestoneDuration = milestoneDuration[i] < MAX_DURATION
                ? milestoneDuration[i]
                : MAX_DURATION;
            s_tranches.push(temp);
        }
        i_preFundingStartTime = block.timestamp;
        s_tranche = 0;
        s_activeFunded = 0;
        s_totalFunded = 0;
        s_votesTried = 0;
        s_preMilestoneFunded = 0;
        s_fundState = FundState.PREFUNDING;
        calledVoteAfterExpiry = false;
        voteEnded = false;
    }

    /// @notice Fund the contract with a token and evenly splits it between tranches for you if in PENDING state and holds it if in PREFUNDING state
    /// @dev Possibly a way to make it more gas efficient with different variables
    /// @param amount the amount to be funded to the contract
    function fund(uint256 amount, bool current) public {
        if (s_fundState != FundState.PENDING && s_fundState != FundState.PREFUNDING) {
            revert PromiseFund__NotFundingPeriod();
        }
        if (
            (s_fundState == FundState.PREFUNDING &&
                ((block.timestamp - i_preFundingStartTime) > i_preFundingDuration)) ||
            (s_fundState == FundState.PENDING &&
                ((block.timestamp - s_tranches[s_tranche].startTime) >
                    s_tranches[s_tranche].milestoneDuration))
        ) {
            revert PromiseFund_CannotFundRoundEnded();
        }
        if (amount <= 0) {
            revert PromiseFund__FundAmountMustBeAboveZero();
        }

        // Transferring from sender to contract
        IERC20(i_assetAddress).transferFrom(msg.sender, address(this), amount);
        uint256 length = current ? s_tranche + 1 : s_tranches.length;

        if (s_fundState == FundState.PREFUNDING) {
            s_activeFunded = s_activeFunded + amount;
            s_preMilestoneFunded = s_preMilestoneFunded + amount;
        } else {
            //set bool array to true if funder hasn't funded like this before
            if (s_allFunders[msg.sender].amount[s_numberOfMilestones - 1] == 0) {
                s_allFunders[msg.sender].timesVoted[s_tranche] = 0;
                for (uint256 trancheIndex = s_tranche; trancheIndex < length; trancheIndex++) {
                    s_allFunders[msg.sender].fundMilestone[trancheIndex] = true;
                }
            }
            //useful for rounding errors with division
            uint256 temp = amount;
            //loop through tranches and update the amount funded. uniform split of funds
            for (uint256 trancheIndex = s_tranche; trancheIndex < length; trancheIndex++) {
                //not perfect division so give last tranche rest of funds if extra decimals exist
                if (trancheIndex + 1 == s_tranches.length) {
                    s_tranches[trancheIndex].activeRaised += temp;
                    s_tranches[trancheIndex].totalRaised += temp; //accounting purposes
                    s_allFunders[msg.sender].amount[trancheIndex] += temp;
                } else {
                    s_tranches[trancheIndex].activeRaised += (amount / (length - s_tranche));
                    s_tranches[trancheIndex].totalRaised += (amount / (length - s_tranche)); //accounting purposes
                    temp -= (amount / (length - s_tranche));
                    s_allFunders[msg.sender].amount[trancheIndex] += (amount /
                        (length - s_tranche));
                }
            }

            //add to total deposits and user deposits
            s_activeFunded = s_activeFunded + amount;
            // Set the number of votes to 1 for now. Will be weighted in the future.
            // allows for voting at all milestones
            s_allFunders[msg.sender].votes = 1;
            //set withdrewAllFunds to false
            s_allFunders[msg.sender].withdrewAllFunds = false;

            emit FunderAdded(msg.sender, i_owner, i_assetAddress, amount);
        }
        //tracks total funded
        s_totalFunded += amount;
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

        if (total <= 0) {
            revert PromiseFund_NothingToWithdraw();
        }

        // Before actual transfer to deter reentrancy (I think)
        s_allFunders[msg.sender].withdrewAllFunds = true;
        s_activeFunded -= total;

        // Have to give allowance for contract to send funds
        approveTransfer(IERC20(i_assetAddress), address(this), total);
        IERC20(i_assetAddress).transferFrom(address(this), msg.sender, total);

        emit FundsWithdrawn(msg.sender, i_owner, i_assetAddress, total);
    }

    /// @notice withdrawing proceeds from the current tranche. Owner must withdraw all funds.
    /// after the owner withdraws all of the proceeds, reset necessary variables for next milestone:
    function withdrawProceeds() public onlyOwner {
        if (s_fundState != FundState.OWNER_WITHDRAW && s_fundState != FundState.PREFUNDING) {
            revert PromiseFund__CantWithdrawOwner();
        }

        if (
            s_fundState == FundState.PREFUNDING &&
            ((block.timestamp - i_preFundingStartTime) < i_preFundingDuration)
        ) {
            revert PromiseFund_OwnerMustWaitForPreFundingToEnd();
        }

        uint256 total;

        //if withdrawing in prefunding stage, start milestone phase and reset necessary variables
        if (s_fundState == FundState.PREFUNDING) {
            total = s_activeFunded;
            s_activeFunded = 0;
            if (total < 0) {
                revert PromiseFund_NothingToWithdraw();
            }
            if (total > 0) {
                approveTransfer(IERC20(i_assetAddress), address(this), total);
                IERC20(i_assetAddress).transferFrom(address(this), msg.sender, total);
            }
            //initialize first tranche and beginning of milestone based funding!
            s_tranches[0].startTime = block.timestamp;
            s_fundState = FundState.PENDING;
        } else {
            total = s_tranches[s_tranche].activeRaised;

            //if total equals 0 and the fundraiser still wants to progress to another milestone, they can
            if (total < 0) {
                revert PromiseFund_NothingToWithdraw();
            }

            s_activeFunded -= total;
            s_tranches[s_tranche].activeRaised -= total;

            // Redeem tokens and send them directly to the funder
            if (total > 0) {
                approveTransfer(IERC20(i_assetAddress), address(this), total);
                IERC20(i_assetAddress).transferFrom(address(this), msg.sender, total);
            }

            // reset all variables for following tranche if it isn't the last tranche
            // if it is the last tranche, the contract stayts in the OWNER_WITHDRAW state and no more funding
            // or withdrawing can take place, thereby rendering the functionality useless
            if (s_tranche != s_numberOfMilestones - 1) {
                s_tranche += 1;
                s_tranches[s_tranche].startTime = block.timestamp;
                s_fundState = FundState.PENDING;
                s_votesTried = 0;
                s_votesCon = 0;
                s_votesPro = 0;
                calledVoteAfterExpiry = false;
            }
            // after the owner withdraws, funders can't call ownerWithdrawPeriodExpired
            voteEnded = false;
        }
        emit ProceedsWithdrawn(i_owner, i_assetAddress, total);
    }

    /// @notice check to see if 30 days have passed... if they have and there is still more to be withdrawn change state to funder withdraw!
    // This ensures that owner is sticking to schedule and not locking everyones money up forever
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
            (block.timestamp - s_tranches[s_tranche].startTime) <
            s_tranches[s_tranche].milestoneDuration
        ) {
            revert PromiseFund_FunderCannotCallForVote();
        }

        if (
            (block.timestamp - s_tranches[s_tranche].startTime) >
            s_tranches[s_tranche].milestoneDuration
        ) {
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
        if (!s_allFunders[msg.sender].fundMilestone[s_tranche]) {
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

        s_allFunders[msg.sender].timesVoted[s_tranche] =
            s_allFunders[msg.sender].votes *
            s_votesTried;
        support ? s_votesPro += 1 : s_votesCon += 1;
    }

    /// @notice Allows anyone to call the end of the vote if the time alotted has ended
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
            ((block.timestamp - s_tranches[s_tranche].startTime) >
                s_tranches[s_tranche].milestoneDuration)
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

    /// @notice Allows the owner of a contract to add a milestone if they haven't already had 5 milestones limited to pending state and owner_withdraw
    /// @param duration the amount of time for the next milestone
    function addMilestone(uint256 duration) public onlyOwner {
        if (s_fundState == FundState.VOTING || s_fundState == FundState.FUNDER_WITHDRAW) {
            revert PromiseFund__StateNotAbleToAddMilestone();
        }
        if (s_tranches.length >= 5) {
            revert PromiseFund_MaxAmountOfMilestones();
        }

        Milestone memory temp;
        temp.milestoneDuration = duration < MAX_DURATION ? duration : MAX_DURATION;
        s_tranches.push(temp);

        //if the owner withdrew already at the last milestone and then decides to add another milestone
        //voteEnded is only false while fundState is in Owner_withdraw if it was withdrawn on last milestone
        if ((s_fundState == FundState.OWNER_WITHDRAW) && (voteEnded == false)) {
            s_tranche += 1;
            s_tranches[s_tranche].startTime = block.timestamp;
            s_fundState = FundState.PENDING;
            s_votesTried = 0;
            s_votesCon = 0;
            s_votesPro = 0;
            calledVoteAfterExpiry = false;
        }

        s_numberOfMilestones += 1;
    }

    /** Getter Functions */

    /// @notice Get the fund amount of a given address by looping through their funder array starting at most recent tranche
    /// @param funder the funder whose balance is being checked
    /// @return The uint256 amount the funder currently has funded/ is entitled to withdraw if milestones end
    function getFundAmount(address funder) public view returns (uint256) {
        if (s_allFunders[funder].withdrewAllFunds) {
            return 0;
        }
        uint256 sum = 0;
        for (uint256 i = s_tranche; i < s_allFunders[funder].amount.length; i++) {
            sum += s_allFunders[funder].amount[i];
        }
        return sum;
    }

    /// @notice Get the total amount raised in the seed fundraising round
    /// @return s_preMilestoneFunded
    function getPreMilestoneTotalFunds() public view returns (uint256) {
        return s_preMilestoneFunded;
    }

    /// @notice Get the total current amount donated to contract/fundraiser. After withdrawing, this amount decreases
    /// @return s_activeFunded
    function getCurrentTotalFunds() public view returns (uint256) {
        return s_activeFunded;
    }

    /// @notice Get the total amount donated to contract/fundraiser
    /// @return The total amount ever donated
    function getLifeTimeAmountFunded() public view returns (uint256) {
        return s_totalFunded;
    }

    /// @notice Get whether or not the user withdrew their funds yet
    /// @return True if yes, False if no
    function didFunderWithdrawFunds(address funder) public view returns (bool) {
        return s_allFunders[funder].withdrewAllFunds;
    }

    /// @notice Gets the asset address of this contract
    /// @return assetAddress
    function getAssetAddress() public view returns (address) {
        return i_assetAddress;
    }

    /// @notice Gets the max duration for a milestone
    /// @return maxDuration
    function getMaxDuration() public pure returns (uint256) {
        return MAX_DURATION;
    }

    /// @notice Gets the max number of milestones
    /// @return maxMilestones
    function getMaxMilestones() public pure returns (uint8) {
        return MAX_MILESTONES;
    }

    /// @notice Gets the current number of milestones
    /// @return i_numberOfMilestones
    function getNumberOfMilestones() public view returns (uint256) {
        return s_numberOfMilestones;
    }

    // /// @notice Gets the block time... Useing this function for testing purposes. Can be removed later
    // function getBlockTime() public view returns (uint256) {
    //     return block.timestamp;
    // }

    /// @notice Get the owner of the contract
    /// @return i_owner The address of the contract's owner
    function getOwner() public view returns (address) {
        return i_owner;
    }

    /// @notice Get the current state of the contract
    /// @return s_fundState
    function getState() public view returns (FundState) {
        return s_fundState;
    }

    /// @notice Get the time that the seed Funding started
    /// @return i_preFundingStartTime
    function getPreStartTime() public view returns (uint256) {
        return i_preFundingStartTime;
    }

    /// @notice Get the seed round duration in seconds
    /// @return i_preFundingDuration
    function getPreDuration() public view returns (uint256) {
        return i_preFundingDuration;
    }

    /// @notice Get the amount of proceeds that the owner can withdraw
    /// @return The amount of withdrawable proceeds
    function getWithdrawableProceeds() public view returns (uint256) {
        if (s_fundState == FundState.OWNER_WITHDRAW) {
            return s_activeFunded;
        }
        return 0;
    }

    /// @notice Get the current tranche
    /// @return s_tranche
    function getCurrentTranche() public view returns (uint8) {
        return s_tranche;
    }

    /// @notice Get the Milestone Array that keeps track of amount raised, duration, and startTime
    /// @return s_tranches The entire Milestone tranches array
    function getTranches() public view returns (Milestone[] memory) {
        return s_tranches;
    }

    /// @notice Get the milestone duration for each tranche
    /// @return The milestone duration or time to end for specific tranche
    function getMilestoneDuration(uint256 index) public view returns (uint256) {
        return s_tranches[index].milestoneDuration;
    }

    /// @notice Get the array of milestone durations
    /// @return The milestone durations or time to end for all tranches
    function getMilestoneDurations() public view returns (uint256[] memory) {
        uint256[] memory temp = new uint256[](s_tranches.length);
        for (uint8 i = 0; i < s_tranches.length; i++) {
            temp[i] = s_tranches[i].milestoneDuration;
        }

        return temp;
    }

    /// @notice Get the total amount raised for a single Milestone level
    /// @return The amount of time left in the milestone or preFunding Round
    function getTimeLeftRound() public view returns (uint256) {
        if (s_fundState == FundState.PREFUNDING) {
            if ((block.timestamp - i_preFundingStartTime) > i_preFundingDuration) {
                return 0;
            }
            return i_preFundingDuration - (block.timestamp - i_preFundingStartTime);
        }
        if (
            (block.timestamp - s_tranches[s_tranche].startTime) <
            s_tranches[s_tranche].milestoneDuration
        ) {
            return
                s_tranches[s_tranche].milestoneDuration -
                (block.timestamp - s_tranches[s_tranche].startTime);
        }
        return 0;
    }

    /// @notice Get the total active amount raised for a single Milestone level. This value decreases as withdraws occur
    /// @param level the 'tranche' number. Ex: first milestone, second milestone...
    /// @return The uint256 amount raised in that specific tranche
    function getTrancheAmountRaised(uint256 level) public view returns (uint256) {
        return s_tranches[level].activeRaised;
    }

    /// @notice Get the total amount lifetime raised for a single Milestone level
    /// @param level the 'tranche' number. Ex: first milestone, second milestone...
    /// @return The total uint256 amount raised in that specific tranche
    function getTrancheAmountTotalRaised(uint256 level) public view returns (uint256) {
        return s_tranches[level].totalRaised;
    }

    /// @notice Get the the specific amount raised in a funders 'tranche'
    /// @param funder the address of the funder you are trying to check
    /// @param level the amount donated to a specific tranche by the donor
    /// @return The uint256 amount donated to a tranche level by the donor. This doesn't decrease after withdrawing. Shows total amount ever donated.
    function getFunderTrancheAmountRaised(address funder, uint256 level)
        public
        view
        returns (uint256)
    {
        return s_allFunders[funder].amount[level];
    }

    /// @notice Get the time that the vote ends at. Determined in startVote function
    /// @return s_voteEnd
    function getVoteEnd() public view returns (uint256) {
        if (s_fundState == FundState.VOTING) {
            return s_voteEnd;
        }
        return 0;
    }

    /// @notice Get the time left of the vote
    function getTimeLeftVoting() public view returns (uint256) {
        if (s_fundState == FundState.VOTING && s_voteEnd > block.timestamp) {
            return s_voteEnd - block.timestamp;
        }
        return 0;
    }

    /// @notice Determine whether or not a funder voted
    /// @return boolean
    function didFunderVote(address funder) public view returns (bool) {
        if (
            s_allFunders[funder].votes * s_votesTried <= s_allFunders[funder].timesVoted[s_tranche]
        ) {
            return true;
        }
        return false;
    }

    /// @notice Get whether the funder has voting power in all tranches
    /// @return .votes
    function getFunderVotes(address funder) public view returns (uint256) {
        return s_allFunders[funder].votes;
    }

    /// @notice Get whether a funder called for a vote
    /// @return calledVoteAfterExpiry boolean
    function getFunderCalledVote() public view returns (bool) {
        return calledVoteAfterExpiry;
    }

    /// @notice Get the amount of votes tried for a milestone
    /// @return s_votesTried
    function getVotesTried() public view returns (uint256) {
        return s_votesTried;
    }

    /// @notice Get the amount of votes voting 'yes' for the milestone
    /// @return s_votesPro
    function getVotesPro() public view returns (uint256) {
        return s_votesPro;
    }

    /// @notice Get the amount of votes voting 'no' for the milestone
    /// @return s_votesCon
    function getVotesCon() public view returns (uint256) {
        return s_votesCon;
    }

    /// @notice Get a bunch of fundraiser data organized in one getter function for more efficient calling
    /// @return Contract data
    function getMilestoneSummary() public view returns (MilestoneSummary memory) {
        MilestoneSummary memory summary = MilestoneSummary(
            s_tranches,
            s_tranche,
            i_assetAddress,
            s_fundState,
            s_preMilestoneFunded,
            s_totalFunded,
            i_owner,
            getTimeLeftRound(),
            s_votesTried,
            getTimeLeftVoting(),
            calledVoteAfterExpiry,
            s_preMilestoneFunded,
            i_preFundingDuration,
            i_preFundingStartTime + i_preFundingDuration,
            s_tranches[s_tranche].startTime + s_tranches[s_tranche].milestoneDuration,
            voteEnded && (block.timestamp - voteEndTime >= (MAX_OWNER_WITHDRAW_PERIOD * 86400))
        );
        return summary;
    }

    function getFunderSummary(address funder, uint256 level)
        public
        view
        returns (FunderSummary memory)
    {
        return
            FunderSummary(
                didFunderWithdrawFunds(funder),
                didFunderVote(funder),
                level <= 5 ? getFunderTrancheAmountRaised(funder, level) : 0,
                level <= 5 ? getTrancheAmountRaised(level) : 0,
                level <= 5 ? getTrancheAmountTotalRaised(level) : 0,
                getFundAmount(funder)
            );
    }
}
