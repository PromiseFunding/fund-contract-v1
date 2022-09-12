/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../common";
import type {
  PoolLogic,
  PoolLogicInterface,
} from "../../../../../../../@aave/core-v3/contracts/protocol/libraries/logic/PoolLogic";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalDebt",
        type: "uint256",
      },
    ],
    name: "IsolationModeTotalDebtUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "reserve",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountMinted",
        type: "uint256",
      },
    ],
    name: "MintedToTreasury",
    type: "event",
  },
];

const _bytecode =
  "0x612180610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100615760003560e01c80631e3b41451461006657806348c2ca8c1461008f57806369fc1bdf146100b857806387b322b2146100f55780639cf570231461011e575b600080fd5b81801561007257600080fd5b5061008d6004803603810190610088919061190d565b610147565b005b81801561009b57600080fd5b506100b660048036038101906100b191906119b2565b6102ec565b005b8180156100c457600080fd5b506100df60048036038101906100da9190611bc7565b610532565b6040516100ec9190611c36565b60405180910390f35b81801561010157600080fd5b5061011c60048036038101906101179190611c87565b610a1b565b005b81801561012a57600080fd5b5061014560048036038101906101409190611cda565b610a4b565b005b60006101a78360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001604051806020016040529081600082015481525050610d74565b146040518060400160405280600281526020017f38310000000000000000000000000000000000000000000000000000000000008152509061021f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102169190611db5565b60405180910390fd5b5060008260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060090160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff167faef84d3b40895fd58c561f3998000f0583abb992a52fbdc99ace8e8de4d676a560006040516102e09190611e1c565b60405180910390a25050565b60005b8282905081101561052c57600083838381811061030f5761030e611e37565b5b90506020020160208101906103249190611e66565b905060008560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905061038981600001604051806020016040529081600082015481525050610da9565b610394575050610519565b60008160080160009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff169050600081146105155760008260080160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550600061041a83610ddd565b905060006104318284610ecb90919063ffffffff16565b90508360040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637df5bd3b82846040518363ffffffff1660e01b8152600401610492929190611ea2565b600060405180830381600087803b1580156104ac57600080fd5b505af11580156104c0573d6000803e3d6000fd5b505050508473ffffffffffffffffffffffffffffffffffffffff167fbfa21aa5d5f9a1f0120a95e7c0749f389863cbdbfff531aa7339077a5bc919de8260405161050a9190611ecb565b60405180910390a250505b5050505b808061052490611f15565b9150506102ef565b50505050565b60006105418260000151610f16565b6040518060400160405280600181526020017f3900000000000000000000000000000000000000000000000000000000000000815250906105b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105af9190611db5565b60405180910390fd5b506106238260200151836040015184606001518560800151886000886000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020610f6190949392919063ffffffff16565b600080856000856000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160159054906101000a900461ffff1661ffff161415806106ec5750826000015173ffffffffffffffffffffffffffffffffffffffff1684600080815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b905080156040518060400160405280600281526020017f313400000000000000000000000000000000000000000000000000000000000081525090610767576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075e9190611db5565b60405180910390fd5b5060005b8360a0015161ffff168161ffff1610156108c157600073ffffffffffffffffffffffffffffffffffffffff168560008361ffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156108ae5780866000866000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160156101000a81548161ffff021916908361ffff16021790555083600001518560008361ffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600092505050610a14565b80806108b990611f5e565b91505061076b565b508260c0015161ffff168360a0015161ffff16106040518060400160405280600281526020017f31350000000000000000000000000000000000000000000000000000000000008152509061094c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109439190611db5565b60405180910390fd5b508260a00151856000856000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160156101000a81548161ffff021916908361ffff16021790555082600001518460008560a0015161ffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019150505b9392505050565b610a4682828573ffffffffffffffffffffffffffffffffffffffff166111ce9092919063ffffffff16565b505050565b60008360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050610a9883828461126a565b60008360008660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160159054906101000a900461ffff1661ffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160008082016000905550506001820160006101000a8154906fffffffffffffffffffffffffffffffff02191690556001820160106101000a8154906fffffffffffffffffffffffffffffffff02191690556002820160006101000a8154906fffffffffffffffffffffffffffffffff02191690556002820160106101000a8154906fffffffffffffffffffffffffffffffff02191690556003820160006101000a8154906fffffffffffffffffffffffffffffffff02191690556003820160106101000a81549064ffffffffff02191690556003820160156101000a81549061ffff02191690556004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556006820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556007820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556008820160006101000a8154906fffffffffffffffffffffffffffffffff02191690556008820160106101000a8154906fffffffffffffffffffffffffffffffff02191690556009820160006101000a8154906fffffffffffffffffffffffffffffffff0219169055505050505050565b600060d47ff0000000000fffffffffffffffffffffffffffffffffffffffffffffffffffff19836000015116901c9050919050565b6000807ffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffff1983600001511614159050919050565b6000808260030160109054906101000a900464ffffffffff169050428164ffffffffff161415610e42578260010160009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16915050610ec6565b610ec28360010160009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16610eb48560010160109054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff168461173d565b610ecb90919063ffffffff16565b9150505b919050565b6000816b019d971e4fe8401e740000006000190304831115821517610eef57600080fd5b6b033b2e3c9fd0803ce80000006b019d971e4fe8401e740000008385020104905092915050565b60008060007fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47060001b9050833f9150808214158015610f5857506000801b8214155b92505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168560040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146040518060400160405280600281526020017f36310000000000000000000000000000000000000000000000000000000000008152509061102c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110239190611db5565b60405180910390fd5b506b033b2e3c9fd0803ce80000008560010160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055506b033b2e3c9fd0803ce80000008560020160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550838560040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828560050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818560060160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808560070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050565b600063a9059cbb60e01b905060405181815273ffffffffffffffffffffffffffffffffffffffff841660048201528260248201526000806044836000895af161121b573d6000803e3d6000fd5b5061122584611798565b611264576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161125b90611fd5565b60405180910390fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600281526020017f373700000000000000000000000000000000000000000000000000000000000081525090611312576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113099190611db5565b60405180910390fd5b5060008260030160159054906101000a900461ffff1661ffff1614158061139657508073ffffffffffffffffffffffffffffffffffffffff1683600080815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b6040518060400160405280600281526020017f38320000000000000000000000000000000000000000000000000000000000008152509061140d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114049190611db5565b60405180910390fd5b5060008260050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561147f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114a3919061200a565b146040518060400160405280600281526020017f35350000000000000000000000000000000000000000000000000000000000008152509061151b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115129190611db5565b60405180910390fd5b5060008260060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561158d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115b1919061200a565b146040518060400160405280600281526020017f353600000000000000000000000000000000000000000000000000000000000081525090611629576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116209190611db5565b60405180910390fd5b5060008260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561169b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116bf919061200a565b146040518060400160405280600281526020017f353400000000000000000000000000000000000000000000000000000000000081525090611737576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161172e9190611db5565b60405180910390fd5b50505050565b6000808264ffffffffff16426117539190612037565b8461175e919061206b565b90506301e133808181611774576117736120c5565b5b049050806b033b2e3c9fd0803ce800000061178f91906120f4565b91505092915050565b60006117d6565b7f08c379a0000000000000000000000000000000000000000000000000000000006000526020600452806024528160445260646000fd5b3d600081146118175760208114611852576118127f475076323a206d616c666f726d6564207472616e7366657220726573756c7400601f61179f565b61185f565b823b611849576118487f475076323a206e6f74206120636f6e7472616374000000000000000000000000601461179f565b5b6001915061185f565b3d6000803e600051151591505b50919050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61188c81611879565b811461189757600080fd5b50565b6000813590506118a981611883565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006118da826118af565b9050919050565b6118ea816118cf565b81146118f557600080fd5b50565b600081359050611907816118e1565b92915050565b600080604083850312156119245761192361186f565b5b60006119328582860161189a565b9250506020611943858286016118f8565b9150509250929050565b600080fd5b600080fd5b600080fd5b60008083601f8401126119725761197161194d565b5b8235905067ffffffffffffffff81111561198f5761198e611952565b5b6020830191508360208202830111156119ab576119aa611957565b5b9250929050565b6000806000604084860312156119cb576119ca61186f565b5b60006119d98682870161189a565b935050602084013567ffffffffffffffff8111156119fa576119f9611874565b5b611a068682870161195c565b92509250509250925092565b6000819050919050565b611a2581611a12565b8114611a3057600080fd5b50565b600081359050611a4281611a1c565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611a9682611a4d565b810181811067ffffffffffffffff82111715611ab557611ab4611a5e565b5b80604052505050565b6000611ac8611865565b9050611ad48282611a8d565b919050565b600061ffff82169050919050565b611af081611ad9565b8114611afb57600080fd5b50565b600081359050611b0d81611ae7565b92915050565b600060e08284031215611b2957611b28611a48565b5b611b3360e0611abe565b90506000611b43848285016118f8565b6000830152506020611b57848285016118f8565b6020830152506040611b6b848285016118f8565b6040830152506060611b7f848285016118f8565b6060830152506080611b93848285016118f8565b60808301525060a0611ba784828501611afe565b60a08301525060c0611bbb84828501611afe565b60c08301525092915050565b60008060006101208486031215611be157611be061186f565b5b6000611bef8682870161189a565b9350506020611c0086828701611a33565b9250506040611c1186828701611b13565b9150509250925092565b60008115159050919050565b611c3081611c1b565b82525050565b6000602082019050611c4b6000830184611c27565b92915050565b6000819050919050565b611c6481611c51565b8114611c6f57600080fd5b50565b600081359050611c8181611c5b565b92915050565b600080600060608486031215611ca057611c9f61186f565b5b6000611cae868287016118f8565b9350506020611cbf868287016118f8565b9250506040611cd086828701611c72565b9150509250925092565b600080600060608486031215611cf357611cf261186f565b5b6000611d018682870161189a565b9350506020611d1286828701611a33565b9250506040611d23868287016118f8565b9150509250925092565b600081519050919050565b600082825260208201905092915050565b60005b83811015611d67578082015181840152602081019050611d4c565b83811115611d76576000848401525b50505050565b6000611d8782611d2d565b611d918185611d38565b9350611da1818560208601611d49565b611daa81611a4d565b840191505092915050565b60006020820190508181036000830152611dcf8184611d7c565b905092915050565b6000819050919050565b6000819050919050565b6000611e06611e01611dfc84611dd7565b611de1565b611c51565b9050919050565b611e1681611deb565b82525050565b6000602082019050611e316000830184611e0d565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215611e7c57611e7b61186f565b5b6000611e8a848285016118f8565b91505092915050565b611e9c81611c51565b82525050565b6000604082019050611eb76000830185611e93565b611ec46020830184611e93565b9392505050565b6000602082019050611ee06000830184611e93565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611f2082611c51565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611f5357611f52611ee6565b5b600182019050919050565b6000611f6982611ad9565b915061ffff821415611f7e57611f7d611ee6565b5b600182019050919050565b7f475076323a206661696c6564207472616e736665720000000000000000000000600082015250565b6000611fbf601583611d38565b9150611fca82611f89565b602082019050919050565b60006020820190508181036000830152611fee81611fb2565b9050919050565b60008151905061200481611c5b565b92915050565b6000602082840312156120205761201f61186f565b5b600061202e84828501611ff5565b91505092915050565b600061204282611c51565b915061204d83611c51565b9250828210156120605761205f611ee6565b5b828203905092915050565b600061207682611c51565b915061208183611c51565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156120ba576120b9611ee6565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006120ff82611c51565b915061210a83611c51565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561213f5761213e611ee6565b5b82820190509291505056fea26469706673582212200758a49fef42c6739ef35628e68aa6fba2263801dfcc7e6e770c905bcdad750564736f6c634300080a0033";

type PoolLogicConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PoolLogicConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PoolLogic__factory extends ContractFactory {
  constructor(...args: PoolLogicConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PoolLogic> {
    return super.deploy(overrides || {}) as Promise<PoolLogic>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PoolLogic {
    return super.attach(address) as PoolLogic;
  }
  override connect(signer: Signer): PoolLogic__factory {
    return super.connect(signer) as PoolLogic__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PoolLogicInterface {
    return new utils.Interface(_abi) as PoolLogicInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PoolLogic {
    return new Contract(address, _abi, signerOrProvider) as PoolLogic;
  }
}
