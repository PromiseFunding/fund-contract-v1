/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  PromiseFund,
  PromiseFundInterface,
} from "../../contracts/PromiseFund";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "assetAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "PromiseFund__CantWithdrawFunder",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseFund__CantWithdrawOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseFund__FundAmountMustBeAboveZero",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseFund__NoVotesLeft",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseFund__NotFundingPeriod",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseFund__StateNotPending",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseFund__StateNotVoting",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseFund__VoteEnded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minVoteLength",
        type: "uint256",
      },
    ],
    name: "PromiseFund__VoteTooShort",
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
    name: "PromiseFund__WithdrawFundsGreaterThanBalance",
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
    name: "PromiseFund__WithdrawProceedsGreaterThanBalance",
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
    inputs: [],
    name: "endVote",
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
    name: "getState",
    outputs: [
      {
        internalType: "enum IFund.FundState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTimeLeftVoting",
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
    name: "getTotalFunds",
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
    name: "getVoteEnd",
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
    name: "getVotesCon",
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
    name: "getVotesPro",
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
      {
        internalType: "uint256",
        name: "votes",
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
    inputs: [],
    name: "s_voteEnd",
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
    name: "s_votesCon",
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
    name: "s_votesPro",
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
    name: "s_votesTried",
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
        internalType: "enum IFund.FundState",
        name: "state",
        type: "uint8",
      },
    ],
    name: "setState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "startVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "support",
        type: "bool",
      },
    ],
    name: "submitVote",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "withdrawProceeds",
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
    name: "withdrawProceedsFunder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600e600a553480156200001657600080fd5b50604051620022e5380380620022e583398181016040528101906200003c9190620003dd565b6200005c620000506200015660201b60201c565b6200015e60201b60201c565b32600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000d0600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166200022260201b60201c565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060048190555060006006819055506000600960006101000a81548160ff021916908360038111156200014a57620001496200040f565b5b02179055505062000559565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b62000232620002b960201b60201c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415620002a5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200029c90620004c5565b60405180910390fd5b620002b6816200015e60201b60201c565b50565b620002c96200015660201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16620002ef6200034a60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff161462000348576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200033f9062000537565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003a58262000378565b9050919050565b620003b78162000398565b8114620003c357600080fd5b50565b600081519050620003d781620003ac565b92915050565b600060208284031215620003f657620003f562000373565b5b60006200040684828501620003c6565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000620004ad6026836200043e565b9150620004ba826200044f565b604082019050919050565b60006020820190508181036000830152620004e0816200049e565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006200051f6020836200043e565b91506200052c82620004e7565b602082019050919050565b60006020820190508181036000830152620005528162000510565b9050919050565b611d7c80620005696000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c8063893d20e811610104578063be05decc116100a2578063dba6335f11610071578063dba6335f146104dd578063e8363e99146104fb578063eb8bbd2814610517578063f2fde38b14610535576101da565b8063be05decc14610469578063ca03d47814610487578063ca1d209d146104a5578063d9f1aed9146104c1576101da565b80639d71bac0116100de5780639d71bac0146103f3578063a6b28bea14610411578063af62aa6814610443578063b92239461461045f576101da565b8063893d20e8146103995780638da5cb5b146103b757806399b6e524146103d5576101da565b806356de96db1161017c57806373d164071161014b57806373d1640714610323578063825808051461034157806386b85f7d1461035d57806387ceff091461037b576101da565b806356de96db146102af57806360d727b2146102cb578063670ab5e9146102fb578063715018a614610319576101da565b80633e5aa85b116101b85780633e5aa85b146102395780633f2205241461025757806347145d1d1461027357806354b05c0614610291576101da565b80631865c57d146101df5780631c7d8098146101fd57806332a884271461021b575b600080fd5b6101e7610551565b6040516101f4919061173c565b60405180910390f35b610205610568565b6040516102129190611770565b60405180910390f35b610223610572565b6040516102309190611770565b60405180910390f35b610241610578565b60405161024e9190611770565b60405180910390f35b610271600480360381019061026c91906117bc565b6105c8565b005b61027b6106d4565b6040516102889190611770565b60405180910390f35b61029961072f565b6040516102a6919061182a565b60405180910390f35b6102c960048036038101906102c4919061186a565b610755565b005b6102e560048036038101906102e091906118c3565b610782565b6040516102f29190611770565b60405180910390f35b610303610821565b604051610310919061182a565b60405180910390f35b61032161084b565b005b61032b61085f565b6040516103389190611770565b60405180910390f35b61035b6004803603810190610356919061192e565b610865565b005b6103656108e9565b6040516103729190611770565b60405180910390f35b610383610939565b6040516103909190611770565b60405180910390f35b6103a1610941565b6040516103ae919061182a565b60405180910390f35b6103bf61096b565b6040516103cc919061182a565b60405180910390f35b6103dd610994565b6040516103ea9190611770565b60405180910390f35b6103fb61099e565b6040516104089190611770565b60405180910390f35b61042b600480360381019061042691906118c3565b6109a4565b60405161043a93929190611981565b60405180910390f35b61045d600480360381019061045891906117bc565b6109ce565b005b610467610d0a565b005b610471610d0c565b60405161047e9190611770565b60405180910390f35b61048f610d12565b60405161049c9190611770565b60405180910390f35b6104bf60048036038101906104ba91906117bc565b610d18565b005b6104db60048036038101906104d691906117bc565b6110a9565b005b6104e56112fe565b6040516104f291906119d9565b60405180910390f35b61051560048036038101906105109190611a2c565b611324565b005b61051f6114ed565b60405161052c9190611770565b60405180910390f35b61054f600480360381019061054a91906118c3565b6114f7565b005b6000600960009054906101000a900460ff16905090565b6000600854905090565b60075481565b60006002600381111561058e5761058d6116c5565b5b600960009054906101000a900460ff1660038111156105b0576105af6116c5565b5b14156105c05760045490506105c5565b600090505b90565b6105d061157b565b600a5481101561061957600a546040517fab0631210000000000000000000000000000000000000000000000000000000081526004016106109190611770565b60405180910390fd5b6000600381111561062d5761062c6116c5565b5b600960009054906101000a900460ff16600381111561064f5761064e6116c5565b5b14610686576040517f7115fe7800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b62015180816106959190611a88565b426106a09190611ae2565b6005819055506001600960006101000a81548160ff021916908360038111156106cc576106cb6116c5565b5b021790555050565b6000600160038111156106ea576106e96116c5565b5b600960009054906101000a900460ff16600381111561070c5761070b6116c5565b5b141561072757426005546107209190611b38565b905061072c565b600090505b90565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b80600960006101000a81548160ff0219169083600381111561077a576107796116c5565b5b021790555050565b600080600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541461081757600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154905061081c565b600090505b919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61085361157b565b61085d60006115f9565b565b60055481565b8273ffffffffffffffffffffffffffffffffffffffff1663095ea7b383836040518363ffffffff1660e01b81526004016108a0929190611b6c565b6020604051808303816000875af11580156108bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e39190611baa565b50505050565b6000600160038111156108ff576108fe6116c5565b5b600960009054906101000a900460ff166003811115610921576109206116c5565b5b1415610931576005549050610936565b600090505b90565b600042905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600754905090565b60065481565b60036020528060005260406000206000915090508060000154908060010154908060020154905083565b6003808111156109e1576109e06116c5565b5b600960009054906101000a900460ff166003811115610a0357610a026116c5565b5b14610a3a576040517f01a6e85e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154811115610b055780600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546040517f11f6e9c3000000000000000000000000000000000000000000000000000000008152600401610afc929190611bd7565b60405180910390fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254610b579190611b38565b925050819055508060046000828254610b709190611b38565b92505081905550610ba4600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff163083610865565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3033846040518463ffffffff1660e01b8152600401610c0393929190611c00565b6020604051808303816000875af1158015610c22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c469190611baa565b50600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc322efa58c9cb2c39cfffdac61d35c8643f5cbf13c6a7d0034de2cf18923aff384604051610cff9190611770565b60405180910390a450565b565b60085481565b60045481565b60006003811115610d2c57610d2b6116c5565b5b600960009054906101000a900460ff166003811115610d4e57610d4d6116c5565b5b14610d85576040517fce417b6700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000811415610dc0576040517f35ce0e4c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610e1f93929190611c00565b6020604051808303816000875af1158015610e3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e629190611baa565b506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541415610ef65742600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505b80600454610f049190611ae2565b60048190555080600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154610f589190611ae2565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020181905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17a760e00745bb3dd2a80fdce494e6d046d397799ef94def8cc71e2665c6c5fd8460405161109e9190611770565b60405180910390a450565b6110b161157b565b600260038111156110c5576110c46116c5565b5b600960009054906101000a900460ff1660038111156110e7576110e66116c5565b5b1461111e576040517fac28408700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045481111561116957806004546040517f9e132333000000000000000000000000000000000000000000000000000000008152600401611160929190611bd7565b60405180910390fd5b806004600082825461117b9190611b38565b925050819055506111af600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff163083610865565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3033846040518463ffffffff1660e01b815260040161120e93929190611c00565b6020604051808303816000875af115801561122d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112519190611baa565b50600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f3eab9245288923bdc2f009594c02746febfdd320faf123e203eeb67223aa1222836040516112f39190611770565b60405180910390a350565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016003811115611338576113376116c5565b5b600960009054906101000a900460ff16600381111561135a576113596116c5565b5b14611391576040517fe9c5a93800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b4260055410156113d5576113a3610d0a565b6040517f6c03d5dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201541015611452576040517f931faea200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008282546114a59190611b38565b92505081905550806114cf576001600860008282546114c49190611ae2565b9250508190556114e9565b6001600760008282546114e29190611ae2565b9250508190555b5050565b6000600454905090565b6114ff61157b565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561156f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161156690611cba565b60405180910390fd5b611578816115f9565b50565b6115836116bd565b73ffffffffffffffffffffffffffffffffffffffff166115a161096b565b73ffffffffffffffffffffffffffffffffffffffff16146115f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115ee90611d26565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60048110611705576117046116c5565b5b50565b6000819050611716826116f4565b919050565b600061172682611708565b9050919050565b6117368161171b565b82525050565b6000602082019050611751600083018461172d565b92915050565b6000819050919050565b61176a81611757565b82525050565b60006020820190506117856000830184611761565b92915050565b600080fd5b61179981611757565b81146117a457600080fd5b50565b6000813590506117b681611790565b92915050565b6000602082840312156117d2576117d161178b565b5b60006117e0848285016117a7565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611814826117e9565b9050919050565b61182481611809565b82525050565b600060208201905061183f600083018461181b565b92915050565b6004811061185257600080fd5b50565b60008135905061186481611845565b92915050565b6000602082840312156118805761187f61178b565b5b600061188e84828501611855565b91505092915050565b6118a081611809565b81146118ab57600080fd5b50565b6000813590506118bd81611897565b92915050565b6000602082840312156118d9576118d861178b565b5b60006118e7848285016118ae565b91505092915050565b60006118fb82611809565b9050919050565b61190b816118f0565b811461191657600080fd5b50565b60008135905061192881611902565b92915050565b6000806000606084860312156119475761194661178b565b5b600061195586828701611919565b9350506020611966868287016118ae565b9250506040611977868287016117a7565b9150509250925092565b60006060820190506119966000830186611761565b6119a36020830185611761565b6119b06040830184611761565b949350505050565b60006119c3826117e9565b9050919050565b6119d3816119b8565b82525050565b60006020820190506119ee60008301846119ca565b92915050565b60008115159050919050565b611a09816119f4565b8114611a1457600080fd5b50565b600081359050611a2681611a00565b92915050565b600060208284031215611a4257611a4161178b565b5b6000611a5084828501611a17565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611a9382611757565b9150611a9e83611757565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611ad757611ad6611a59565b5b828202905092915050565b6000611aed82611757565b9150611af883611757565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611b2d57611b2c611a59565b5b828201905092915050565b6000611b4382611757565b9150611b4e83611757565b925082821015611b6157611b60611a59565b5b828203905092915050565b6000604082019050611b81600083018561181b565b611b8e6020830184611761565b9392505050565b600081519050611ba481611a00565b92915050565b600060208284031215611bc057611bbf61178b565b5b6000611bce84828501611b95565b91505092915050565b6000604082019050611bec6000830185611761565b611bf96020830184611761565b9392505050565b6000606082019050611c15600083018661181b565b611c22602083018561181b565b611c2f6040830184611761565b949350505050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611ca4602683611c37565b9150611caf82611c48565b604082019050919050565b60006020820190508181036000830152611cd381611c97565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611d10602083611c37565b9150611d1b82611cda565b602082019050919050565b60006020820190508181036000830152611d3f81611d03565b905091905056fea2646970667358221220b659507762b1c044d9f9bb118164e96012d1cc5b0c4ef62a91db0ee302db586164736f6c634300080a0033";

type PromiseFundConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PromiseFundConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PromiseFund__factory extends ContractFactory {
  constructor(...args: PromiseFundConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    assetAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PromiseFund> {
    return super.deploy(assetAddress, overrides || {}) as Promise<PromiseFund>;
  }
  override getDeployTransaction(
    assetAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(assetAddress, overrides || {});
  }
  override attach(address: string): PromiseFund {
    return super.attach(address) as PromiseFund;
  }
  override connect(signer: Signer): PromiseFund__factory {
    return super.connect(signer) as PromiseFund__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PromiseFundInterface {
    return new utils.Interface(_abi) as PromiseFundInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PromiseFund {
    return new Contract(address, _abi, signerOrProvider) as PromiseFund;
  }
}
