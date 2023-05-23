import { LaunchPool } from '../api';
import BigNumber from 'bignumber.js';
import { AllocationVestingModel } from './AllocationVestingModel';
import { SupplyTokenModel } from './SupplyTokenModel';

export class LaunchPoolModel {
  address: string;

  allocationVesting: AllocationVestingModel;
  depositedToken: SupplyTokenModel;

  totalUsdValue: BigNumber;

  constructor(dto?: LaunchPool) {
    this.address = dto?.poolAddress ?? '';
    this.depositedToken = new SupplyTokenModel(dto?.depositedToken);
    this.allocationVesting = new AllocationVestingModel(dto?.allocationVesting);
    this.totalUsdValue = dto?.totalUsdValue
      ? new BigNumber(dto.totalUsdValue)
      : new BigNumber(0);
  }

  combine(launchPool: LaunchPoolModel): LaunchPoolModel {
    if (this.address !== launchPool.address) {
      throw Error(
        `Cannot combine LaunchPoolData: address mismatch (${this.address}-${launchPool.address})`
      );
    }

    const result = new LaunchPoolModel();

    result.address = this.address;
    result.depositedToken = this.depositedToken.combine(
      launchPool.depositedToken
    );
    result.totalUsdValue = this.totalUsdValue.plus(launchPool.totalUsdValue);
    result.allocationVesting = this.allocationVesting.combine(
      launchPool.allocationVesting
    );

    return result;
  }
}
