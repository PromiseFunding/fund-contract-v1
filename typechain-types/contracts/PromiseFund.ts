/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace PromiseFund {
  export type MilestoneStruct = {
    amountRaised: PromiseOrValue<BigNumberish>;
    startTime: PromiseOrValue<BigNumberish>;
    milestoneDuration: PromiseOrValue<BigNumberish>;
  };

  export type MilestoneStructOutput = [BigNumber, BigNumber, BigNumber] & {
    amountRaised: BigNumber;
    startTime: BigNumber;
    milestoneDuration: BigNumber;
  };
}

export interface PromiseFundInterface extends utils.Interface {
  functions: {
    "approveTransfer(address,address,uint256)": FunctionFragment;
    "endVote()": FunctionFragment;
    "fund(uint256)": FunctionFragment;
    "getAssetAddress()": FunctionFragment;
    "getBlockTime()": FunctionFragment;
    "getCurrentTranche()": FunctionFragment;
    "getFundAmount(address)": FunctionFragment;
    "getFunderCalledVote()": FunctionFragment;
    "getFunderTrancheAmountRaised(address,uint256)": FunctionFragment;
    "getMilestoneDuration()": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getState()": FunctionFragment;
    "getTimeLeftVoting()": FunctionFragment;
    "getTotalFunds()": FunctionFragment;
    "getTrancheAmountRaised(uint256)": FunctionFragment;
    "getTranches()": FunctionFragment;
    "getVoteEnd()": FunctionFragment;
    "getVotesCon()": FunctionFragment;
    "getVotesPro()": FunctionFragment;
    "getVotesTried()": FunctionFragment;
    "getWithdrawableProceeds()": FunctionFragment;
    "i_assetAddress()": FunctionFragment;
    "i_milestoneDuration()": FunctionFragment;
    "i_numberOfMilestones()": FunctionFragment;
    "i_owner()": FunctionFragment;
    "maxDuration()": FunctionFragment;
    "maxMilestones()": FunctionFragment;
    "owner()": FunctionFragment;
    "ownerWithdrawPeriodExpired()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "s_allFunders(address)": FunctionFragment;
    "s_totalFunded()": FunctionFragment;
    "s_voteEnd()": FunctionFragment;
    "s_votesCon()": FunctionFragment;
    "s_votesPro()": FunctionFragment;
    "s_votesTried()": FunctionFragment;
    "startVote(uint256)": FunctionFragment;
    "submitVote(bool)": FunctionFragment;
    "tranches(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawProceeds()": FunctionFragment;
    "withdrawProceedsFunder()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approveTransfer"
      | "endVote"
      | "fund"
      | "getAssetAddress"
      | "getBlockTime"
      | "getCurrentTranche"
      | "getFundAmount"
      | "getFunderCalledVote"
      | "getFunderTrancheAmountRaised"
      | "getMilestoneDuration"
      | "getOwner"
      | "getState"
      | "getTimeLeftVoting"
      | "getTotalFunds"
      | "getTrancheAmountRaised"
      | "getTranches"
      | "getVoteEnd"
      | "getVotesCon"
      | "getVotesPro"
      | "getVotesTried"
      | "getWithdrawableProceeds"
      | "i_assetAddress"
      | "i_milestoneDuration"
      | "i_numberOfMilestones"
      | "i_owner"
      | "maxDuration"
      | "maxMilestones"
      | "owner"
      | "ownerWithdrawPeriodExpired"
      | "renounceOwnership"
      | "s_allFunders"
      | "s_totalFunded"
      | "s_voteEnd"
      | "s_votesCon"
      | "s_votesPro"
      | "s_votesTried"
      | "startVote"
      | "submitVote"
      | "tranches"
      | "transferOwnership"
      | "withdrawProceeds"
      | "withdrawProceedsFunder"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approveTransfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "endVote", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "fund",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBlockTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentTranche",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFundAmount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFunderCalledVote",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFunderTrancheAmountRaised",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMilestoneDuration",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(functionFragment: "getState", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getTimeLeftVoting",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTrancheAmountRaised",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTranches",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVoteEnd",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVotesCon",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVotesPro",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVotesTried",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWithdrawableProceeds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "i_assetAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "i_milestoneDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "i_numberOfMilestones",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "i_owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "maxDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxMilestones",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerWithdrawPeriodExpired",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_allFunders",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "s_totalFunded",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "s_voteEnd", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "s_votesCon",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_votesPro",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_votesTried",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "startVote",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "submitVote",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "tranches",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawProceeds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawProceedsFunder",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "approveTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAssetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBlockTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentTranche",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFundAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFunderCalledVote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFunderTrancheAmountRaised",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMilestoneDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTimeLeftVoting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTrancheAmountRaised",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTranches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVoteEnd", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVotesCon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVotesPro",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVotesTried",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWithdrawableProceeds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "i_assetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "i_milestoneDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "i_numberOfMilestones",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "i_owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxMilestones",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownerWithdrawPeriodExpired",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "s_allFunders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "s_totalFunded",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "s_voteEnd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "s_votesCon", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "s_votesPro", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "s_votesTried",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "startVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "submitVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tranches", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawProceeds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawProceedsFunder",
    data: BytesLike
  ): Result;

  events: {
    "FunderAdded(address,address,address,uint256)": EventFragment;
    "FundsWithdrawn(address,address,address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ProceedsWithdrawn(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FunderAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FundsWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProceedsWithdrawn"): EventFragment;
}

export interface FunderAddedEventObject {
  funder: string;
  owner: string;
  assetAddress: string;
  amount: BigNumber;
}
export type FunderAddedEvent = TypedEvent<
  [string, string, string, BigNumber],
  FunderAddedEventObject
>;

export type FunderAddedEventFilter = TypedEventFilter<FunderAddedEvent>;

export interface FundsWithdrawnEventObject {
  funder: string;
  owner: string;
  assetAddress: string;
  total: BigNumber;
}
export type FundsWithdrawnEvent = TypedEvent<
  [string, string, string, BigNumber],
  FundsWithdrawnEventObject
>;

export type FundsWithdrawnEventFilter = TypedEventFilter<FundsWithdrawnEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ProceedsWithdrawnEventObject {
  owner: string;
  assetAddress: string;
  total: BigNumber;
}
export type ProceedsWithdrawnEvent = TypedEvent<
  [string, string, BigNumber],
  ProceedsWithdrawnEventObject
>;

export type ProceedsWithdrawnEventFilter =
  TypedEventFilter<ProceedsWithdrawnEvent>;

export interface PromiseFund extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PromiseFundInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    endVote(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAssetAddress(overrides?: CallOverrides): Promise<[string]>;

    getBlockTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    getCurrentTranche(overrides?: CallOverrides): Promise<[number]>;

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getFunderCalledVote(overrides?: CallOverrides): Promise<[boolean]>;

    getFunderTrancheAmountRaised(
      funder: PromiseOrValue<string>,
      level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMilestoneDuration(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOwner(overrides?: CallOverrides): Promise<[string]>;

    getState(overrides?: CallOverrides): Promise<[number]>;

    getTimeLeftVoting(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalFunds(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTrancheAmountRaised(
      level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTranches(
      overrides?: CallOverrides
    ): Promise<[PromiseFund.MilestoneStructOutput[]]>;

    getVoteEnd(overrides?: CallOverrides): Promise<[BigNumber]>;

    getVotesCon(overrides?: CallOverrides): Promise<[BigNumber]>;

    getVotesPro(overrides?: CallOverrides): Promise<[BigNumber]>;

    getVotesTried(overrides?: CallOverrides): Promise<[BigNumber]>;

    getWithdrawableProceeds(overrides?: CallOverrides): Promise<[BigNumber]>;

    i_assetAddress(overrides?: CallOverrides): Promise<[string]>;

    i_milestoneDuration(overrides?: CallOverrides): Promise<[BigNumber]>;

    i_numberOfMilestones(overrides?: CallOverrides): Promise<[number]>;

    i_owner(overrides?: CallOverrides): Promise<[string]>;

    maxDuration(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxMilestones(overrides?: CallOverrides): Promise<[number]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    ownerWithdrawPeriodExpired(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    s_allFunders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & { votes: BigNumber; withdrewAllFunds: boolean }
    >;

    s_totalFunded(overrides?: CallOverrides): Promise<[BigNumber]>;

    s_voteEnd(overrides?: CallOverrides): Promise<[BigNumber]>;

    s_votesCon(overrides?: CallOverrides): Promise<[BigNumber]>;

    s_votesPro(overrides?: CallOverrides): Promise<[BigNumber]>;

    s_votesTried(overrides?: CallOverrides): Promise<[BigNumber]>;

    startVote(
      length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submitVote(
      support: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tranches(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amountRaised: BigNumber;
        startTime: BigNumber;
        milestoneDuration: BigNumber;
      }
    >;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawProceeds(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawProceedsFunder(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  approveTransfer(
    token: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  endVote(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fund(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAssetAddress(overrides?: CallOverrides): Promise<string>;

  getBlockTime(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentTranche(overrides?: CallOverrides): Promise<number>;

  getFundAmount(
    funder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getFunderCalledVote(overrides?: CallOverrides): Promise<boolean>;

  getFunderTrancheAmountRaised(
    funder: PromiseOrValue<string>,
    level: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMilestoneDuration(overrides?: CallOverrides): Promise<BigNumber>;

  getOwner(overrides?: CallOverrides): Promise<string>;

  getState(overrides?: CallOverrides): Promise<number>;

  getTimeLeftVoting(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalFunds(overrides?: CallOverrides): Promise<BigNumber>;

  getTrancheAmountRaised(
    level: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTranches(
    overrides?: CallOverrides
  ): Promise<PromiseFund.MilestoneStructOutput[]>;

  getVoteEnd(overrides?: CallOverrides): Promise<BigNumber>;

  getVotesCon(overrides?: CallOverrides): Promise<BigNumber>;

  getVotesPro(overrides?: CallOverrides): Promise<BigNumber>;

  getVotesTried(overrides?: CallOverrides): Promise<BigNumber>;

  getWithdrawableProceeds(overrides?: CallOverrides): Promise<BigNumber>;

  i_assetAddress(overrides?: CallOverrides): Promise<string>;

  i_milestoneDuration(overrides?: CallOverrides): Promise<BigNumber>;

  i_numberOfMilestones(overrides?: CallOverrides): Promise<number>;

  i_owner(overrides?: CallOverrides): Promise<string>;

  maxDuration(overrides?: CallOverrides): Promise<BigNumber>;

  maxMilestones(overrides?: CallOverrides): Promise<number>;

  owner(overrides?: CallOverrides): Promise<string>;

  ownerWithdrawPeriodExpired(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  s_allFunders(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, boolean] & { votes: BigNumber; withdrewAllFunds: boolean }
  >;

  s_totalFunded(overrides?: CallOverrides): Promise<BigNumber>;

  s_voteEnd(overrides?: CallOverrides): Promise<BigNumber>;

  s_votesCon(overrides?: CallOverrides): Promise<BigNumber>;

  s_votesPro(overrides?: CallOverrides): Promise<BigNumber>;

  s_votesTried(overrides?: CallOverrides): Promise<BigNumber>;

  startVote(
    length: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submitVote(
    support: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tranches(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      amountRaised: BigNumber;
      startTime: BigNumber;
      milestoneDuration: BigNumber;
    }
  >;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawProceeds(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawProceedsFunder(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    endVote(overrides?: CallOverrides): Promise<void>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAssetAddress(overrides?: CallOverrides): Promise<string>;

    getBlockTime(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentTranche(overrides?: CallOverrides): Promise<number>;

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFunderCalledVote(overrides?: CallOverrides): Promise<boolean>;

    getFunderTrancheAmountRaised(
      funder: PromiseOrValue<string>,
      level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMilestoneDuration(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<string>;

    getState(overrides?: CallOverrides): Promise<number>;

    getTimeLeftVoting(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalFunds(overrides?: CallOverrides): Promise<BigNumber>;

    getTrancheAmountRaised(
      level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTranches(
      overrides?: CallOverrides
    ): Promise<PromiseFund.MilestoneStructOutput[]>;

    getVoteEnd(overrides?: CallOverrides): Promise<BigNumber>;

    getVotesCon(overrides?: CallOverrides): Promise<BigNumber>;

    getVotesPro(overrides?: CallOverrides): Promise<BigNumber>;

    getVotesTried(overrides?: CallOverrides): Promise<BigNumber>;

    getWithdrawableProceeds(overrides?: CallOverrides): Promise<BigNumber>;

    i_assetAddress(overrides?: CallOverrides): Promise<string>;

    i_milestoneDuration(overrides?: CallOverrides): Promise<BigNumber>;

    i_numberOfMilestones(overrides?: CallOverrides): Promise<number>;

    i_owner(overrides?: CallOverrides): Promise<string>;

    maxDuration(overrides?: CallOverrides): Promise<BigNumber>;

    maxMilestones(overrides?: CallOverrides): Promise<number>;

    owner(overrides?: CallOverrides): Promise<string>;

    ownerWithdrawPeriodExpired(overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    s_allFunders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & { votes: BigNumber; withdrewAllFunds: boolean }
    >;

    s_totalFunded(overrides?: CallOverrides): Promise<BigNumber>;

    s_voteEnd(overrides?: CallOverrides): Promise<BigNumber>;

    s_votesCon(overrides?: CallOverrides): Promise<BigNumber>;

    s_votesPro(overrides?: CallOverrides): Promise<BigNumber>;

    s_votesTried(overrides?: CallOverrides): Promise<BigNumber>;

    startVote(
      length: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    submitVote(
      support: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    tranches(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amountRaised: BigNumber;
        startTime: BigNumber;
        milestoneDuration: BigNumber;
      }
    >;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawProceeds(overrides?: CallOverrides): Promise<void>;

    withdrawProceedsFunder(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "FunderAdded(address,address,address,uint256)"(
      funder?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      assetAddress?: PromiseOrValue<string> | null,
      amount?: null
    ): FunderAddedEventFilter;
    FunderAdded(
      funder?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      assetAddress?: PromiseOrValue<string> | null,
      amount?: null
    ): FunderAddedEventFilter;

    "FundsWithdrawn(address,address,address,uint256)"(
      funder?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      assetAddress?: PromiseOrValue<string> | null,
      total?: null
    ): FundsWithdrawnEventFilter;
    FundsWithdrawn(
      funder?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      assetAddress?: PromiseOrValue<string> | null,
      total?: null
    ): FundsWithdrawnEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "ProceedsWithdrawn(address,address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      assetAddress?: PromiseOrValue<string> | null,
      total?: null
    ): ProceedsWithdrawnEventFilter;
    ProceedsWithdrawn(
      owner?: PromiseOrValue<string> | null,
      assetAddress?: PromiseOrValue<string> | null,
      total?: null
    ): ProceedsWithdrawnEventFilter;
  };

  estimateGas: {
    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    endVote(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAssetAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getBlockTime(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentTranche(overrides?: CallOverrides): Promise<BigNumber>;

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFunderCalledVote(overrides?: CallOverrides): Promise<BigNumber>;

    getFunderTrancheAmountRaised(
      funder: PromiseOrValue<string>,
      level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMilestoneDuration(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getState(overrides?: CallOverrides): Promise<BigNumber>;

    getTimeLeftVoting(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalFunds(overrides?: CallOverrides): Promise<BigNumber>;

    getTrancheAmountRaised(
      level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTranches(overrides?: CallOverrides): Promise<BigNumber>;

    getVoteEnd(overrides?: CallOverrides): Promise<BigNumber>;

    getVotesCon(overrides?: CallOverrides): Promise<BigNumber>;

    getVotesPro(overrides?: CallOverrides): Promise<BigNumber>;

    getVotesTried(overrides?: CallOverrides): Promise<BigNumber>;

    getWithdrawableProceeds(overrides?: CallOverrides): Promise<BigNumber>;

    i_assetAddress(overrides?: CallOverrides): Promise<BigNumber>;

    i_milestoneDuration(overrides?: CallOverrides): Promise<BigNumber>;

    i_numberOfMilestones(overrides?: CallOverrides): Promise<BigNumber>;

    i_owner(overrides?: CallOverrides): Promise<BigNumber>;

    maxDuration(overrides?: CallOverrides): Promise<BigNumber>;

    maxMilestones(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ownerWithdrawPeriodExpired(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    s_allFunders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    s_totalFunded(overrides?: CallOverrides): Promise<BigNumber>;

    s_voteEnd(overrides?: CallOverrides): Promise<BigNumber>;

    s_votesCon(overrides?: CallOverrides): Promise<BigNumber>;

    s_votesPro(overrides?: CallOverrides): Promise<BigNumber>;

    s_votesTried(overrides?: CallOverrides): Promise<BigNumber>;

    startVote(
      length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submitVote(
      support: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tranches(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawProceeds(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawProceedsFunder(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    endVote(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAssetAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBlockTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentTranche(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFunderCalledVote(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFunderTrancheAmountRaised(
      funder: PromiseOrValue<string>,
      level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMilestoneDuration(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTimeLeftVoting(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalFunds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTrancheAmountRaised(
      level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTranches(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVoteEnd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVotesCon(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVotesPro(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVotesTried(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getWithdrawableProceeds(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    i_assetAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    i_milestoneDuration(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    i_numberOfMilestones(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    i_owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxDuration(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxMilestones(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerWithdrawPeriodExpired(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    s_allFunders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    s_totalFunded(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_voteEnd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_votesCon(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_votesPro(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_votesTried(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    startVote(
      length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submitVote(
      support: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tranches(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawProceeds(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawProceedsFunder(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
