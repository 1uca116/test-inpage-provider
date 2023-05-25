import { TokenBalanceModel } from '../../../../models/TokenBalanceModel';
import React, { useMemo } from 'react';
import ChartTest from './pie-chart';

const ChartCard = ({ assets }: { assets: TokenBalanceModel[] }) => {
  const Test = useMemo(
    () =>
      assets.map((x) => ({
        network: x.symbol,
        usdValue: x.total.toNumber(),
      })),
    []
  );

  return <ChartTest testData={Test} />;
};

export default ChartCard;
