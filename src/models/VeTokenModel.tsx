import { VeToken } from '../api';
import BigNumber from 'bignumber.js';

export class VeTokenModel {
  amount: BigNumber;
  symbol: string;

  constructor(dto?: VeToken) {
    this.amount = new BigNumber(dto?.amount ?? 0);
    this.symbol = dto?.symbol ?? '';
  }

  combine(reward: VeTokenModel): VeTokenModel {
    if (this.symbol !== reward.symbol) {
      throw Error(
        `Cannot combine VeTokenModel: symbols mismatch (${this.symbol}-${reward.symbol})`
      );
    }

    const result = new VeTokenModel();

    result.symbol = this.symbol;
    result.amount = this.amount.plus(reward.amount);

    return result;
  }
}
