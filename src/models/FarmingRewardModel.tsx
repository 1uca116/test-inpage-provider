import { FarmingReward } from '../api';
import BigNumber from 'bignumber.js';

export class FarmingRewardModel {
  entitledAmount: BigNumber;
  entitledAmountUsdValue: BigNumber;

  farmDebtAmount: BigNumber;
  farmDebtAmountUsdValue: BigNumber;

  symbol: string;

  vestedAmount: BigNumber;
  vestedAmountUsdValue: BigNumber;

  constructor(dto?: FarmingReward) {
    this.entitledAmount = new BigNumber(dto?.entitledAmount ?? 0);
    this.entitledAmountUsdValue = new BigNumber(dto?.entitledUsdValue ?? 0);
    this.farmDebtAmount = new BigNumber(dto?.farmDebtAmount ?? 0);
    this.farmDebtAmountUsdValue = new BigNumber(dto?.farmDebtUsdValue ?? 0);
    this.symbol = dto?.symbol ?? '';
    this.vestedAmount = new BigNumber(dto?.vestedAmount ?? 0);
    this.vestedAmountUsdValue = new BigNumber(dto?.vestedUsdValue ?? 0);
  }

  combine(rewardData: FarmingRewardModel): FarmingRewardModel {
    if (this.symbol !== rewardData.symbol) {
      throw Error(
        `Cannot combine FarmingRewardData: symbols mismatch (${this.symbol}-${rewardData.symbol})`
      );
    }

    const result = new FarmingRewardModel();

    result.symbol = this.symbol;
    result.entitledAmount = this.entitledAmount.plus(rewardData.entitledAmount);
    result.entitledAmountUsdValue = this.entitledAmountUsdValue.plus(
      rewardData.entitledAmountUsdValue
    );
    result.farmDebtAmount = this.farmDebtAmount.plus(rewardData.farmDebtAmount);
    result.farmDebtAmountUsdValue = this.farmDebtAmountUsdValue.plus(
      rewardData.farmDebtAmountUsdValue
    );
    result.vestedAmount = this.vestedAmount.plus(rewardData.vestedAmount);
    result.vestedAmountUsdValue = this.vestedAmountUsdValue.plus(
      rewardData.vestedAmountUsdValue
    );

    return result;
  }
}
