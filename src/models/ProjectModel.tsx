import BigNumber from 'bignumber.js';
import { ProjectDTO, ProjectResponse } from '../api';
import { groupBy, map } from 'lodash';
import { LaunchPoolModel } from './LaunchPoolModel';
import { LiquidityModel } from './LiquidityModel';
import { PoolModel } from './PoolModel';

export class ProjectModel {
  id: string;
  name: string;
  totalUsdValue: BigNumber;

  pools: PoolModel[];
  launchPools: LaunchPoolModel[];
  liquidity: LiquidityModel;

  constructor(dto?: ProjectDTO, projectData?: ProjectResponse) {
    this.id = dto?.id ?? '0';
    this.name = dto?.name ?? '';

    this.liquidity = new LiquidityModel(projectData?.liquidity);

    this.pools = projectData?.pools.map((x) => new PoolModel(x)) ?? [];

    this.launchPools =
      projectData?.launchpools?.map((x) => new LaunchPoolModel(x)) ?? [];

    this.totalUsdValue = (
      this.pools
        .map((x) => x.totalUsdValue)
        .reduce((x, y) => x.plus(y), new BigNumber(0)) ?? new BigNumber(0)
    )
      .plus(
        this.launchPools
          .map((x) => x.totalUsdValue)
          .reduce((x, y) => x.plus(y), new BigNumber(0)) ?? new BigNumber(0)
      )
      .plus(this.liquidity.totalUsd);
  }

  hasAnyAssets() {
    return (
      this.pools.length > 0 ||
      this.launchPools.length > 0 ||
      this.liquidity.supplyTokens.length > 0
    );
  }

  combine(project: ProjectModel): ProjectModel {
    if (this.id !== project.id) {
      throw Error(
        `Cannot combine projects: id mismatch (${this.id}-${project.id})`
      );
    }

    const result = new ProjectModel();

    result.id = this.id;
    result.name = this.name;

    result.liquidity = this.liquidity.combine(project.liquidity);

    const poolsGroupedByAddress = groupBy(
      this.pools.concat(project.pools),
      (x) => x.address
    );

    result.pools = map(poolsGroupedByAddress, (poolGroup) =>
      poolGroup.reduce((x, y) => x.combine(y))
    );

    const launchPoolsGroupedByAddress = groupBy(
      this.launchPools.concat(project.launchPools),
      (x) => x.address
    );

    result.launchPools = map(launchPoolsGroupedByAddress, (poolGroup) =>
      poolGroup.reduce((x, y) => x.combine(y))
    );

    result.totalUsdValue = this.totalUsdValue.plus(project.totalUsdValue);

    return result;
  }
}
