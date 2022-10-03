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
import type {
  YieldFundAAVE,
  YieldFundAAVEInterface,
} from "../../contracts/YieldFundAAVE";

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
        name: "aaveTokenAddress",
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
    name: "YieldFundAAVE__FundAmountMustBeAboveZero",
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
    name: "YieldFundAAVE__FundsStillTimeLocked",
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
    name: "YieldFundAAVE__WithdrawFundsGreaterThanBalance",
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
    name: "YieldFundAAVE__WithdrawProceedsGreaterThanBalance",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approveTransfer",
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
    name: "fund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAssetAddress",
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
    name: "getBlockTime",
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
    name: "getPoolAddress",
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
    name: "getTimeLock",
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
    name: "getWithdrawableProceeds",
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
    name: "i_aaveTokenAddress",
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
    inputs: [],
    name: "owner",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
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
  "0x60a06040523480156200001157600080fd5b506040516200213a3803806200213a83398181016040528101906200003791906200046a565b620000576200004b620001a860201b60201c565b620001b060201b60201c565b836080818152505032600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000d3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166200027460201b60201c565b82600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060068190555050505050620005f7565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b620002846200030b60201b60201c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415620002f7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002ee9062000563565b60405180910390fd5b6200030881620001b060201b60201c565b50565b6200031b620001a860201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16620003416200039c60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16146200039a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200039190620005d5565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080fd5b6000819050919050565b620003df81620003ca565b8114620003eb57600080fd5b50565b600081519050620003ff81620003d4565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620004328262000405565b9050919050565b620004448162000425565b81146200045057600080fd5b50565b600081519050620004648162000439565b92915050565b60008060008060808587031215620004875762000486620003c5565b5b60006200049787828801620003ee565b9450506020620004aa8782880162000453565b9350506040620004bd8782880162000453565b9250506060620004d08782880162000453565b91505092959194509250565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006200054b602683620004dc565b91506200055882620004ed565b604082019050919050565b600060208201905081810360008301526200057e816200053c565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000620005bd602083620004dc565b9150620005ca8262000585565b602082019050919050565b60006020820190508181036000830152620005f081620005ae565b9050919050565b608051611b046200063660003960008181610446015281816104c3015281816104f8015281816105e9015281816106ef015261103f0152611b046000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c806387ceff09116100b8578063ca1d209d1161007c578063ca1d209d14610346578063ced7428f14610362578063d9f1aed914610380578063dba6335f1461039c578063f2fde38b146103ba578063f586c6d9146103d657610142565b806387ceff091461029d578063893d20e8146102bb5780638da5cb5b146102d9578063a6b28bea146102f7578063ca03d4781461032857610142565b806354b05c061161010a57806354b05c06146101ed57806360d727b21461020b578063670ab5e91461023b578063715018a614610259578063825808051461026357806385d62fee1461027f57610142565b8063111eb8b114610147578063119a5e9614610177578063275490f91461019557806333f73261146101b15780633e5aa85b146101cf575b600080fd5b610161600480360381019061015c9190611556565b6103f4565b60405161016e919061159c565b60405180910390f35b61017f6104f4565b60405161018c919061159c565b60405180910390f35b6101af60048036038101906101aa91906115e3565b61051c565b005b6101b961094f565b6040516101c6919061161f565b60405180910390f35b6101d7610975565b6040516101e4919061159c565b60405180910390f35b6101f5610a2a565b604051610202919061161f565b60405180910390f35b61022560048036038101906102209190611556565b610a50565b604051610232919061159c565b60405180910390f35b610243610aef565b604051610250919061161f565b60405180910390f35b610261610b19565b005b61027d60048036038101906102789190611678565b610b2d565b005b610287610bb1565b604051610294919061161f565b60405180910390f35b6102a5610bd7565b6040516102b2919061159c565b60405180910390f35b6102c3610bdf565b6040516102d0919061161f565b60405180910390f35b6102e1610c09565b6040516102ee919061161f565b60405180910390f35b610311600480360381019061030c9190611556565b610c32565b60405161031f9291906116cb565b60405180910390f35b610330610c56565b60405161033d919061159c565b60405180910390f35b610360600480360381019061035b91906115e3565b610c5c565b005b61036a61103d565b604051610377919061159c565b60405180910390f35b61039a600480360381019061039591906115e3565b611061565b005b6103a46112d5565b6040516103b19190611715565b60405180910390f35b6103d460048036038101906103cf9190611556565b6112fb565b005b6103de61137f565b6040516103eb919061161f565b60405180910390f35b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015442610444919061175f565b7f00000000000000000000000000000000000000000000000000000000000000001161047357600090506104ef565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426104c1919061175f565b7f00000000000000000000000000000000000000000000000000000000000000006104ec919061175f565b90505b919050565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001548111156105e75780600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546040517ffee3aeca0000000000000000000000000000000000000000000000000000000081526004016105de9291906116cb565b60405180910390fd5b7f0000000000000000000000000000000000000000000000000000000000000000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015442610656919061175f565b101561075557600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426106ed919061175f565b7f0000000000000000000000000000000000000000000000000000000000000000610718919061175f565b6040517fcf13095200000000000000000000000000000000000000000000000000000000815260040161074c9291906116cb565b60405180910390fd5b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282546107a7919061175f565b9250508190555080600660008282546107c0919061175f565b92505081905550600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166369328dec600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683336040518463ffffffff1660e01b815260040161084893929190611793565b6020604051808303816000875af1158015610867573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061088b91906117df565b50600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc322efa58c9cb2c39cfffdac61d35c8643f5cbf13c6a7d0034de2cf18923aff384604051610944919061159c565b60405180910390a450565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016109d3919061161f565b602060405180830381865afa1580156109f0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1491906117df565b905060065481610a24919061175f565b91505090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414610ae557600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050610aea565b600090505b919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610b216113a9565b610b2b6000611427565b565b8273ffffffffffffffffffffffffffffffffffffffff1663095ea7b383836040518363ffffffff1660e01b8152600401610b6892919061180c565b6020604051808303816000875af1158015610b87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bab919061186d565b50505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600042905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60056020528060005260406000206000915090508060000154908060010154905082565b60065481565b6000811415610c97576040517f46575c6300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610cf69392919061189a565b6020604051808303816000875af1158015610d15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d39919061186d565b50610d89600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683610b2d565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663617ba037600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16833060006040518563ffffffff1660e01b8152600401610e0d9493929190611924565b600060405180830381600087803b158015610e2757600080fd5b505af1158015610e3b573d6000803e3d6000fd5b505050506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541415610ed25742600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505b80600654610ee09190611969565b60068190555080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154610f349190611969565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17a760e00745bb3dd2a80fdce494e6d046d397799ef94def8cc71e2665c6c5fd84604051611032919061159c565b60405180910390a450565b7f000000000000000000000000000000000000000000000000000000000000000081565b6110696113a9565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016110c6919061161f565b602060405180830381865afa1580156110e3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061110791906117df565b9050600060065482611119919061175f565b9050808311156111625782816040517f10d156090000000000000000000000000000000000000000000000000000000081526004016111599291906116cb565b60405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166369328dec600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685336040518463ffffffff1660e01b81526004016111e393929190611793565b6020604051808303816000875af1158015611202573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061122691906117df565b50600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3eab9245288923bdc2f009594c02746febfdd320faf123e203eeb67223aa1222856040516112c8919061159c565b60405180910390a3505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6113036113a9565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611373576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161136a90611a42565b60405180910390fd5b61137c81611427565b50565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6113b16114eb565b73ffffffffffffffffffffffffffffffffffffffff166113cf610c09565b73ffffffffffffffffffffffffffffffffffffffff1614611425576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141c90611aae565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611523826114f8565b9050919050565b61153381611518565b811461153e57600080fd5b50565b6000813590506115508161152a565b92915050565b60006020828403121561156c5761156b6114f3565b5b600061157a84828501611541565b91505092915050565b6000819050919050565b61159681611583565b82525050565b60006020820190506115b1600083018461158d565b92915050565b6115c081611583565b81146115cb57600080fd5b50565b6000813590506115dd816115b7565b92915050565b6000602082840312156115f9576115f86114f3565b5b6000611607848285016115ce565b91505092915050565b61161981611518565b82525050565b60006020820190506116346000830184611610565b92915050565b600061164582611518565b9050919050565b6116558161163a565b811461166057600080fd5b50565b6000813590506116728161164c565b92915050565b600080600060608486031215611691576116906114f3565b5b600061169f86828701611663565b93505060206116b086828701611541565b92505060406116c1868287016115ce565b9150509250925092565b60006040820190506116e0600083018561158d565b6116ed602083018461158d565b9392505050565b60006116ff826114f8565b9050919050565b61170f816116f4565b82525050565b600060208201905061172a6000830184611706565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061176a82611583565b915061177583611583565b92508282101561178857611787611730565b5b828203905092915050565b60006060820190506117a86000830186611610565b6117b5602083018561158d565b6117c26040830184611610565b949350505050565b6000815190506117d9816115b7565b92915050565b6000602082840312156117f5576117f46114f3565b5b6000611803848285016117ca565b91505092915050565b60006040820190506118216000830185611610565b61182e602083018461158d565b9392505050565b60008115159050919050565b61184a81611835565b811461185557600080fd5b50565b60008151905061186781611841565b92915050565b600060208284031215611883576118826114f3565b5b600061189184828501611858565b91505092915050565b60006060820190506118af6000830186611610565b6118bc6020830185611610565b6118c9604083018461158d565b949350505050565b6000819050919050565b600061ffff82169050919050565b6000819050919050565b600061190e611909611904846118d1565b6118e9565b6118db565b9050919050565b61191e816118f3565b82525050565b60006080820190506119396000830187611610565b611946602083018661158d565b6119536040830185611610565b6119606060830184611915565b95945050505050565b600061197482611583565b915061197f83611583565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156119b4576119b3611730565b5b828201905092915050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611a2c6026836119bf565b9150611a37826119d0565b604082019050919050565b60006020820190508181036000830152611a5b81611a1f565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611a986020836119bf565b9150611aa382611a62565b602082019050919050565b60006020820190508181036000830152611ac781611a8b565b905091905056fea2646970667358221220c2b3aa10d5d0b3fb56e77bc18f252b8786322a71d4558d7727bb6c273eb5a55764736f6c634300080a0033";

type YieldFundAAVEConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YieldFundAAVEConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YieldFundAAVE__factory extends ContractFactory {
  constructor(...args: YieldFundAAVEConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    lockTime: PromiseOrValue<BigNumberish>,
    assetAddress: PromiseOrValue<string>,
    aaveTokenAddress: PromiseOrValue<string>,
    poolAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YieldFundAAVE> {
    return super.deploy(
      lockTime,
      assetAddress,
      aaveTokenAddress,
      poolAddress,
      overrides || {}
    ) as Promise<YieldFundAAVE>;
  }
  override getDeployTransaction(
    lockTime: PromiseOrValue<BigNumberish>,
    assetAddress: PromiseOrValue<string>,
    aaveTokenAddress: PromiseOrValue<string>,
    poolAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      lockTime,
      assetAddress,
      aaveTokenAddress,
      poolAddress,
      overrides || {}
    );
  }
  override attach(address: string): YieldFundAAVE {
    return super.attach(address) as YieldFundAAVE;
  }
  override connect(signer: Signer): YieldFundAAVE__factory {
    return super.connect(signer) as YieldFundAAVE__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YieldFundAAVEInterface {
    return new utils.Interface(_abi) as YieldFundAAVEInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YieldFundAAVE {
    return new Contract(address, _abi, signerOrProvider) as YieldFundAAVE;
  }
}
