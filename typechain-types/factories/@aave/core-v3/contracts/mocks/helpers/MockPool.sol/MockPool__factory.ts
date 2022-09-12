/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../common";
import type {
  MockPool,
  MockPoolInterface,
} from "../../../../../../../@aave/core-v3/contracts/mocks/helpers/MockPool.sol/MockPool";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "reserve",
        type: "address",
      },
    ],
    name: "addReserveToReservesList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getReservesList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "provider",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506104d7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063c4d66de814610046578063d1946dbc14610062578063e636a4f414610080575b600080fd5b610060600480360381019061005b91906102b4565b61009c565b005b61006a6100e0565b604051610077919061039f565b60405180910390f35b61009a600480360381019061009591906102b4565b6101eb565b005b80606460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6060600060658054905067ffffffffffffffff811115610103576101026103c1565b5b6040519080825280602002602001820160405280156101315781602001602082028036833780820191505090505b50905060005b6065805490508110156101e35760658181548110610158576101576103f0565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16828281518110610196576101956103f0565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505080806101db90610458565b915050610137565b508091505090565b6065819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061028182610256565b9050919050565b61029181610276565b811461029c57600080fd5b50565b6000813590506102ae81610288565b92915050565b6000602082840312156102ca576102c9610251565b5b60006102d88482850161029f565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61031681610276565b82525050565b6000610328838361030d565b60208301905092915050565b6000602082019050919050565b600061034c826102e1565b61035681856102ec565b9350610361836102fd565b8060005b83811015610392578151610379888261031c565b975061038483610334565b925050600181019050610365565b5085935050505092915050565b600060208201905081810360008301526103b98184610341565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000819050919050565b60006104638261044e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156104965761049561041f565b5b60018201905091905056fea264697066735822122034c1167f256fbf612c96d7dbfeb09c50c83756078bdc8888c3af9016c1d905d764736f6c634300080a0033";

type MockPoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockPoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockPool__factory extends ContractFactory {
  constructor(...args: MockPoolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockPool> {
    return super.deploy(overrides || {}) as Promise<MockPool>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockPool {
    return super.attach(address) as MockPool;
  }
  override connect(signer: Signer): MockPool__factory {
    return super.connect(signer) as MockPool__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockPoolInterface {
    return new utils.Interface(_abi) as MockPoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockPool {
    return new Contract(address, _abi, signerOrProvider) as MockPool;
  }
}
