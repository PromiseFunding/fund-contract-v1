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
        name: "entryTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeLeft",
        type: "uint256",
      },
    ],
    name: "YieldFund__FundsStillTimeLocked",
    type: "error",
  },
  {
    inputs: [],
    name: "YieldFund__NotOwner",
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
    name: "YieldFund__WithdrawProceedsGreaterThanBalance",
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
    anonymous: false,
    inputs: [
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
    name: "ProceedsWithdrawn",
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
    inputs: [
      {
        internalType: "address",
        name: "funder",
        type: "address",
      },
    ],
    name: "getTimeLeft",
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
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "entryTime",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawProceeds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b506040516200176e3803806200176e8339818101604052810190620000379190620001af565b8260808181525050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506200020b565b600080fd5b6000819050919050565b62000124816200010f565b81146200013057600080fd5b50565b600081519050620001448162000119565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000177826200014a565b9050919050565b62000189816200016a565b81146200019557600080fd5b50565b600081519050620001a9816200017e565b92915050565b600080600060608486031215620001cb57620001ca6200010a565b5b6000620001db8682870162000133565b9350506020620001ee8682870162000198565b9250506040620002018682870162000198565b9150509250925092565b6080516115326200023c600039600081816102db015281816103d8015281816104de0152610c9301526115326000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063893d20e81161008c578063ca03d47811610066578063ca03d47814610213578063ced7428f14610231578063d9f1aed91461024f578063dba6335f1461026b576100cf565b8063893d20e8146101a8578063a6b28bea146101c6578063bb75f1e9146101f7576100cf565b8063111eb8b1146100d4578063275490f91461010457806354b05c061461012057806360d727b21461013e5780637b1837de1461016e57806385d62fee1461018a575b600080fd5b6100ee60048036038101906100e9919061102b565b610289565b6040516100fb9190611071565b60405180910390f35b61011e600480360381019061011991906110b8565b61030b565b005b61012861073c565b60405161013591906110f4565b60405180910390f35b6101586004803603810190610153919061102b565b610762565b6040516101659190611071565b60405180910390f35b6101886004803603810190610183919061110f565b6107ae565b005b610192610b8d565b60405161019f91906110f4565b60405180910390f35b6101b0610bb3565b6040516101bd91906110f4565b60405180910390f35b6101e060048036038101906101db919061102b565b610bdc565b6040516101ee92919061114f565b60405180910390f35b610211600480360381019061020c91906111b6565b610c00565b005b61021b610c8b565b6040516102289190611071565b60405180910390f35b610239610c91565b6040516102469190611071565b60405180910390f35b610269600480360381019061026491906110b8565b610cb5565b005b610273610fa4565b6040516102809190611217565b60405180910390f35b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426102d99190611261565b7f00000000000000000000000000000000000000000000000000000000000000006103049190611261565b9050919050565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001548111156103d65780600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546040517fe1af88e50000000000000000000000000000000000000000000000000000000081526004016103cd92919061114f565b60405180910390fd5b7f0000000000000000000000000000000000000000000000000000000000000000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426104459190611261565b101561054457600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426104dc9190611261565b7f00000000000000000000000000000000000000000000000000000000000000006105079190611261565b6040517fef49fec600000000000000000000000000000000000000000000000000000000815260040161053b92919061114f565b60405180910390fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282546105969190611261565b9250508190555080600460008282546105af9190611261565b92505081905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166369328dec600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683336040518463ffffffff1660e01b815260040161063793929190611295565b6020604051808303816000875af1158015610656573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067a91906112e1565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc322efa58c9cb2c39cfffdac61d35c8643f5cbf13c6a7d0034de2cf18923aff3846040516107319190611071565b60405180910390a450565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050919050565b60008114156107e9576040517f487deefe00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8330846040518463ffffffff1660e01b81526004016108489392919061130e565b6020604051808303816000875af1158015610867573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061088b919061137d565b506108da600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610c00565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663617ba037600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16833060006040518563ffffffff1660e01b815260040161095e94939291906113fd565b600060405180830381600087803b15801561097857600080fd5b505af115801561098c573d6000803e3d6000fd5b505050506000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541415610a235742600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505b80600454610a319190611442565b60048190555080600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154610a859190611442565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17a760e00745bb3dd2a80fdce494e6d046d397799ef94def8cc71e2665c6c5fd84604051610b819190611071565b60405180910390a45050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60036020528060005260406000206000915090508060000154908060010154905082565b8173ffffffffffffffffffffffffffffffffffffffff1663095ea7b382670de0b6b3a76400006040518363ffffffff1660e01b8152600401610c439291906114d3565b6020604051808303816000875af1158015610c62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c86919061137d565b505050565b60045481565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d3a576040517f49e73f7e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610d9791906110f4565b602060405180830381865afa158015610db4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd891906112e1565b9050600060045482610dea9190611261565b905080831115610e335782816040517f8525200f000000000000000000000000000000000000000000000000000000008152600401610e2a92919061114f565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166369328dec600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685336040518463ffffffff1660e01b8152600401610eb493929190611295565b6020604051808303816000875af1158015610ed3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ef791906112e1565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3eab9245288923bdc2f009594c02746febfdd320faf123e203eeb67223aa122285604051610f979190611071565b60405180910390a3505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ff882610fcd565b9050919050565b61100881610fed565b811461101357600080fd5b50565b60008135905061102581610fff565b92915050565b60006020828403121561104157611040610fc8565b5b600061104f84828501611016565b91505092915050565b6000819050919050565b61106b81611058565b82525050565b60006020820190506110866000830184611062565b92915050565b61109581611058565b81146110a057600080fd5b50565b6000813590506110b28161108c565b92915050565b6000602082840312156110ce576110cd610fc8565b5b60006110dc848285016110a3565b91505092915050565b6110ee81610fed565b82525050565b600060208201905061110960008301846110e5565b92915050565b6000806040838503121561112657611125610fc8565b5b600061113485828601611016565b9250506020611145858286016110a3565b9150509250929050565b60006040820190506111646000830185611062565b6111716020830184611062565b9392505050565b600061118382610fed565b9050919050565b61119381611178565b811461119e57600080fd5b50565b6000813590506111b08161118a565b92915050565b600080604083850312156111cd576111cc610fc8565b5b60006111db858286016111a1565b92505060206111ec85828601611016565b9150509250929050565b600061120182610fcd565b9050919050565b611211816111f6565b82525050565b600060208201905061122c6000830184611208565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061126c82611058565b915061127783611058565b92508282101561128a57611289611232565b5b828203905092915050565b60006060820190506112aa60008301866110e5565b6112b76020830185611062565b6112c460408301846110e5565b949350505050565b6000815190506112db8161108c565b92915050565b6000602082840312156112f7576112f6610fc8565b5b6000611305848285016112cc565b91505092915050565b600060608201905061132360008301866110e5565b61133060208301856110e5565b61133d6040830184611062565b949350505050565b60008115159050919050565b61135a81611345565b811461136557600080fd5b50565b60008151905061137781611351565b92915050565b60006020828403121561139357611392610fc8565b5b60006113a184828501611368565b91505092915050565b6000819050919050565b600061ffff82169050919050565b6000819050919050565b60006113e76113e26113dd846113aa565b6113c2565b6113b4565b9050919050565b6113f7816113cc565b82525050565b600060808201905061141260008301876110e5565b61141f6020830186611062565b61142c60408301856110e5565b61143960608301846113ee565b95945050505050565b600061144d82611058565b915061145883611058565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561148d5761148c611232565b5b828201905092915050565b6000819050919050565b60006114bd6114b86114b384611498565b6113c2565b611058565b9050919050565b6114cd816114a2565b82525050565b60006040820190506114e860008301856110e5565b6114f560208301846114c4565b939250505056fea26469706673582212201171e08c6701601345e2c745b83e5e63841f58315d9cd8022d261997207579db64736f6c634300080a0033";

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
