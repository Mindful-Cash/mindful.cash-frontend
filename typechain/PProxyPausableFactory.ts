/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {Contract, ContractFactory, Signer} from "ethers";
import {Provider} from "ethers/providers";
import {UnsignedTransaction} from "ethers/utils/transaction";

import {TransactionOverrides} from ".";
import {PProxyPausable} from "./PProxyPausable";

export class PProxyPausableFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: TransactionOverrides): Promise<PProxyPausable> {
    return super.deploy(overrides) as Promise<PProxyPausable>;
  }
  getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction {
    return super.getDeployTransaction(overrides);
  }
  attach(address: string): PProxyPausable {
    return super.attach(address) as PProxyPausable;
  }
  connect(signer: Signer): PProxyPausableFactory {
    return super.connect(signer) as PProxyPausableFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PProxyPausable {
    return new Contract(address, _abi, signerOrProvider) as PProxyPausable;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    stateMutability: "payable",
    type: "fallback"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_value",
        type: "address"
      }
    ],
    name: "addressToBytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_value",
        type: "bytes32"
      }
    ],
    name: "bytes32ToAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_value",
        type: "bytes32"
      }
    ],
    name: "bytes32ToString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "getImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPauzer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getProxyOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "readAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "readBool",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "readString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renouncePauzer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImplementation",
        type: "address"
      }
    ],
    name: "setImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_value",
        type: "bool"
      }
    ],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newPauzer",
        type: "address"
      }
    ],
    name: "setPauzer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address"
      }
    ],
    name: "setProxyOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "storageRead",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_value",
        type: "string"
      }
    ],
    name: "stringToBytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "result",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061005460405160200180806913d5d3915497d4d313d560b21b815250600a019050604051602081830303815290604052805190602001203361009d60201b60201c565b61009860405160200180806a14105556915497d4d313d560aa1b815250600b019050604051602081830303815290604052805190602001203361009d60201b60201c565b6100d5565b6100c1826100b3836001600160e01b036100c516565b6001600160e01b036100d116565b5050565b6001600160a01b031690565b9055565b610cfb806100e46000396000f3fe6080604052600436106100ce5760003560e01c806316c38b3c146100d857806317b857dd146101045780631ab7710d146101195780631bc289601461014a57806337a440e6146101e95780634bde4b2e146102255780635ced058e1461023a5780636805b84b1461026457806382c947b71461028d5780638f4edfe2146102c05780639201de55146102f35780639d84ae691461031d578063aaf10f4214610347578063bb15ac8e1461035c578063caaee91c14610386578063cfb51928146103b9578063d784d4261461046a575b6100d661049d565b005b3480156100e457600080fd5b506100d6600480360360208110156100fb57600080fd5b50351515610520565b34801561011057600080fd5b506100d66105ed565b34801561012557600080fd5b5061012e6106b8565b604080516001600160a01b039092168252519081900360200190f35b34801561015657600080fd5b506101746004803603602081101561016d57600080fd5b50356106fb565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101ae578181015183820152602001610196565b50505050905090810190601f1680156101db5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101f557600080fd5b506102136004803603602081101561020c57600080fd5b5035610716565b60408051918252519081900360200190f35b34801561023157600080fd5b5061012e61071a565b34801561024657600080fd5b5061012e6004803603602081101561025d57600080fd5b5035610759565b34801561027057600080fd5b5061027961075c565b604080519115158252519081900360200190f35b34801561029957600080fd5b50610213600480360360208110156102b057600080fd5b50356001600160a01b031661079b565b3480156102cc57600080fd5b506100d6600480360360208110156102e357600080fd5b50356001600160a01b03166107a7565b3480156102ff57600080fd5b506101746004803603602081101561031657600080fd5b5035610870565b34801561032957600080fd5b5061012e6004803603602081101561034057600080fd5b5035610975565b34801561035357600080fd5b5061012e610988565b34801561036857600080fd5b506102796004803603602081101561037f57600080fd5b50356109cf565b34801561039257600080fd5b506100d6600480360360208110156103a957600080fd5b50356001600160a01b03166109e3565b3480156103c557600080fd5b50610213600480360360208110156103dc57600080fd5b810190602081018135600160201b8111156103f657600080fd5b82018360208201111561040857600080fd5b803590602001918460018302840111600160201b8311171561042957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610aab945050505050565b34801561047657600080fd5b506100d66004803603602081101561048d57600080fd5b50356001600160a01b0316610ac9565b6104da60405160200180806a14105554d15117d4d313d560aa1b815250600b019050604051602081830303815290604052805190602001206109cf565b156105165760405162461bcd60e51b815260040180806020018281038252602c815260200180610c9a602c913960400191505060405180910390fd5b61051e610b9a565b565b61055d60405160200180806a14105556915497d4d313d560aa1b815250600b01905060405160208183030381529060405280519060200120610975565b6001600160a01b0316336001600160a01b0316146105ac5760405162461bcd60e51b8152600401808060200182810382526030815260200180610c3f6030913960400191505060405180910390fd5b6105ea60405160200180806a14105554d15117d4d313d560aa1b815250600b0190506040516020818303038152906040528051906020012082610c08565b50565b61062a60405160200180806a14105556915497d4d313d560aa1b815250600b01905060405160208183030381529060405280519060200120610975565b6001600160a01b0316336001600160a01b0316146106795760405162461bcd60e51b8152600401808060200182810382526030815260200180610c3f6030913960400191505060405180910390fd5b61051e60405160200180806a14105556915497d4d313d560aa1b815250600b019050604051602081830303815290604052805190602001206000610c2d565b60006106f660405160200180806913d5d3915497d4d313d560b21b815250600a01905060405160208183030381529060405280519060200120610975565b905090565b606061070e61070983610716565b610870565b90505b919050565b5490565b60006106f660405160200180806a14105556915497d4d313d560aa1b815250600b01905060405160208183030381529060405280519060200120610975565b90565b60006106f660405160200180806a14105554d15117d4d313d560aa1b815250600b019050604051602081830303815290604052805190602001206109cf565b6001600160a01b031690565b6107e360405160200180806913d5d3915497d4d313d560b21b815250600a01905060405160208183030381529060405280519060200120610975565b6001600160a01b0316336001600160a01b0316146108325760405162461bcd60e51b815260040180806020018281038252602b815260200180610c6f602b913960400191505060405180910390fd5b6105ea60405160200180806a14105556915497d4d313d560aa1b815250600b0190506040516020818303038152906040528051906020012082610c2d565b6040805160208082528183019092526060918291906020820181803683370190505090506000805b60208110156108ee576008810260020a85026001600160f81b03198116156108e557808484815181106108c757fe5b60200101906001600160f81b031916908160001a9053506001909201915b50600101610898565b506060816040519080825280601f01601f19166020018201604052801561091c576020820181803683370190505b50905060005b8281101561096c5783818151811061093657fe5b602001015160f81c60f81b82828151811061094d57fe5b60200101906001600160f81b031916908160001a905350600101610922565b50949350505050565b600061070e61098383610716565b610759565b60006106f660405160200180807212535413115351539510551253d397d4d313d5606a1b815250601301905060405160208183030381529060405280519060200120610975565b600060016109dc83610716565b1492915050565b610a1f60405160200180806913d5d3915497d4d313d560b21b815250600a01905060405160208183030381529060405280519060200120610975565b6001600160a01b0316336001600160a01b031614610a6e5760405162461bcd60e51b815260040180806020018281038252602b815260200180610c6f602b913960400191505060405180910390fd5b6105ea60405160200180806913d5d3915497d4d313d560b21b815250600a0190506040516020818303038152906040528051906020012082610c2d565b80516000908290610ac0575060009050610711565b50506020015190565b610b0560405160200180806913d5d3915497d4d313d560b21b815250600a01905060405160208183030381529060405280519060200120610975565b6001600160a01b0316336001600160a01b031614610b545760405162461bcd60e51b815260040180806020018281038252602b815260200180610c6f602b913960400191505060405180910390fd5b6105ea60405160200180807212535413115351539510551253d397d4d313d5606a1b81525060130190506040516020818303038152906040528051906020012082610c2d565b6000610be160405160200180807212535413115351539510551253d397d4d313d5606a1b815250601301905060405160208183030381529060405280519060200120610975565b905060405136600082376000803683855af43d806000843e818015610c04578184f35b8184fd5b8015610c1e57610c19826001610c3a565b610c29565b610c29826000610c3a565b5050565b610c2982610c3a8361079b565b905556fe5050726f78795061757361626c652e6f6e6c795061757a65723a206d73672073656e646572206e6f74207061757a65725050726f78792e6f6e6c7950726f78794f776e65723a206d73672073656e646572206e6f74206f776e65725050726f78795061757361626c652e6e6f745061757365643a20636f6e747261637420697320706175736564a26469706673582212202c03f9e43e280fe1250874ea74b26f9bf6adea53d7548926bee4c23d8c9ff59b64736f6c63430006040033";