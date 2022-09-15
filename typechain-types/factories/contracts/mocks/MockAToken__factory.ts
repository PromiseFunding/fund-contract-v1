/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MockAToken,
  MockATokenInterface,
} from "../../../contracts/mocks/MockAToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "MockAToken__NotOwner",
    type: "error",
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001d0738038062001d0783398181016040528101906200003791906200043d565b6040518060400160405280601281526020017f4161766520457468657265756d205553445400000000000000000000000000008152506040518060400160405280600881526020017f61457468555344540000000000000000000000000000000000000000000000008152508160039080519060200190620000bb92919062000323565b508060049080519060200190620000d492919062000323565b50505080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000137816c01431e0fae6d7217caa0000000620001a060201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff16636ce164f86040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156200018057600080fd5b505af115801562000195573d6000803e3d6000fd5b50505050506200061b565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000213576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200020a90620004d0565b60405180910390fd5b62000227600083836200031960201b60201c565b80600260008282546200023b91906200052b565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200029291906200052b565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620002f9919062000599565b60405180910390a362000315600083836200031e60201b60201c565b5050565b505050565b505050565b8280546200033190620005e5565b90600052602060002090601f016020900481019282620003555760008555620003a1565b82601f106200037057805160ff1916838001178555620003a1565b82800160010185558215620003a1579182015b82811115620003a057825182559160200191906001019062000383565b5b509050620003b09190620003b4565b5090565b5b80821115620003cf576000816000905550600101620003b5565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200040582620003d8565b9050919050565b6200041781620003f8565b81146200042357600080fd5b50565b60008151905062000437816200040c565b92915050565b600060208284031215620004565762000455620003d3565b5b6000620004668482850162000426565b91505092915050565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000620004b8601f836200046f565b9150620004c58262000480565b602082019050919050565b60006020820190508181036000830152620004eb81620004a9565b9050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200053882620004f2565b91506200054583620004f2565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156200057d576200057c620004fc565b5b828201905092915050565b6200059381620004f2565b82525050565b6000602082019050620005b0600083018462000588565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620005fe57607f821691505b60208210811415620006155762000614620005b6565b5b50919050565b6116dc806200062b6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063395093511161008c578063a457c2d711610066578063a457c2d714610228578063a9059cbb14610258578063dba6335f14610288578063dd62ed3e146102a6576100cf565b806339509351146101aa57806370a08231146101da57806395d89b411461020a576100cf565b806306fdde03146100d4578063095ea7b3146100f25780630d1118ce1461012257806318160ddd1461013e57806323b872dd1461015c578063313ce5671461018c575b600080fd5b6100dc6102d6565b6040516100e99190610e14565b60405180910390f35b61010c60048036038101906101079190610ecf565b610368565b6040516101199190610f2a565b60405180910390f35b61013c60048036038101906101379190610ecf565b61038b565b005b610146610420565b6040516101539190610f54565b60405180910390f35b61017660048036038101906101719190610f6f565b61042a565b6040516101839190610f2a565b60405180910390f35b610194610459565b6040516101a19190610fde565b60405180910390f35b6101c460048036038101906101bf9190610ecf565b610462565b6040516101d19190610f2a565b60405180910390f35b6101f460048036038101906101ef9190610ff9565b610499565b6040516102019190610f54565b60405180910390f35b6102126104e1565b60405161021f9190610e14565b60405180910390f35b610242600480360381019061023d9190610ecf565b610573565b60405161024f9190610f2a565b60405180910390f35b610272600480360381019061026d9190610ecf565b6105ea565b60405161027f9190610f2a565b60405180910390f35b61029061060d565b60405161029d9190611035565b60405180910390f35b6102c060048036038101906102bb9190611050565b610633565b6040516102cd9190610f54565b60405180910390f35b6060600380546102e5906110bf565b80601f0160208091040260200160405190810160405280929190818152602001828054610311906110bf565b801561035e5780601f106103335761010080835404028352916020019161035e565b820191906000526020600020905b81548152906001019060200180831161034157829003601f168201915b5050505050905090565b6000806103736106ba565b90506103808185856106c2565b600191505092915050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610412576040517fe315fdfc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61041c828261088d565b5050565b6000600254905090565b6000806104356106ba565b9050610442858285610a64565b61044d858585610af0565b60019150509392505050565b60006012905090565b60008061046d6106ba565b905061048e81858561047f8589610633565b6104899190611120565b6106c2565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600480546104f0906110bf565b80601f016020809104026020016040519081016040528092919081815260200182805461051c906110bf565b80156105695780601f1061053e57610100808354040283529160200191610569565b820191906000526020600020905b81548152906001019060200180831161054c57829003601f168201915b5050505050905090565b60008061057e6106ba565b9050600061058c8286610633565b9050838110156105d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c8906111e8565b60405180910390fd5b6105de82868684036106c2565b60019250505092915050565b6000806105f56106ba565b9050610602818585610af0565b600191505092915050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610732576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107299061127a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156107a2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107999061130c565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516108809190610f54565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f49061139e565b60405180910390fd5b61090982600083610d71565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561098f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098690611430565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282546109e69190611450565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610a4b9190610f54565b60405180910390a3610a5f83600084610d76565b505050565b6000610a708484610633565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610aea5781811015610adc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ad3906114d0565b60405180910390fd5b610ae984848484036106c2565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5790611562565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610bd0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc7906115f4565b60405180910390fd5b610bdb838383610d71565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c61576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5890611686565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610cf49190611120565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610d589190610f54565b60405180910390a3610d6b848484610d76565b50505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610db5578082015181840152602081019050610d9a565b83811115610dc4576000848401525b50505050565b6000601f19601f8301169050919050565b6000610de682610d7b565b610df08185610d86565b9350610e00818560208601610d97565b610e0981610dca565b840191505092915050565b60006020820190508181036000830152610e2e8184610ddb565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e6682610e3b565b9050919050565b610e7681610e5b565b8114610e8157600080fd5b50565b600081359050610e9381610e6d565b92915050565b6000819050919050565b610eac81610e99565b8114610eb757600080fd5b50565b600081359050610ec981610ea3565b92915050565b60008060408385031215610ee657610ee5610e36565b5b6000610ef485828601610e84565b9250506020610f0585828601610eba565b9150509250929050565b60008115159050919050565b610f2481610f0f565b82525050565b6000602082019050610f3f6000830184610f1b565b92915050565b610f4e81610e99565b82525050565b6000602082019050610f696000830184610f45565b92915050565b600080600060608486031215610f8857610f87610e36565b5b6000610f9686828701610e84565b9350506020610fa786828701610e84565b9250506040610fb886828701610eba565b9150509250925092565b600060ff82169050919050565b610fd881610fc2565b82525050565b6000602082019050610ff36000830184610fcf565b92915050565b60006020828403121561100f5761100e610e36565b5b600061101d84828501610e84565b91505092915050565b61102f81610e5b565b82525050565b600060208201905061104a6000830184611026565b92915050565b6000806040838503121561106757611066610e36565b5b600061107585828601610e84565b925050602061108685828601610e84565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806110d757607f821691505b602082108114156110eb576110ea611090565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061112b82610e99565b915061113683610e99565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561116b5761116a6110f1565b5b828201905092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006111d2602583610d86565b91506111dd82611176565b604082019050919050565b60006020820190508181036000830152611201816111c5565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611264602483610d86565b915061126f82611208565b604082019050919050565b6000602082019050818103600083015261129381611257565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b60006112f6602283610d86565b91506113018261129a565b604082019050919050565b60006020820190508181036000830152611325816112e9565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000611388602183610d86565b91506113938261132c565b604082019050919050565b600060208201905081810360008301526113b78161137b565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b600061141a602283610d86565b9150611425826113be565b604082019050919050565b600060208201905081810360008301526114498161140d565b9050919050565b600061145b82610e99565b915061146683610e99565b925082821015611479576114786110f1565b5b828203905092915050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b60006114ba601d83610d86565b91506114c582611484565b602082019050919050565b600060208201905081810360008301526114e9816114ad565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b600061154c602583610d86565b9150611557826114f0565b604082019050919050565b6000602082019050818103600083015261157b8161153f565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006115de602383610d86565b91506115e982611582565b604082019050919050565b6000602082019050818103600083015261160d816115d1565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611670602683610d86565b915061167b82611614565b604082019050919050565b6000602082019050818103600083015261169f81611663565b905091905056fea2646970667358221220884974d13252533fdb3ac667116b24a764e50954cc7b2c885c81dafdbba6b33364736f6c634300080a0033";

type MockATokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockATokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockAToken__factory extends ContractFactory {
  constructor(...args: MockATokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    contractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockAToken> {
    return super.deploy(
      contractAddress,
      overrides || {}
    ) as Promise<MockAToken>;
  }
  override getDeployTransaction(
    contractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(contractAddress, overrides || {});
  }
  override attach(address: string): MockAToken {
    return super.attach(address) as MockAToken;
  }
  override connect(signer: Signer): MockAToken__factory {
    return super.connect(signer) as MockAToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockATokenInterface {
    return new utils.Interface(_abi) as MockATokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockAToken {
    return new Contract(address, _abi, signerOrProvider) as MockAToken;
  }
}