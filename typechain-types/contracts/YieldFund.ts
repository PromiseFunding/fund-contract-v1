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

export interface YieldFundInterface extends utils.Interface {
  functions: {
    "approveTransfer(address,address,uint256)": FunctionFragment;
    "fund(uint256)": FunctionFragment;
    "getAssetAddress()": FunctionFragment;
    "getBlockTime()": FunctionFragment;
    "getFundAmount(address)": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getPoolAddress()": FunctionFragment;
    "getTimeLeft(address)": FunctionFragment;
    "getTimeLock()": FunctionFragment;
    "getWithdrawableProceeds()": FunctionFragment;
    "i_aaveTokenAddress()": FunctionFragment;
    "i_assetAddress()": FunctionFragment;
    "i_lockTime()": FunctionFragment;
    "i_owner()": FunctionFragment;
    "i_poolAddress()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "s_funders(address)": FunctionFragment;
    "s_totalFunded()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawFundsFromPool(uint256)": FunctionFragment;
    "withdrawProceeds(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approveTransfer"
      | "fund"
      | "getAssetAddress"
      | "getBlockTime"
      | "getFundAmount"
      | "getOwner"
      | "getPoolAddress"
      | "getTimeLeft"
      | "getTimeLock"
      | "getWithdrawableProceeds"
      | "i_aaveTokenAddress"
      | "i_assetAddress"
      | "i_lockTime"
      | "i_owner"
      | "i_poolAddress"
      | "owner"
      | "renounceOwnership"
      | "s_funders"
      | "s_totalFunded"
      | "transferOwnership"
      | "withdrawFundsFromPool"
      | "withdrawProceeds"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approveTransfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
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
    functionFragment: "getFundAmount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPoolAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTimeLeft",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTimeLock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWithdrawableProceeds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "i_aaveTokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "i_assetAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "i_lockTime",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "i_owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "i_poolAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_funders",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "s_totalFunded",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFundsFromPool",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawProceeds",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveTransfer",
    data: BytesLike
  ): Result;
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
    functionFragment: "getFundAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPoolAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTimeLeft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTimeLock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWithdrawableProceeds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "i_aaveTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "i_assetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "i_lockTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "i_owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "i_poolAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "s_funders", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "s_totalFunded",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFundsFromPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawProceeds",
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
  amount: BigNumber;
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
  amount: BigNumber;
}
export type ProceedsWithdrawnEvent = TypedEvent<
  [string, string, BigNumber],
  ProceedsWithdrawnEventObject
>;

export type ProceedsWithdrawnEventFilter =
  TypedEventFilter<ProceedsWithdrawnEvent>;

export interface YieldFund extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: YieldFundInterface;

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

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAssetAddress(overrides?: CallOverrides): Promise<[string]>;

    getBlockTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOwner(overrides?: CallOverrides): Promise<[string]>;

    getPoolAddress(overrides?: CallOverrides): Promise<[string]>;

    getTimeLeft(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTimeLock(overrides?: CallOverrides): Promise<[BigNumber]>;

    getWithdrawableProceeds(overrides?: CallOverrides): Promise<[BigNumber]>;

    i_aaveTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    i_assetAddress(overrides?: CallOverrides): Promise<[string]>;

    i_lockTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    i_owner(overrides?: CallOverrides): Promise<[string]>;

    i_poolAddress(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    s_funders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; entryTime: BigNumber }
    >;

    s_totalFunded(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFundsFromPool(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawProceeds(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  approveTransfer(
    token: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fund(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAssetAddress(overrides?: CallOverrides): Promise<string>;

  getBlockTime(overrides?: CallOverrides): Promise<BigNumber>;

  getFundAmount(
    funder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOwner(overrides?: CallOverrides): Promise<string>;

  getPoolAddress(overrides?: CallOverrides): Promise<string>;

  getTimeLeft(
    funder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTimeLock(overrides?: CallOverrides): Promise<BigNumber>;

  getWithdrawableProceeds(overrides?: CallOverrides): Promise<BigNumber>;

  i_aaveTokenAddress(overrides?: CallOverrides): Promise<string>;

  i_assetAddress(overrides?: CallOverrides): Promise<string>;

  i_lockTime(overrides?: CallOverrides): Promise<BigNumber>;

  i_owner(overrides?: CallOverrides): Promise<string>;

  i_poolAddress(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  s_funders(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; entryTime: BigNumber }
  >;

  s_totalFunded(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFundsFromPool(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawProceeds(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAssetAddress(overrides?: CallOverrides): Promise<string>;

    getBlockTime(overrides?: CallOverrides): Promise<BigNumber>;

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<string>;

    getPoolAddress(overrides?: CallOverrides): Promise<string>;

    getTimeLeft(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTimeLock(overrides?: CallOverrides): Promise<BigNumber>;

    getWithdrawableProceeds(overrides?: CallOverrides): Promise<BigNumber>;

    i_aaveTokenAddress(overrides?: CallOverrides): Promise<string>;

    i_assetAddress(overrides?: CallOverrides): Promise<string>;

    i_lockTime(overrides?: CallOverrides): Promise<BigNumber>;

    i_owner(overrides?: CallOverrides): Promise<string>;

    i_poolAddress(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    s_funders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; entryTime: BigNumber }
    >;

    s_totalFunded(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFundsFromPool(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawProceeds(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
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
      amount?: null
    ): FundsWithdrawnEventFilter;
    FundsWithdrawn(
      funder?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      assetAddress?: PromiseOrValue<string> | null,
      amount?: null
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
      amount?: null
    ): ProceedsWithdrawnEventFilter;
    ProceedsWithdrawn(
      owner?: PromiseOrValue<string> | null,
      assetAddress?: PromiseOrValue<string> | null,
      amount?: null
    ): ProceedsWithdrawnEventFilter;
  };

  estimateGas: {
    approveTransfer(
      token: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAssetAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getBlockTime(overrides?: CallOverrides): Promise<BigNumber>;

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getPoolAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getTimeLeft(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTimeLock(overrides?: CallOverrides): Promise<BigNumber>;

    getWithdrawableProceeds(overrides?: CallOverrides): Promise<BigNumber>;

    i_aaveTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    i_assetAddress(overrides?: CallOverrides): Promise<BigNumber>;

    i_lockTime(overrides?: CallOverrides): Promise<BigNumber>;

    i_owner(overrides?: CallOverrides): Promise<BigNumber>;

    i_poolAddress(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    s_funders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    s_totalFunded(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFundsFromPool(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawProceeds(
      amount: PromiseOrValue<BigNumberish>,
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

    fund(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAssetAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBlockTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPoolAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTimeLeft(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTimeLock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getWithdrawableProceeds(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    i_aaveTokenAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    i_assetAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    i_lockTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    i_owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    i_poolAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    s_funders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    s_totalFunded(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFundsFromPool(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawProceeds(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
