/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../common";
import type {
  FlashLoanLogic,
  FlashLoanLogicInterface,
} from "../../../../../../../@aave/core-v3/contracts/protocol/libraries/logic/FlashLoanLogic";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "initiator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum DataTypes.InterestRateMode",
        name: "interestRateMode",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "referralCode",
        type: "uint16",
      },
    ],
    name: "FlashLoan",
    type: "event",
  },
];

const _bytecode =
  "0x6139a7610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c80632e7263ea14610045578063a1fe0e8d1461006e575b600080fd5b81801561005157600080fd5b5061006c60048036038101906100679190612ab9565b610097565b005b81801561007a57600080fd5b5061009560048036038101906100909190612c56565b610964565b005b6100aa8160200151826040015187610bb6565b6100b261222c565b81602001515167ffffffffffffffff8111156100d1576100d06124f7565b5b6040519080825280602002602001820160405280156100ff5781602001602082028036833780820191505090505b5081608001819052508160000151816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050816101a0015161015e578161010001518260e00151610162565b6000805b8260a0018360c0018281525082815250505060008160200181815250505b816020015151816020015110156103125781604001518160200151815181106101ac576101ab612cb2565b5b60200260200101518160600181815250506101d88160a001518260600151610dd090919063ffffffff16565b81608001518260200151815181106101f3576101f2612cb2565b5b602002602001018181525050856000836020015183602001518151811061021d5761021c612cb2565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634efecaa5836000015183606001516040518363ffffffff1660e01b81526004016102c5929190612cff565b600060405180830381600087803b1580156102df57600080fd5b505af11580156102f3573d6000803e3d6000fd5b5050505080602001805180919061030990612d57565b81525050610180565b806000015173ffffffffffffffffffffffffffffffffffffffff1663920f5c84836020015184604001518460800151338760a001516040518663ffffffff1660e01b8152600401610367959493929190612fa4565b6020604051808303816000875af1158015610386573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103aa9190613028565b6040518060400160405280600281526020017f313300000000000000000000000000000000000000000000000000000000000081525090610421576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041891906130aa565b60405180910390fd5b5060008160200181815250505b8160200151518160200151101561095c57816020015181602001518151811061045a57610459612cb2565b5b6020026020010151816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505081604001518160200151815181106104b4576104b3612cb2565b5b6020026020010151816060018181525050600060028111156104d9576104d86130cc565b5b82606001518260200151815181106104f4576104f3612cb2565b5b6020026020010151600281111561050e5761050d6130cc565b5b60028111156105205761051f6130cc565b5b141561060857610603866000836040015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060c0016040528084606001518152602001846080015185602001518151811061059b5761059a612cb2565b5b602002602001015181526020018460c001518152602001846040015173ffffffffffffffffffffffffffffffffffffffff168152602001856000015173ffffffffffffffffffffffffffffffffffffffff1681526020018560c0015161ffff16815250610dfd565b610941565b73__$f250b95a8491f1e84f401ed6d1693cd837$__631e6473f987878787604051806101800160405280886040015173ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff168152602001896080015173ffffffffffffffffffffffffffffffffffffffff1681526020018860600151815260200189606001518960200151815181106106b3576106b2612cb2565b5b602002602001015160028111156106cd576106cc6130cc565b5b60028111156106df576106de6130cc565b5b81526020018960c0015161ffff1681526020016000151581526020018961012001518152602001896101400151815260200189610160015173ffffffffffffffffffffffffffffffffffffffff1663fca513a86040518163ffffffff1660e01b8152600401602060405180830381865afa158015610761573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107859190613110565b73ffffffffffffffffffffffffffffffffffffffff16815260200189610180015160ff16815260200189610160015173ffffffffffffffffffffffffffffffffffffffff16635eb88d3d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156107fe573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108229190613110565b73ffffffffffffffffffffffffffffffffffffffff168152506040518663ffffffff1660e01b815260040161085b9594939291906132e2565b60006040518083038186803b15801561087357600080fd5b505af4158015610887573d6000803e3d6000fd5b505050508160c0015161ffff16816040015173ffffffffffffffffffffffffffffffffffffffff16836000015173ffffffffffffffffffffffffffffffffffffffff167fefefaba5e921573100900a3ad9cf29f222d995fb3b6045797eaea7521bd8d6f0338560600151876060015187602001518151811061090c5761090b612cb2565b5b60200260200101516002811115610926576109256130cc565b5b6000604051610938949392919061338a565b60405180910390a45b80602001805180919061095390612d57565b8152505061042e565b505050505050565b61096d826110eb565b60008160000151905060006109938360c001518460400151610dd090919063ffffffff16565b90508360040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634efecaa5846000015185604001516040518363ffffffff1660e01b81526004016109fc929190612cff565b600060405180830381600087803b158015610a1657600080fd5b505af1158015610a2a573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff16631b11d0ff84602001518560400151843388606001516040518663ffffffff1660e01b8152600401610a7b9594939291906133cf565b6020604051808303816000875af1158015610a9a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610abe9190613028565b6040518060400160405280600281526020017f313300000000000000000000000000000000000000000000000000000000000081525090610b35576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b2c91906130aa565b60405180910390fd5b50610bb0846040518060c00160405280866040015181526020018481526020018660a001518152602001866020015173ffffffffffffffffffffffffffffffffffffffff168152602001866000015173ffffffffffffffffffffffffffffffffffffffff168152602001866080015161ffff16815250610dfd565b50505050565b81518351146040518060400160405280600281526020017f343900000000000000000000000000000000000000000000000000000000000081525090610c32576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c2991906130aa565b60405180910390fd5b5060005b8351811015610dca576000826000868481518110610c5757610c56612cb2565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016040518060200160405290816000820154815250509050610cbc8161120f565b156040518060400160405280600281526020017f323900000000000000000000000000000000000000000000000000000000000081525090610d34576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2b91906130aa565b60405180910390fd5b50610d3e81611243565b6040518060400160405280600281526020017f323700000000000000000000000000000000000000000000000000000000000081525090610db5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dac91906130aa565b60405180910390fd5b50508080610dc290612d57565b915050610c36565b50505050565b6000816113886000190304831115821517610dea57600080fd5b6127106113888385020104905092915050565b6000610e1a82604001518360200151610dd090919063ffffffff16565b90506000818360200151610e2e9190613429565b9050600083602001518460000151610e46919061345d565b90506000610e5386611277565b9050610e68818761164c90919063ffffffff16565b610ef0816101e0015173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ebb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610edf91906134c8565b84886116649092919063ffffffff16565b81610100018181525050610f1a610f158261010001518661173590919063ffffffff16565b61177c565b8660080160008282829054906101000a90046fffffffffffffffffffffffffffffffff16610f489190613511565b92506101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550610f9c8186606001518460008a6117db90949392919063ffffffff16565b610fd68560800151826101e0015184886060015173ffffffffffffffffffffffffffffffffffffffff16611adb909392919063ffffffff16565b806101e0015173ffffffffffffffffffffffffffffffffffffffff166388dd91a18660800151846040518363ffffffff1660e01b815260040161101a929190612cff565b600060405180830381600087803b15801561103457600080fd5b505af1158015611048573d6000803e3d6000fd5b505050508460a0015161ffff16856060015173ffffffffffffffffffffffffffffffffffffffff16866080015173ffffffffffffffffffffffffffffffffffffffff167fefefaba5e921573100900a3ad9cf29f222d995fb3b6045797eaea7521bd8d6f0338960000151600060028111156110c6576110c56130cc565b5b8b602001516040516110db9493929190613557565b60405180910390a4505050505050565b60008160000160405180602001604052908160008201548152505090506111118161120f565b156040518060400160405280600281526020017f323900000000000000000000000000000000000000000000000000000000000081525090611189576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118091906130aa565b60405180910390fd5b5061119381611243565b6040518060400160405280600281526020017f32370000000000000000000000000000000000000000000000000000000000008152509061120a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120191906130aa565b60405180910390fd5b505050565b6000807fffffffffffffffffffffffffffffffffffffffffffffffffefffffffffffffff1983600001511614159050919050565b6000807ffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffff1983600001511614159050919050565b61127f612295565b611287612295565b82600001604051806020016040529081600082015481525050816101c001819052506112b7816101c00151611b94565b816101a00181815250508260010160009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff168160e00181815250508260020160009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16816101200181815250508260010160109054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16816101600181815250508260020160109054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16816101800181815250508260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16816101e0019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508260050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681610200019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508260060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681610220019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508260030160109054906101000a900464ffffffffff1681610240019064ffffffffff16908164ffffffffff168152505080610220015173ffffffffffffffffffffffffffffffffffffffff1663b1bf962d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561154b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061156f91906134c8565b816020018181525081600001818152505080610200015173ffffffffffffffffffffffffffffffffffffffff1663797743386040518163ffffffff1660e01b8152600401608060405180830381865afa1580156115d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115f491906135d9565b84604001856080018660600187610260018464ffffffffff1664ffffffffff168152508481525084815250848152505050505080608001518160c001818152505080606001518160a001818152505080915050919050565b6116568282611bc9565b6116608282611d31565b5050565b6000806116e58560010160009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff166b033b2e3c9fd0803ce80000006116cd6116b688611edf565b6116bf88611edf565b61173590919063ffffffff16565b6116d7919061345d565b611f0190919063ffffffff16565b90506116f08161177c565b8560010160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550809150509392505050565b60006b033b2e3c9fd0803ce8000000600283046000190304831115158215171561175e57600080fd5b81600283046b033b2e3c9fd0803ce800000085020104905092915050565b60006fffffffffffffffffffffffffffffffff80168211156117d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117ca906136b2565b60405180910390fd5b819050919050565b6117e3612384565b6117ff8561014001518660200151611f0190919063ffffffff16565b8160600181815250508560070160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a589870960405180610120016040528060006118648a6101c00151611f4c565b1415611871576000611893565b8960080160109054906101000a90046fffffffffffffffffffffffffffffffff165b6fffffffffffffffffffffffffffffffff1681526020018681526020018581526020018860c001518152602001846060015181526020018860a001518152602001886101a0015181526020018773ffffffffffffffffffffffffffffffffffffffff168152602001886101e0015173ffffffffffffffffffffffffffffffffffffffff168152506040518263ffffffff1660e01b81526004016119369190613789565b606060405180830381865afa158015611953573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061197791906137a5565b83600001846020018560400183815250838152508381525050505061199f816000015161177c565b8660010160106101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055506119e6816020015161177c565b8660030160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550611a2d816040015161177c565b8660020160106101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff167f804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a8260000151836020015184604001518961010001518a6101400151604051611acb9594939291906137f8565b60405180910390a2505050505050565b60006323b872dd60e01b905060405181815273ffffffffffffffffffffffffffffffffffffffff8516600482015273ffffffffffffffffffffffffffffffffffffffff8416602482015282604482015260008060648360008a5af1611b44573d6000803e3d6000fd5b50611b4e85611f81565b611b8d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b8490613897565b60405180910390fd5b5050505050565b600060407fffffffffffffffffffffffffffffffffffffffffffff0000ffffffffffffffff19836000015116901c9050919050565b8060e001518161010001818152505080610120015181610140018181525050600081610160015114611d08576000611c0b82610160015183610240015161204e565b9050611c248260e0015182611f0190919063ffffffff16565b82610100018181525050611c3c82610100015161177c565b8360010160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055506000826000015114611d06576000611c988361018001518461024001516120a9565b9050611cb283610120015182611f0190919063ffffffff16565b83610140018181525050611cca83610140015161177c565b8460020160006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff160217905550505b505b428260030160106101000a81548164ffffffffff021916908364ffffffffff1602179055505050565b611d396123ac565b6000826101a001511415611d4d5750611edb565b611d698261012001518360000151611f0190919063ffffffff16565b816020018181525050611d8e8261014001518360000151611f0190919063ffffffff16565b816040018181525050611db7826060015183610260015184610240015164ffffffffff166120be565b816060018181525050611ddb81606001518360400151611f0190919063ffffffff16565b8160000181815250508060000151816020015183608001518360400151611e02919061345d565b611e0c9190613429565b611e169190613429565b816080018181525050611e3b826101a001518260800151610dd090919063ffffffff16565b8160a001818152505060008160a0015114611ed957611e74611e6f8361010001518360a0015161173590919063ffffffff16565b61177c565b8360080160008282829054906101000a90046fffffffffffffffffffffffffffffffff16611ea29190613511565b92506101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055505b505b5050565b6000633b9aca008202905081633b9aca00820414611efc57600080fd5b919050565b6000816b019d971e4fe8401e740000006000190304831115821517611f2557600080fd5b6b033b2e3c9fd0803ce80000006b019d971e4fe8401e740000008385020104905092915050565b600060b07ffffffffffff000000000ffffffffffffffffffffffffffffffffffffffffffff19836000015116901c9050919050565b6000611fbf565b7f08c379a0000000000000000000000000000000000000000000000000000000006000526020600452806024528160445260646000fd5b3d60008114612000576020811461203b57611ffb7f475076323a206d616c666f726d6564207472616e7366657220726573756c7400601f611f88565b612048565b823b612032576120317f475076323a206e6f74206120636f6e74726163740000000000000000000000006014611f88565b5b60019150612048565b3d6000803e600051151591505b50919050565b6000808264ffffffffff16426120649190613429565b8461206f91906138b7565b90506301e13380818161208557612084613911565b5b049050806b033b2e3c9fd0803ce80000006120a0919061345d565b91505092915050565b60006120b68383426120be565b905092915050565b6000808364ffffffffff16836120d49190613429565b905060008114156120f4576b033b2e3c9fd0803ce8000000915050612225565b6000806000806001850393506002851161210f576000612114565b600285035b92506301e1338080026121308a8b611f0190919063ffffffff16565b8161213e5761213d613911565b5b0491506301e133806121598a84611f0190919063ffffffff16565b8161216757612166613911565b5b049050600082858761217991906138b7565b61218391906138b7565b90506002818161219657612195613911565b5b0490506000828587896121a991906138b7565b6121b391906138b7565b6121bd91906138b7565b9050600681816121d0576121cf613911565b5b04905080826301e13380898e6121e691906138b7565b6121f09190613940565b6b033b2e3c9fd0803ce8000000612207919061345d565b612211919061345d565b61221b919061345d565b9750505050505050505b9392505050565b6040518060e00160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016060815260200160008152602001600081525090565b604051806102800160405280600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200161230b6123e2565b8152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600064ffffffffff168152602001600064ffffffffff1681525090565b6040518060800160405280600081526020016000815260200160008152602001600081525090565b6040518060c001604052806000815260200160008152602001600081526020016000815260200160008152602001600081525090565b6040518060200160405280600081525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61241c81612409565b811461242757600080fd5b50565b60008135905061243981612413565b92915050565b6000819050919050565b6124528161243f565b811461245d57600080fd5b50565b60008135905061246f81612449565b92915050565b6000819050919050565b61248881612475565b811461249357600080fd5b50565b6000813590506124a58161247f565b92915050565b6000819050919050565b6124be816124ab565b81146124c957600080fd5b50565b6000813590506124db816124b5565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61252f826124e6565b810181811067ffffffffffffffff8211171561254e5761254d6124f7565b5b80604052505050565b60006125616123f5565b905061256d8282612526565b919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006125a282612577565b9050919050565b6125b281612597565b81146125bd57600080fd5b50565b6000813590506125cf816125a9565b92915050565b600080fd5b600067ffffffffffffffff8211156125f5576125f46124f7565b5b602082029050602081019050919050565b600080fd5b600061261e612619846125da565b612557565b9050808382526020820190506020840283018581111561264157612640612606565b5b835b8181101561266a578061265688826125c0565b845260208401935050602081019050612643565b5050509392505050565b600082601f830112612689576126886125d5565b5b813561269984826020860161260b565b91505092915050565b600067ffffffffffffffff8211156126bd576126bc6124f7565b5b602082029050602081019050919050565b6000819050919050565b6126e1816126ce565b81146126ec57600080fd5b50565b6000813590506126fe816126d8565b92915050565b6000612717612712846126a2565b612557565b9050808382526020820190506020840283018581111561273a57612739612606565b5b835b81811015612763578061274f88826126ef565b84526020840193505060208101905061273c565b5050509392505050565b600082601f830112612782576127816125d5565b5b8135612792848260208601612704565b91505092915050565b600080fd5b600067ffffffffffffffff8211156127bb576127ba6124f7565b5b6127c4826124e6565b9050602081019050919050565b82818337600083830152505050565b60006127f36127ee846127a0565b612557565b90508281526020810184848401111561280f5761280e61279b565b5b61281a8482856127d1565b509392505050565b600082601f830112612837576128366125d5565b5b81356128478482602086016127e0565b91505092915050565b600061ffff82169050919050565b61286781612850565b811461287257600080fd5b50565b6000813590506128848161285e565b92915050565b600060ff82169050919050565b6128a08161288a565b81146128ab57600080fd5b50565b6000813590506128bd81612897565b92915050565b60008115159050919050565b6128d8816128c3565b81146128e357600080fd5b50565b6000813590506128f5816128cf565b92915050565b60006101c08284031215612912576129116124e1565b5b61291d6101c0612557565b9050600061292d848285016125c0565b600083015250602082013567ffffffffffffffff81111561295157612950612572565b5b61295d84828501612674565b602083015250604082013567ffffffffffffffff81111561298157612980612572565b5b61298d8482850161276d565b604083015250606082013567ffffffffffffffff8111156129b1576129b0612572565b5b6129bd8482850161276d565b60608301525060806129d1848285016125c0565b60808301525060a082013567ffffffffffffffff8111156129f5576129f4612572565b5b612a0184828501612822565b60a08301525060c0612a1584828501612875565b60c08301525060e0612a29848285016126ef565b60e083015250610100612a3e848285016126ef565b61010083015250610120612a54848285016126ef565b61012083015250610140612a6a848285016126ef565b61014083015250610160612a80848285016125c0565b61016083015250610180612a96848285016128ae565b610180830152506101a0612aac848285016128e6565b6101a08301525092915050565b600080600080600060a08688031215612ad557612ad46123ff565b5b6000612ae38882890161242a565b9550506020612af488828901612460565b9450506040612b0588828901612496565b9350506060612b16888289016124cc565b925050608086013567ffffffffffffffff811115612b3757612b36612404565b5b612b43888289016128fb565b9150509295509295909350565b6000819050919050565b612b6381612b50565b8114612b6e57600080fd5b50565b600081359050612b8081612b5a565b92915050565b600060e08284031215612b9c57612b9b6124e1565b5b612ba660e0612557565b90506000612bb6848285016125c0565b6000830152506020612bca848285016125c0565b6020830152506040612bde848285016126ef565b604083015250606082013567ffffffffffffffff811115612c0257612c01612572565b5b612c0e84828501612822565b6060830152506080612c2284828501612875565b60808301525060a0612c36848285016126ef565b60a08301525060c0612c4a848285016126ef565b60c08301525092915050565b60008060408385031215612c6d57612c6c6123ff565b5b6000612c7b85828601612b71565b925050602083013567ffffffffffffffff811115612c9c57612c9b612404565b5b612ca885828601612b86565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b612cea81612597565b82525050565b612cf9816126ce565b82525050565b6000604082019050612d146000830185612ce1565b612d216020830184612cf0565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612d62826126ce565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612d9557612d94612d28565b5b600182019050919050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b612dd581612597565b82525050565b6000612de78383612dcc565b60208301905092915050565b6000602082019050919050565b6000612e0b82612da0565b612e158185612dab565b9350612e2083612dbc565b8060005b83811015612e51578151612e388882612ddb565b9750612e4383612df3565b925050600181019050612e24565b5085935050505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b612e93816126ce565b82525050565b6000612ea58383612e8a565b60208301905092915050565b6000602082019050919050565b6000612ec982612e5e565b612ed38185612e69565b9350612ede83612e7a565b8060005b83811015612f0f578151612ef68882612e99565b9750612f0183612eb1565b925050600181019050612ee2565b5085935050505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015612f56578082015181840152602081019050612f3b565b83811115612f65576000848401525b50505050565b6000612f7682612f1c565b612f808185612f27565b9350612f90818560208601612f38565b612f99816124e6565b840191505092915050565b600060a0820190508181036000830152612fbe8188612e00565b90508181036020830152612fd28187612ebe565b90508181036040830152612fe68186612ebe565b9050612ff56060830185612ce1565b81810360808301526130078184612f6b565b90509695505050505050565b600081519050613022816128cf565b92915050565b60006020828403121561303e5761303d6123ff565b5b600061304c84828501613013565b91505092915050565b600081519050919050565b600082825260208201905092915050565b600061307c82613055565b6130868185613060565b9350613096818560208601612f38565b61309f816124e6565b840191505092915050565b600060208201905081810360008301526130c48184613071565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60008151905061310a816125a9565b92915050565b600060208284031215613126576131256123ff565b5b6000613134848285016130fb565b91505092915050565b8082525050565b8082525050565b8082525050565b8082525050565b61316281612597565b82525050565b613171816126ce565b82525050565b60038110613188576131876130cc565b5b50565b600081905061319982613177565b919050565b60006131a98261318b565b9050919050565b6131b98161319e565b82525050565b6131c881612850565b82525050565b6131d7816128c3565b82525050565b6131e68161288a565b82525050565b610180820160008201516132036000850182613159565b5060208201516132166020850182613159565b5060408201516132296040850182613159565b50606082015161323c6060850182613168565b50608082015161324f60808501826131b0565b5060a082015161326260a08501826131bf565b5060c082015161327560c08501826131ce565b5060e082015161328860e0850182613168565b5061010082015161329d610100850182613168565b506101208201516132b2610120850182613159565b506101408201516132c76101408501826131dd565b506101608201516132dc610160850182613159565b50505050565b6000610200820190506132f8600083018861313d565b6133056020830187613144565b613312604083018661314b565b61331f6060830185613152565b61332c60808301846131ec565b9695505050505050565b61333f8161319e565b82525050565b6000819050919050565b6000819050919050565b600061337461336f61336a84613345565b61334f565b6126ce565b9050919050565b61338481613359565b82525050565b600060808201905061339f6000830187612ce1565b6133ac6020830186612cf0565b6133b96040830185613336565b6133c6606083018461337b565b95945050505050565b600060a0820190506133e46000830188612ce1565b6133f16020830187612cf0565b6133fe6040830186612cf0565b61340b6060830185612ce1565b818103608083015261341d8184612f6b565b90509695505050505050565b6000613434826126ce565b915061343f836126ce565b92508282101561345257613451612d28565b5b828203905092915050565b6000613468826126ce565b9150613473836126ce565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156134a8576134a7612d28565b5b828201905092915050565b6000815190506134c2816126d8565b92915050565b6000602082840312156134de576134dd6123ff565b5b60006134ec848285016134b3565b91505092915050565b60006fffffffffffffffffffffffffffffffff82169050919050565b600061351c826134f5565b9150613527836134f5565b9250826fffffffffffffffffffffffffffffffff0382111561354c5761354b612d28565b5b828201905092915050565b600060808201905061356c6000830187612ce1565b6135796020830186612cf0565b6135866040830185613336565b6135936060830184612cf0565b95945050505050565b600064ffffffffff82169050919050565b6135b68161359c565b81146135c157600080fd5b50565b6000815190506135d3816135ad565b92915050565b600080600080608085870312156135f3576135f26123ff565b5b6000613601878288016134b3565b9450506020613612878288016134b3565b9350506040613623878288016134b3565b9250506060613634878288016135c4565b91505092959194509250565b7f53616665436173743a2076616c756520646f65736e27742066697420696e203160008201527f3238206269747300000000000000000000000000000000000000000000000000602082015250565b600061369c602783613060565b91506136a782613640565b604082019050919050565b600060208201905081810360008301526136cb8161368f565b9050919050565b610120820160008201516136e96000850182612e8a565b5060208201516136fc6020850182612e8a565b50604082015161370f6040850182612e8a565b5060608201516137226060850182612e8a565b5060808201516137356080850182612e8a565b5060a082015161374860a0850182612e8a565b5060c082015161375b60c0850182612e8a565b5060e082015161376e60e0850182612dcc565b50610100820151613783610100850182612dcc565b50505050565b60006101208201905061379f60008301846136d2565b92915050565b6000806000606084860312156137be576137bd6123ff565b5b60006137cc868287016134b3565b93505060206137dd868287016134b3565b92505060406137ee868287016134b3565b9150509250925092565b600060a08201905061380d6000830188612cf0565b61381a6020830187612cf0565b6138276040830186612cf0565b6138346060830185612cf0565b6138416080830184612cf0565b9695505050505050565b7f475076323a206661696c6564207472616e7366657246726f6d00000000000000600082015250565b6000613881601983613060565b915061388c8261384b565b602082019050919050565b600060208201905081810360008301526138b081613874565b9050919050565b60006138c2826126ce565b91506138cd836126ce565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561390657613905612d28565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061394b826126ce565b9150613956836126ce565b92508261396657613965613911565b5b82820490509291505056fea2646970667358221220734a5d3c8846f36b6e085e13404fab6f0e0da51bdfc179ef69b408d82480ba1c64736f6c634300080a0033";

type FlashLoanLogicConstructorParams =
  | [linkLibraryAddresses: FlashLoanLogicLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FlashLoanLogicConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class FlashLoanLogic__factory extends ContractFactory {
  constructor(...args: FlashLoanLogicConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        FlashLoanLogic__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: FlashLoanLogicLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$f250b95a8491f1e84f401ed6d1693cd837\\$__", "g"),
      linkLibraryAddresses[
        "@aave/core-v3/contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic"
      ]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FlashLoanLogic> {
    return super.deploy(overrides || {}) as Promise<FlashLoanLogic>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FlashLoanLogic {
    return super.attach(address) as FlashLoanLogic;
  }
  override connect(signer: Signer): FlashLoanLogic__factory {
    return super.connect(signer) as FlashLoanLogic__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FlashLoanLogicInterface {
    return new utils.Interface(_abi) as FlashLoanLogicInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FlashLoanLogic {
    return new Contract(address, _abi, signerOrProvider) as FlashLoanLogic;
  }
}

export interface FlashLoanLogicLibraryAddresses {
  ["@aave/core-v3/contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic"]: string;
}