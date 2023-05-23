import { StakingReward } from '../api';
import BigNumber from 'bignumber.js';

export class StakingRewardModel {
  amount: BigNumber;
  symbol: string;

  usdValue: BigNumber;

  constructor(dto?: StakingReward) {
    this.amount = new BigNumber(dto?.amount ?? 0);
    this.symbol = dto?.symbol ?? '';
    this.usdValue = new BigNumber(dto?.usdValue ?? 0);
  }

  combine(reward: StakingRewardModel): StakingRewardModel {
    if (this.symbol !== reward.symbol) {
      throw Error(
        `Cannot combine StakingRewardData: symbols mismatch (${this.symbol}-${reward.symbol})`
      );
    }

    const result = new StakingRewardModel();

    result.symbol = this.symbol;
    result.amount = this.amount.plus(reward.amount);
    result.usdValue = this.usdValue.plus(reward.usdValue);

    return result;
  }
}
