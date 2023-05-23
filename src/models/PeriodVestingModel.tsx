import { PeriodVesting } from '../api';
import BigNumber from 'bignumber.js';
import { SupplyTokenModel } from './SupplyTokenModel';

export class PeriodVestingModel {
  cumulativePart: SupplyTokenModel;
  part: SupplyTokenModel;
  percent: BigNumber;
  unfreezeTime: number;

  constructor(dto?: PeriodVesting) {
    this.cumulativePart = new SupplyTokenModel(dto?.cumulativePart);
    this.part = new SupplyTokenModel(dto?.part);
    this.percent = new BigNumber(dto?.share ?? 0).multipliedBy(100);
    this.unfreezeTime = dto?.unfreezeTime ?? 0;
  }

  combine(model: PeriodVestingModel): PeriodVestingModel {
    if (this.unfreezeTime !== model.unfreezeTime) {
      throw Error(
        `Cannot combine PeriodVesting: unfreezeTime mismatch (${this.unfreezeTime}-${model.unfreezeTime})`
      );
    }

    const result = new PeriodVestingModel();

    result.percent = this.percent;
    result.unfreezeTime = this.unfreezeTime;
    result.cumulativePart = this.cumulativePart.combine(model.cumulativePart);
    result.part = this.part.combine(model.part);

    return result;
  }
}
