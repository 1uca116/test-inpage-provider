import { SupplyToken } from '../api';
import BigNumber from 'bignumber.js';

export class SupplyTokenModel {
  amount: BigNumber;
  symbol: string;
  rootAddress: string;
  usdValue: BigNumber;
  isNative: boolean;

  constructor(dto?: SupplyToken) {
    this.amount = new BigNumber(dto?.amount ?? 0);
    this.symbol = dto?.symbol ?? '';
    this.rootAddress = dto?.rootAddress ?? '';
    this.usdValue = new BigNumber(dto?.usdValue ?? 0);
    this.isNative = this.symbol === 'EVER' && this.rootAddress === '';
  }

  combine(token: SupplyTokenModel): SupplyTokenModel {
    if (this.symbol !== token.symbol) {
      throw Error(
        `Cannot combine tokens: symbols mismatch (${this.symbol}-${token.symbol})`
      );
    }

    if (this.rootAddress !== token.rootAddress) {
      throw Error(
        `Cannot combine tokens: rootAddresses mismatch (${this.rootAddress}-${token.rootAddress})`
      );
    }

    const result = new SupplyTokenModel();

    result.symbol = this.symbol;
    result.rootAddress = this.rootAddress;
    result.isNative = this.isNative;
    result.amount = this.amount.plus(token.amount);
    result.usdValue = this.usdValue.plus(token.usdValue);

    return result;
  }
}
