/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {Contract, ContractFactory, Signer} from "ethers";
import {Provider} from "ethers/providers";
import {UnsignedTransaction} from "ethers/utils/transaction";

import {TransactionOverrides} from ".";
import {LibFees} from "./LibFees";

export class LibFeesFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: TransactionOverrides): Promise<LibFees> {
    return super.deploy(overrides) as Promise<LibFees>;
  }
  getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction {
    return super.getDeployTransaction(overrides);
  }
  attach(address: string): LibFees {
    return super.attach(address) as LibFees;
  }
  connect(signer: Signer): LibFeesFactory {
    return super.connect(signer) as LibFeesFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibFees {
    return new Contract(address, _abi, signerOrProvider) as LibFees;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldFee",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256"
      }
    ],
    name: "AnnualFeeChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "AnnualFeeClaimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldRecipient",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newRecipient",
        type: "address"
      }
    ],
    name: "FeeRecipientChanged",
    type: "event"
  },
  {
    inputs: [],
    name: "MAX_ANNUAL_FEE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x6092610024600b82828239805160001a607314601757fe5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c80633809283a146038575b600080fd5b603e6050565b60408051918252519081900360200190f35b67016345785d8a00008156fea2646970667358221220ac6d749977b0bef000fb283d60f5281331813ce5622894e32c81724b9f2aa7f564736f6c63430006040033";
