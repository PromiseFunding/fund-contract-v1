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
    "addMilestone(uint256)": FunctionFragment;
    "approveTransfer(address,address,uint256)": FunctionFragment;
    "didFunderVote(address)": FunctionFragment;
    "endVote()": FunctionFragment;
    "fund(uint256)": FunctionFragment;
    "fundCurrentTrancheOnly(uint256)": FunctionFragment;
    "getAssetAddress()": FunctionFragment;
    "getBlockTime()": FunctionFragment;
    "getCurrentTranche()": FunctionFragment;
    "getFundAmount(address)": FunctionFragment;
    "getFunderCalledVote()": FunctionFragment;
    "getFunderTrancheAmountRaised(address,uint256)": FunctionFragment;
    "getFunderVotes(address)": FunctionFragment;
    "getMaxDuration()": FunctionFragment;
    "getMaxMilestones()": FunctionFragment;
    "getMilestoneDuration(uint256)": FunctionFragment;
    "getMilestoneDurations()": FunctionFragment;
    "getNumberOfMilestones()": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getPreStartTime()": FunctionFragment;
    "getState()": FunctionFragment;
    "getTimeLeftMilestone()": FunctionFragment;
    "getTimeLeftVoting()": FunctionFragment;
    "getTotalFunds()": FunctionFragment;
    "getTrancheAmountRaised(uint256)": FunctionFragment;
    "getTranches()": FunctionFragment;
    "getVoteEnd()": FunctionFragment;
    "getVotesCon()": FunctionFragment;
    "getVotesPro()": FunctionFragment;
    "getVotesTried()": FunctionFragment;
    "getWithdrawableProceeds()": FunctionFragment;
    "owner()": FunctionFragment;
    "ownerWithdrawPeriodExpired()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "startVote(uint256)": FunctionFragment;
    "submitVote(bool)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawProceeds()": FunctionFragment;
    "withdrawProceedsFunder()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addMilestone"
      | "approveTransfer"
      | "didFunderVote"
      | "endVote"
      | "fund"
      | "fundCurrentTrancheOnly"
      | "getAssetAddress"
      | "getBlockTime"
      | "getCurrentTranche"
      | "getFundAmount"
      | "getFunderCalledVote"
      | "getFunderTrancheAmountRaised"
      | "getFunderVotes"
      | "getMaxDuration"
      | "getMaxMilestones"
      | "getMilestoneDuration"
      | "getMilestoneDurations"
      | "getNumberOfMilestones"
      | "getOwner"
      | "getPreStartTime"
      | "getState"
      | "getTimeLeftMilestone"
      | "getTimeLeftVoting"
      | "getTotalFunds"
      | "getTrancheAmountRaised"
      | "getTranches"
      | "getVoteEnd"
      | "getVotesCon"
      | "getVotesPro"
      | "getVotesTried"
      | "getWithdrawableProceeds"
      | "owner"
      | "ownerWithdrawPeriodExpired"
      | "renounceOwnership"
      | "startVote"
      | "submitVote"
      | "transferOwnership"
      | "withdrawProceeds"
      | "withdrawProceedsFunder"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addMilestone",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveTransfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "didFunderVote",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "endVote", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "fund",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "fundCurrentTrancheOnly",
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
    functionFragment: "getFunderVotes",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxMilestones",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMilestoneDuration",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMilestoneDurations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumberOfMilestones",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPreStartTime",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getState", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getTimeLeftMilestone",
    values?: undefined
  ): string;
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
    functionFragment: "startVote",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "submitVote",
    values: [PromiseOrValue<boolean>]
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
    functionFragment: "addMilestone",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "didFunderVote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fundCurrentTrancheOnly",
    data: BytesLike
  ): Result;
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
    functionFragment: "getFunderVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxMilestones",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMilestoneDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMilestoneDurations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumberOfMilestones",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPreStartTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTimeLeftMilestone",
    data: BytesLike
  ): Result;
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
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownerWithdrawPeriodExpired",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "startVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "submitVote", data: BytesLike): Result;
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
    addMilestone(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    didFunderVote(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    endVote(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fundCurrentTrancheOnly(
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

    getFunderVotes(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMaxDuration(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMaxMilestones(overrides?: CallOverrides): Promise<[number]>;

    getMilestoneDuration(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMilestoneDurations(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getNumberOfMilestones(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOwner(overrides?: CallOverrides): Promise<[string]>;

    getPreStartTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    getState(overrides?: CallOverrides): Promise<[number]>;

    getTimeLeftMilestone(overrides?: CallOverrides): Promise<[BigNumber]>;

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

    owner(overrides?: CallOverrides): Promise<[string]>;

    ownerWithdrawPeriodExpired(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    startVote(
      length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submitVote(
      support: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

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

  addMilestone(
    duration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveTransfer(
    token: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  didFunderVote(
    funder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  endVote(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fund(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fundCurrentTrancheOnly(
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

  getFunderVotes(
    funder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMaxDuration(overrides?: CallOverrides): Promise<BigNumber>;

  getMaxMilestones(overrides?: CallOverrides): Promise<number>;

  getMilestoneDuration(
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMilestoneDurations(overrides?: CallOverrides): Promise<BigNumber[]>;

  getNumberOfMilestones(overrides?: CallOverrides): Promise<BigNumber>;

  getOwner(overrides?: CallOverrides): Promise<string>;

  getPreStartTime(overrides?: CallOverrides): Promise<BigNumber>;

  getState(overrides?: CallOverrides): Promise<number>;

  getTimeLeftMilestone(overrides?: CallOverrides): Promise<BigNumber>;

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

  owner(overrides?: CallOverrides): Promise<string>;

  ownerWithdrawPeriodExpired(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  startVote(
    length: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submitVote(
    support: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

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
    addMilestone(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    didFunderVote(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    endVote(overrides?: CallOverrides): Promise<void>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    fundCurrentTrancheOnly(
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

    getFunderVotes(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxDuration(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxMilestones(overrides?: CallOverrides): Promise<number>;

    getMilestoneDuration(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMilestoneDurations(overrides?: CallOverrides): Promise<BigNumber[]>;

    getNumberOfMilestones(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<string>;

    getPreStartTime(overrides?: CallOverrides): Promise<BigNumber>;

    getState(overrides?: CallOverrides): Promise<number>;

    getTimeLeftMilestone(overrides?: CallOverrides): Promise<BigNumber>;

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

    owner(overrides?: CallOverrides): Promise<string>;

    ownerWithdrawPeriodExpired(overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    startVote(
      length: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    submitVote(
      support: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

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
    addMilestone(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    didFunderVote(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    endVote(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fundCurrentTrancheOnly(
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

    getFunderVotes(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxDuration(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxMilestones(overrides?: CallOverrides): Promise<BigNumber>;

    getMilestoneDuration(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMilestoneDurations(overrides?: CallOverrides): Promise<BigNumber>;

    getNumberOfMilestones(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getPreStartTime(overrides?: CallOverrides): Promise<BigNumber>;

    getState(overrides?: CallOverrides): Promise<BigNumber>;

    getTimeLeftMilestone(overrides?: CallOverrides): Promise<BigNumber>;

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

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ownerWithdrawPeriodExpired(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    startVote(
      length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submitVote(
      support: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
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
    addMilestone(
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    didFunderVote(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    endVote(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fundCurrentTrancheOnly(
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

    getFunderVotes(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxDuration(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxMilestones(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMilestoneDuration(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMilestoneDurations(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNumberOfMilestones(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPreStartTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTimeLeftMilestone(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

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

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerWithdrawPeriodExpired(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    startVote(
      length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submitVote(
      support: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
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
