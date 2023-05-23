import { AccountHistoryTokenData } from '../api';
import BigNumber from 'bignumber.js';

export class AnalyticsTokenModel {
  constructor(dto?: AccountHistoryTokenData) {
    this.timestamp = dto?.timestamp ?? 0;
    this.usdValue = new BigNumber(dto?.usdValue ?? 0);
  }

  timestamp: number;
  usdValue: BigNumber;

  combine(model: AnalyticsTokenModel): AnalyticsTokenModel {
    if (this.timestamp !== model.timestamp) {
      throw Error(
        `Cannot combine AnalyticsTokenModel: timestamp mismatch (${this.timestamp}-${model.timestamp})`
      );
    }

    const result = new AnalyticsTokenModel();

    result.timestamp = this.timestamp;
    result.usdValue = this.usdValue.plus(model.usdValue);

    return result;
  }
}
