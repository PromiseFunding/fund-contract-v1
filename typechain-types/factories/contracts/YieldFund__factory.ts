/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { YieldFund, YieldFundInterface } from "../../contracts/YieldFund";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lockTime",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "assetAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "YieldFund__FundAmountMustBeAboveZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "YieldFund__WithdrawFundsGreaterThanBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "funder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "assetAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FunderAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "funder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "assetAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsWithdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "approveOtherContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "fund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "funder",
        type: "address",
      },
    ],
    name: "getFundAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_assetAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_lockTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_poolAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "s_funders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_totalFunded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawFundsFromPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b506040516200113c3803806200113c8339818101604052810190620000379190620001af565b8260808181525050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506200020b565b600080fd5b6000819050919050565b62000124816200010f565b81146200013057600080fd5b50565b600081519050620001448162000119565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000177826200014a565b9050919050565b62000189816200016a565b81146200019557600080fd5b50565b600081519050620001a9816200017e565b92915050565b600080600060608486031215620001cb57620001ca6200010a565b5b6000620001db8682870162000133565b9350506020620001ee8682870162000198565b9250506040620002018682870162000198565b9150509250925092565b608051610f156200022760003960006109650152610f156000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063893d20e811610071578063893d20e814610152578063a6b28bea14610170578063bb75f1e9146101a0578063ca03d478146101bc578063ced7428f146101da578063dba6335f146101f8576100a9565b8063275490f9146100ae57806354b05c06146100ca57806360d727b2146100e85780637b1837de1461011857806385d62fee14610134575b600080fd5b6100c860048036038101906100c391906109e6565b610216565b005b6100d26104b7565b6040516100df9190610a54565b60405180910390f35b61010260048036038101906100fd9190610a9b565b6104dd565b60405161010f9190610ad7565b60405180910390f35b610132600480360381019061012d9190610af2565b610526565b005b61013c61086b565b6040516101499190610a54565b60405180910390f35b61015a610891565b6040516101679190610a54565b60405180910390f35b61018a60048036038101906101859190610a9b565b6108ba565b6040516101979190610ad7565b60405180910390f35b6101ba60048036038101906101b59190610b70565b6108d2565b005b6101c461095d565b6040516101d19190610ad7565b60405180910390f35b6101e2610963565b6040516101ef9190610ad7565b60405180910390f35b610200610987565b60405161020d9190610bd1565b60405180910390f35b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548111156102db5780600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040517fe1af88e50000000000000000000000000000000000000000000000000000000081526004016102d2929190610bec565b60405180910390fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461032a9190610c44565b92505081905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166369328dec600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683336040518463ffffffff1660e01b81526004016103b293929190610c78565b6020604051808303816000875af11580156103d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f59190610cc4565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc322efa58c9cb2c39cfffdac61d35c8643f5cbf13c6a7d0034de2cf18923aff3846040516104ac9190610ad7565b60405180910390a450565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008111610560576040517f487deefe00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8330846040518463ffffffff1660e01b81526004016105bf93929190610cf1565b6020604051808303816000875af11580156105de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106029190610d60565b50610651600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166108d2565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663617ba037600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16833060006040518563ffffffff1660e01b81526004016106d59493929190610de0565b600060405180830381600087803b1580156106ef57600080fd5b505af1158015610703573d6000803e3d6000fd5b50505050806004546107159190610e25565b60048190555080600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546107669190610e25565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17a760e00745bb3dd2a80fdce494e6d046d397799ef94def8cc71e2665c6c5fd8460405161085f9190610ad7565b60405180910390a45050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60036020528060005260406000206000915090505481565b8173ffffffffffffffffffffffffffffffffffffffff1663095ea7b382670de0b6b3a76400006040518363ffffffff1660e01b8152600401610915929190610eb6565b6020604051808303816000875af1158015610934573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109589190610d60565b505050565b60045481565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080fd5b6000819050919050565b6109c3816109b0565b81146109ce57600080fd5b50565b6000813590506109e0816109ba565b92915050565b6000602082840312156109fc576109fb6109ab565b5b6000610a0a848285016109d1565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a3e82610a13565b9050919050565b610a4e81610a33565b82525050565b6000602082019050610a696000830184610a45565b92915050565b610a7881610a33565b8114610a8357600080fd5b50565b600081359050610a9581610a6f565b92915050565b600060208284031215610ab157610ab06109ab565b5b6000610abf84828501610a86565b91505092915050565b610ad1816109b0565b82525050565b6000602082019050610aec6000830184610ac8565b92915050565b60008060408385031215610b0957610b086109ab565b5b6000610b1785828601610a86565b9250506020610b28858286016109d1565b9150509250929050565b6000610b3d82610a33565b9050919050565b610b4d81610b32565b8114610b5857600080fd5b50565b600081359050610b6a81610b44565b92915050565b60008060408385031215610b8757610b866109ab565b5b6000610b9585828601610b5b565b9250506020610ba685828601610a86565b9150509250929050565b6000610bbb82610a13565b9050919050565b610bcb81610bb0565b82525050565b6000602082019050610be66000830184610bc2565b92915050565b6000604082019050610c016000830185610ac8565b610c0e6020830184610ac8565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610c4f826109b0565b9150610c5a836109b0565b925082821015610c6d57610c6c610c15565b5b828203905092915050565b6000606082019050610c8d6000830186610a45565b610c9a6020830185610ac8565b610ca76040830184610a45565b949350505050565b600081519050610cbe816109ba565b92915050565b600060208284031215610cda57610cd96109ab565b5b6000610ce884828501610caf565b91505092915050565b6000606082019050610d066000830186610a45565b610d136020830185610a45565b610d206040830184610ac8565b949350505050565b60008115159050919050565b610d3d81610d28565b8114610d4857600080fd5b50565b600081519050610d5a81610d34565b92915050565b600060208284031215610d7657610d756109ab565b5b6000610d8484828501610d4b565b91505092915050565b6000819050919050565b600061ffff82169050919050565b6000819050919050565b6000610dca610dc5610dc084610d8d565b610da5565b610d97565b9050919050565b610dda81610daf565b82525050565b6000608082019050610df56000830187610a45565b610e026020830186610ac8565b610e0f6040830185610a45565b610e1c6060830184610dd1565b95945050505050565b6000610e30826109b0565b9150610e3b836109b0565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610e7057610e6f610c15565b5b828201905092915050565b6000819050919050565b6000610ea0610e9b610e9684610e7b565b610da5565b6109b0565b9050919050565b610eb081610e85565b82525050565b6000604082019050610ecb6000830185610a45565b610ed86020830184610ea7565b939250505056fea26469706673582212209a808df24352fa87b87c57a60b7c565a6f16e1889e940a7ce6fb0771dce55ce964736f6c634300080a0033";

type YieldFundConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YieldFundConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YieldFund__factory extends ContractFactory {
  constructor(...args: YieldFundConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    lockTime: PromiseOrValue<BigNumberish>,
    assetAddress: PromiseOrValue<string>,
    poolAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YieldFund> {
    return super.deploy(
      lockTime,
      assetAddress,
      poolAddress,
      overrides || {}
    ) as Promise<YieldFund>;
  }
  override getDeployTransaction(
    lockTime: PromiseOrValue<BigNumberish>,
    assetAddress: PromiseOrValue<string>,
    poolAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      lockTime,
      assetAddress,
      poolAddress,
      overrides || {}
    );
  }
  override attach(address: string): YieldFund {
    return super.attach(address) as YieldFund;
  }
  override connect(signer: Signer): YieldFund__factory {
    return super.connect(signer) as YieldFund__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YieldFundInterface {
    return new utils.Interface(_abi) as YieldFundInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YieldFund {
    return new Contract(address, _abi, signerOrProvider) as YieldFund;
  }
}
