import { Liquidity } from '../api';
import BigNumber from 'bignumber.js';
import { SupplyTokenModel } from './SupplyTokenModel';

export class LiquidityModel {
  supplyTokens: SupplyTokenModel[];
  totalUsd: BigNumber;

  constructor(dto?: Liquidity) {
    this.supplyTokens =
      dto?.supplyTokenList.map((x) => new SupplyTokenModel(x)) ?? [];

    this.totalUsd = new BigNumber(dto?.totalUsdValue ?? 0);
  }

  combine(liquidity: LiquidityModel): LiquidityModel {
    const result = new LiquidityModel();

    result.supplyTokens = this.supplyTokens.concat(liquidity.supplyTokens);
    result.totalUsd = this.totalUsd.plus(liquidity.totalUsd);

    return result;
  }
}
