import { LockedDeposit } from '../api';
import BigNumber from 'bignumber.js';
import { SupplyTokenModel } from './SupplyTokenModel';
import { VeTokenModel } from './VeTokenModel';

export class LockedDepositModel {
  cumulativePart: SupplyTokenModel;
  part: SupplyTokenModel;
  vePart: VeTokenModel;
  percent: BigNumber;
  unlockTime: number;

  constructor(dto?: LockedDeposit) {
    this.cumulativePart = new SupplyTokenModel(dto?.cumulativePart);
    this.part = new SupplyTokenModel(dto?.part);
    this.vePart = new VeTokenModel(dto?.vePart);
    this.percent = new BigNumber(dto?.share ?? 0).multipliedBy(100);
    this.unlockTime = dto?.unlockTime ?? 0;
  }

  combine(model: LockedDepositModel): LockedDepositModel {
    if (this.unlockTime !== model.unlockTime) {
      throw Error(
        `Cannot combine LockedDeposit: unlockTime mismatch (${this.unlockTime}-${model.unlockTime})`
      );
    }

    const result = new LockedDepositModel();

    result.percent = this.percent;
    result.unlockTime = this.unlockTime;
    result.cumulativePart = this.cumulativePart.combine(model.cumulativePart);
    result.part = this.part.combine(model.part);
    result.vePart = this.vePart.combine(model.vePart);

    return result;
  }
}
