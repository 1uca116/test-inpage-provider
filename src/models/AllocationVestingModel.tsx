import { AllocationVesting } from '../api';
import { groupBy, map } from 'lodash';
import { PeriodVestingModel } from './PeriodVestingModel';
import { SupplyTokenModel } from './SupplyTokenModel';

export class AllocationVestingModel {
  total: SupplyTokenModel;
  vesting: PeriodVestingModel[];

  constructor(dto?: AllocationVesting) {
    this.total = new SupplyTokenModel(dto?.total);
    this.vesting = dto?.vesting.map((x) => new PeriodVestingModel(x)) ?? [];
  }

  combine(model: AllocationVestingModel): AllocationVestingModel {
    if (this.total.symbol !== model.total.symbol) {
      throw Error(
        `Cannot combine AllocationVesting: symbol mismatch (${this.total.symbol}-${model.total.symbol})`
      );
    }

    const result = new AllocationVestingModel();

    result.total = this.total.combine(model.total);

    const vestingGroups = groupBy(
      (this.vesting ?? []).concat(model.vesting ?? []),
      (x) => x.unfreezeTime
    );

    result.vesting = map(vestingGroups, (models) =>
      models.reduce((x, y) => x.combine(y))
    );

    return result;
  }
}
