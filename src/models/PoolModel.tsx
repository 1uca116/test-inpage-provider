import { PoolType, PoolInfo } from '../api';
import BigNumber from 'bignumber.js';
import { groupBy, map } from 'lodash';
import { StakingRewardModel } from './StakingRewardModel';
import { FarmingRewardModel } from './FarmingRewardModel';
import { SupplyTokenModel } from './SupplyTokenModel';
import { VeTokenModel } from './VeTokenModel';
import { LockedDepositModel } from './LockedDepositModel';

export class PoolModel {
  address: string;
  type: PoolType;
  stakingRewardList?: StakingRewardModel[] | null;
  rewardTokenList?: FarmingRewardModel[] | null;
  veTokenList?: VeTokenModel[] | null;
  supplyTokenList: SupplyTokenModel[];

  unlockSchedule: LockedDepositModel[];

  totalUsdValue: BigNumber;

  constructor(dto?: PoolInfo) {
    this.address = dto?.poolAddress ?? '';
    this.type = dto?.poolType ?? PoolType.FarmingPool;

    this.stakingRewardList = dto?.stakingRewardList?.map(
      (x) => new StakingRewardModel(x)
    );

    this.rewardTokenList = dto?.rewardTokenList?.map(
      (x) => new FarmingRewardModel(x)
    );

    this.veTokenList = dto?.veTokenList?.map((x) => new VeTokenModel(x)) ?? [];

    this.supplyTokenList =
      dto?.supplyTokenList.map((x) => new SupplyTokenModel(x)) ?? [];

    this.unlockSchedule =
      dto?.unlockSchedule?.map((x) => new LockedDepositModel(x)) ?? [];

    this.totalUsdValue = new BigNumber(dto?.totalUsdValue ?? 0);
  }

  combine(pool: PoolModel): PoolModel {
    if (this.address !== pool.address) {
      throw Error(
        `Cannot combine PoolData: address mismatch (${this.address}-${pool.address})`
      );
    }

    const result = new PoolModel();

    result.address = this.address;
    result.type = this.type;

    const stakingRewardGroups = groupBy(
      (this.stakingRewardList ?? []).concat(pool.stakingRewardList ?? []),
      (x) => x.symbol
    );

    result.stakingRewardList = map(stakingRewardGroups, (tokens) =>
      tokens.reduce((x, y) => x.combine(y))
    );

    const rewardTokenGroups = groupBy(
      (this.rewardTokenList ?? []).concat(pool.rewardTokenList ?? []),
      (x) => x.symbol
    );

    result.rewardTokenList = map(rewardTokenGroups, (tokens) =>
      tokens.reduce((x, y) => x.combine(y))
    );

    const veTokenGroups = groupBy(
      (this.veTokenList ?? []).concat(pool.veTokenList ?? []),
      (x) => x.symbol
    );

    result.veTokenList = map(veTokenGroups, (tokens) =>
      tokens.reduce((x, y) => x.combine(y))
    );

    const supplyTokenGroups = groupBy(
      (this.supplyTokenList ?? []).concat(pool.supplyTokenList ?? []),
      (x) => x.symbol
    );

    result.supplyTokenList = map(supplyTokenGroups, (tokens) =>
      tokens.reduce((x, y) => x.combine(y))
    );

    const unlockScheduleGroups = groupBy(
      this.unlockSchedule.concat(pool.unlockSchedule),
      (x) => x.unlockTime
    );

    result.unlockSchedule = map(unlockScheduleGroups, (deposits) =>
      deposits.reduce((x, y) => x.combine(y))
    );

    result.totalUsdValue = this.totalUsdValue.plus(pool.totalUsdValue);

    return result;
  }
}
