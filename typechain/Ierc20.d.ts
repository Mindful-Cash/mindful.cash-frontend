/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {Contract, ContractTransaction, EventFilter, Signer} from "ethers";
import {Listener, Provider} from "ethers/providers";
import {Arrayish, BigNumber, BigNumberish, Interface} from "ethers/utils";
import {
  TransactionOverrides,
  TypedEventDescription,
  TypedFunctionDescription
} from ".";

interface Ierc20Interface extends Interface {
  functions: {
    allowance: TypedFunctionDescription<{
      encode([_src, _dst]: [string, string]): string;
    }>;

    approve: TypedFunctionDescription<{
      encode([_dst, _amount]: [string, BigNumberish]): string;
    }>;

    balanceOf: TypedFunctionDescription<{encode([_whom]: [string]): string}>;

    totalSupply: TypedFunctionDescription<{encode([]: []): string}>;

    transfer: TypedFunctionDescription<{
      encode([_dst, _amount]: [string, BigNumberish]): string;
    }>;

    transferFrom: TypedFunctionDescription<{
      encode([_src, _dst, _amount]: [string, string, BigNumberish]): string;
    }>;
  };

  events: {
    Approval: TypedEventDescription<{
      encodeTopics([_src, _dst, _amount]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;

    Transfer: TypedEventDescription<{
      encodeTopics([_src, _dst, _amount]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;
  };
}

export class Ierc20 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): Ierc20;
  attach(addressOrName: string): Ierc20;
  deployed(): Promise<Ierc20>;

  on(event: EventFilter | string, listener: Listener): Ierc20;
  once(event: EventFilter | string, listener: Listener): Ierc20;
  addListener(eventName: EventFilter | string, listener: Listener): Ierc20;
  removeAllListeners(eventName: EventFilter | string): Ierc20;
  removeListener(eventName: any, listener: Listener): Ierc20;

  interface: Ierc20Interface;

  functions: {
    allowance(
      _src: string,
      _dst: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "allowance(address,address)"(
      _src: string,
      _dst: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    approve(
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    "approve(address,uint256)"(
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    balanceOf(
      _whom: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "balanceOf(address)"(
      _whom: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: TransactionOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: TransactionOverrides): Promise<BigNumber>;

    transfer(
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    "transfer(address,uint256)"(
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    transferFrom(
      _src: string,
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    "transferFrom(address,address,uint256)"(
      _src: string,
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;
  };

  allowance(
    _src: string,
    _dst: string,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>;

  "allowance(address,address)"(
    _src: string,
    _dst: string,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>;

  approve(
    _dst: string,
    _amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  "approve(address,uint256)"(
    _dst: string,
    _amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  balanceOf(
    _whom: string,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>;

  "balanceOf(address)"(
    _whom: string,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>;

  totalSupply(overrides?: TransactionOverrides): Promise<BigNumber>;

  "totalSupply()"(overrides?: TransactionOverrides): Promise<BigNumber>;

  transfer(
    _dst: string,
    _amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  "transfer(address,uint256)"(
    _dst: string,
    _amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  transferFrom(
    _src: string,
    _dst: string,
    _amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  "transferFrom(address,address,uint256)"(
    _src: string,
    _dst: string,
    _amount: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<ContractTransaction>;

  filters: {
    Approval(
      _src: string | null,
      _dst: string | null,
      _amount: null
    ): EventFilter;

    Transfer(
      _src: string | null,
      _dst: string | null,
      _amount: null
    ): EventFilter;
  };

  estimate: {
    allowance(
      _src: string,
      _dst: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "allowance(address,address)"(
      _src: string,
      _dst: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    approve(
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "approve(address,uint256)"(
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    balanceOf(
      _whom: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "balanceOf(address)"(
      _whom: string,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: TransactionOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: TransactionOverrides): Promise<BigNumber>;

    transfer(
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "transfer(address,uint256)"(
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    transferFrom(
      _src: string,
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "transferFrom(address,address,uint256)"(
      _src: string,
      _dst: string,
      _amount: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;
  };
}
