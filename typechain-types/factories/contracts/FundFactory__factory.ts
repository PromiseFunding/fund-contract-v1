/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  FundFactory,
  FundFactoryInterface,
} from "../../contracts/FundFactory";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        indexed: true,
        internalType: "address",
        name: "fundAddress",
        type: "address",
      },
    ],
    name: "Created",
    type: "event",
  },
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
        name: "aaveTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
    ],
    name: "createYieldFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getYieldFund",
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
    name: "i_owner",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "s_funds",
    outputs: [
      {
        internalType: "contract YieldFund",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611fe9806100606000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80633963f120146100515780636748c53b1461006d57806394c1badb1461009d578063dba6335f146100cd575b600080fd5b61006b60048036038101906100669190610355565b6100eb565b005b610087600480360381019061008291906103bc565b610204565b60405161009491906103f8565b60405180910390f35b6100b760048036038101906100b291906103bc565b61024c565b6040516100c49190610472565b60405180910390f35b6100d561028b565b6040516100e291906103f8565b60405180910390f35b6000848484846040516100fd906102af565b61010a949392919061049c565b604051809103906000f080158015610126573d6000803e3d6000fd5b5090506001819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f454b0172f64812df0cd504c2bd7df7aab8ff328a54d946b4bd0fa7c527adf9cc60405160405180910390a45050505050565b60006001828154811061021a576102196104e1565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6001818154811061025c57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611aa38061051183390190565b600080fd5b6000819050919050565b6102d4816102c1565b81146102df57600080fd5b50565b6000813590506102f1816102cb565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610322826102f7565b9050919050565b61033281610317565b811461033d57600080fd5b50565b60008135905061034f81610329565b92915050565b6000806000806080858703121561036f5761036e6102bc565b5b600061037d878288016102e2565b945050602061038e87828801610340565b935050604061039f87828801610340565b92505060606103b087828801610340565b91505092959194509250565b6000602082840312156103d2576103d16102bc565b5b60006103e0848285016102e2565b91505092915050565b6103f281610317565b82525050565b600060208201905061040d60008301846103e9565b92915050565b6000819050919050565b600061043861043361042e846102f7565b610413565b6102f7565b9050919050565b600061044a8261041d565b9050919050565b600061045c8261043f565b9050919050565b61046c81610451565b82525050565b60006020820190506104876000830184610463565b92915050565b610496816102c1565b82525050565b60006080820190506104b1600083018761048d565b6104be60208301866103e9565b6104cb60408301856103e9565b6104d860608301846103e9565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfe60a06040523480156200001157600080fd5b5060405162001aa338038062001aa38339818101604052810190620000379190620001f9565b8360808181525050326000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600581905550505050506200026b565b600080fd5b6000819050919050565b6200016e8162000159565b81146200017a57600080fd5b50565b6000815190506200018e8162000163565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001c18262000194565b9050919050565b620001d381620001b4565b8114620001df57600080fd5b50565b600081519050620001f381620001c8565b92915050565b6000806000806080858703121562000216576200021562000154565b5b600062000226878288016200017d565b94505060206200023987828801620001e2565b93505060406200024c87828801620001e2565b92505060606200025f87828801620001e2565b91505092959194509250565b6080516117f9620002aa600039600081816103e10152818161045e01528181610493015281816105840152818161068a0152610f9801526117f96000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c806385d62fee116100ad578063ca1d209d11610071578063ca1d209d146102fd578063ced7428f14610319578063d9f1aed914610337578063dba6335f14610353578063f586c6d91461037157610121565b806385d62fee1461025457806387ceff0914610272578063893d20e814610290578063a6b28bea146102ae578063ca03d478146102df57610121565b80633e5aa85b116100f45780633e5aa85b146101ae57806354b05c06146101cc57806360d727b2146101ea578063670ab5e91461021a578063825808051461023857610121565b8063111eb8b114610126578063119a5e9614610156578063275490f91461017457806333f7326114610190575b600080fd5b610140600480360381019061013b919061135a565b61038f565b60405161014d91906113a0565b60405180910390f35b61015e61048f565b60405161016b91906113a0565b60405180910390f35b61018e600480360381019061018991906113e7565b6104b7565b005b6101986108e8565b6040516101a59190611423565b60405180910390f35b6101b661090e565b6040516101c391906113a0565b60405180910390f35b6101d46109c3565b6040516101e19190611423565b60405180910390f35b61020460048036038101906101ff919061135a565b6109e9565b60405161021191906113a0565b60405180910390f35b610222610a88565b60405161022f9190611423565b60405180910390f35b610252600480360381019061024d919061147c565b610ab2565b005b61025c610b36565b6040516102699190611423565b60405180910390f35b61027a610b5c565b60405161028791906113a0565b60405180910390f35b610298610b64565b6040516102a59190611423565b60405180910390f35b6102c860048036038101906102c3919061135a565b610b8d565b6040516102d69291906114cf565b60405180910390f35b6102e7610bb1565b6040516102f491906113a0565b60405180910390f35b610317600480360381019061031291906113e7565b610bb7565b005b610321610f96565b60405161032e91906113a0565b60405180910390f35b610351600480360381019061034c91906113e7565b610fba565b005b61035b6112a9565b6040516103689190611519565b60405180910390f35b6103796112cd565b6040516103869190611423565b60405180910390f35b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426103df9190611563565b7f00000000000000000000000000000000000000000000000000000000000000001161040e576000905061048a565b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101544261045c9190611563565b7f00000000000000000000000000000000000000000000000000000000000000006104879190611563565b90505b919050565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001548111156105825780600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546040517fe1af88e50000000000000000000000000000000000000000000000000000000081526004016105799291906114cf565b60405180910390fd5b7f0000000000000000000000000000000000000000000000000000000000000000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426105f19190611563565b10156106f057600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426106889190611563565b7f00000000000000000000000000000000000000000000000000000000000000006106b39190611563565b6040517fef49fec60000000000000000000000000000000000000000000000000000000081526004016106e79291906114cf565b60405180910390fd5b80600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282546107429190611563565b92505081905550806005600082825461075b9190611563565b92505081905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166369328dec600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683336040518463ffffffff1660e01b81526004016107e393929190611597565b6020604051808303816000875af1158015610802573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082691906115e3565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc322efa58c9cb2c39cfffdac61d35c8643f5cbf13c6a7d0034de2cf18923aff3846040516108dd91906113a0565b60405180910390a450565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161096c9190611423565b602060405180830381865afa158015610989573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ad91906115e3565b9050600554816109bd9190611563565b91505090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414610a7e57600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050610a83565b600090505b919050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b8273ffffffffffffffffffffffffffffffffffffffff1663095ea7b383836040518363ffffffff1660e01b8152600401610aed929190611610565b6020604051808303816000875af1158015610b0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b309190611671565b50505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600042905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60046020528060005260406000206000915090508060000154908060010154905082565b60055481565b6000811415610bf2576040517f487deefe00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610c519392919061169e565b6020604051808303816000875af1158015610c70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c949190611671565b50610ce4600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683610ab2565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663617ba037600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16833060006040518563ffffffff1660e01b8152600401610d689493929190611728565b600060405180830381600087803b158015610d8257600080fd5b505af1158015610d96573d6000803e3d6000fd5b505050506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541415610e2d5742600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505b80600554610e3b919061176d565b60058190555080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154610e8f919061176d565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17a760e00745bb3dd2a80fdce494e6d046d397799ef94def8cc71e2665c6c5fd84604051610f8b91906113a0565b60405180910390a450565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461103f576040517f49e73f7e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161109c9190611423565b602060405180830381865afa1580156110b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110dd91906115e3565b90506000600554826110ef9190611563565b9050808311156111385782816040517f8525200f00000000000000000000000000000000000000000000000000000000815260040161112f9291906114cf565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166369328dec600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685336040518463ffffffff1660e01b81526004016111b993929190611597565b6020604051808303816000875af11580156111d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111fc91906115e3565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3eab9245288923bdc2f009594c02746febfdd320faf123e203eeb67223aa12228560405161129c91906113a0565b60405180910390a3505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611327826112fc565b9050919050565b6113378161131c565b811461134257600080fd5b50565b6000813590506113548161132e565b92915050565b6000602082840312156113705761136f6112f7565b5b600061137e84828501611345565b91505092915050565b6000819050919050565b61139a81611387565b82525050565b60006020820190506113b56000830184611391565b92915050565b6113c481611387565b81146113cf57600080fd5b50565b6000813590506113e1816113bb565b92915050565b6000602082840312156113fd576113fc6112f7565b5b600061140b848285016113d2565b91505092915050565b61141d8161131c565b82525050565b60006020820190506114386000830184611414565b92915050565b60006114498261131c565b9050919050565b6114598161143e565b811461146457600080fd5b50565b60008135905061147681611450565b92915050565b600080600060608486031215611495576114946112f7565b5b60006114a386828701611467565b93505060206114b486828701611345565b92505060406114c5868287016113d2565b9150509250925092565b60006040820190506114e46000830185611391565b6114f16020830184611391565b9392505050565b6000611503826112fc565b9050919050565b611513816114f8565b82525050565b600060208201905061152e600083018461150a565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061156e82611387565b915061157983611387565b92508282101561158c5761158b611534565b5b828203905092915050565b60006060820190506115ac6000830186611414565b6115b96020830185611391565b6115c66040830184611414565b949350505050565b6000815190506115dd816113bb565b92915050565b6000602082840312156115f9576115f86112f7565b5b6000611607848285016115ce565b91505092915050565b60006040820190506116256000830185611414565b6116326020830184611391565b9392505050565b60008115159050919050565b61164e81611639565b811461165957600080fd5b50565b60008151905061166b81611645565b92915050565b600060208284031215611687576116866112f7565b5b60006116958482850161165c565b91505092915050565b60006060820190506116b36000830186611414565b6116c06020830185611414565b6116cd6040830184611391565b949350505050565b6000819050919050565b600061ffff82169050919050565b6000819050919050565b600061171261170d611708846116d5565b6116ed565b6116df565b9050919050565b611722816116f7565b82525050565b600060808201905061173d6000830187611414565b61174a6020830186611391565b6117576040830185611414565b6117646060830184611719565b95945050505050565b600061177882611387565b915061178383611387565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156117b8576117b7611534565b5b82820190509291505056fea2646970667358221220468f675a44d167355efc8cbf54baad697d06e630bc6e9398fd5e0a5ea3f83c7264736f6c634300080a0033a2646970667358221220d5ceb6c15ed105e80b20bb455349116906b343d4fbdc216bc70eb38702a5476564736f6c634300080a0033";

type FundFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FundFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FundFactory__factory extends ContractFactory {
  constructor(...args: FundFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FundFactory> {
    return super.deploy(overrides || {}) as Promise<FundFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FundFactory {
    return super.attach(address) as FundFactory;
  }
  override connect(signer: Signer): FundFactory__factory {
    return super.connect(signer) as FundFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FundFactoryInterface {
    return new utils.Interface(_abi) as FundFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FundFactory {
    return new Contract(address, _abi, signerOrProvider) as FundFactory;
  }
}
