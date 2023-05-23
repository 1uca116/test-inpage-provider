import { networkType } from '../store/StaticDataStore';
import BigNumber from 'bignumber.js';

export type TokenBalanceProps = {
  amount?: string;
  usdPrice?: string;
  symbol?: string;
  rootAddress: string | null;
  network: string;
  networkType?: networkType;
};

export class TokenBalanceModel {
  amount: BigNumber;
  usdPrice: BigNumber;
  total: BigNumber;
  symbol: string;
  rootAddress: string;
  isNative: boolean;
  network: string;
  networkType?: networkType;

  constructor(props?: TokenBalanceProps) {
    this.amount = new BigNumber(props?.amount ?? 0);
    this.usdPrice = new BigNumber(props?.usdPrice ?? 0);
    this.symbol = props?.symbol ?? '';
    this.rootAddress = props?.rootAddress ?? '';
    this.network = props?.network ?? '';
    this.networkType = props?.networkType ?? 'network';
    this.total = this.amount.multipliedBy(this.usdPrice);
    this.isNative = this.symbol === 'EVER' && this.rootAddress === '';
  }

  combine(token: TokenBalanceModel): TokenBalanceModel {
    if (this.network !== token.network) {
      throw Error(
        `Cannot combine tokens: networks mismatch (${this.network}-${token.network})`
      );
    }

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

    const result = new TokenBalanceModel();

    result.network = this.network;
    result.symbol = this.symbol;
    result.usdPrice = this.usdPrice;
    result.rootAddress = this.rootAddress;
    result.isNative = this.isNative;
    result.amount = this.amount.plus(token.amount);
    result.total = this.total.plus(token.total);

    return result;
  }
}
