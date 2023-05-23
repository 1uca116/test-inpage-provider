import { Ipl } from '../api';
import BigNumber from 'bignumber.js';

export class ImpermanentLossModel {
  constructor(dto?: Ipl) {
    this.timestamp = dto?.timestamp ?? 0;
    this.ipl = new BigNumber(dto?.ipl ?? 0);
  }

  timestamp: number;
  ipl: BigNumber;

  combine(model: ImpermanentLossModel): ImpermanentLossModel {
    if (this.timestamp !== model.timestamp) {
      throw Error(
        `Cannot combine ImpermanentLossModel: timestamp mismatch (${this.timestamp}-${model.timestamp})`
      );
    }

    const result = new ImpermanentLossModel();

    result.timestamp = this.timestamp;
    result.ipl = this.ipl;

    return result;
  }
}
