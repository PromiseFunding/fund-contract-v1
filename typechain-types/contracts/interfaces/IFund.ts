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
} from "../../common";

export interface IFundInterface extends utils.Interface {
  functions: {
    "approveTransfer(address,address,uint256)": FunctionFragment;
    "fund(uint256)": FunctionFragment;
    "getAssetAddress()": FunctionFragment;
    "getFundAmount(address)": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getState()": FunctionFragment;
    "withdrawProceeds(uint256)": FunctionFragment;
    "withdrawProceedsFunder(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approveTransfer"
      | "fund"
      | "getAssetAddress"
      | "getFundAmount"
      | "getOwner"
      | "getState"
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
  encodeFunctionData(
    functionFragment: "fund",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFundAmount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(functionFragment: "getState", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawProceeds",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawProceedsFunder",
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
    functionFragment: "getFundAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
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
    "ProceedsWithdrawn(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FunderAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FundsWithdrawn"): EventFragment;
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

export interface IFund extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFundInterface;

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

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOwner(overrides?: CallOverrides): Promise<[string]>;

    getState(overrides?: CallOverrides): Promise<[number]>;

    withdrawProceeds(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawProceedsFunder(
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

  getFundAmount(
    funder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOwner(overrides?: CallOverrides): Promise<string>;

  getState(overrides?: CallOverrides): Promise<number>;

  withdrawProceeds(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawProceedsFunder(
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

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<string>;

    getState(overrides?: CallOverrides): Promise<number>;

    withdrawProceeds(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawProceedsFunder(
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

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getState(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawProceeds(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawProceedsFunder(
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

    getFundAmount(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawProceeds(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawProceedsFunder(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
