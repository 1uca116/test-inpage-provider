import './index.css';
import { TokenBalanceModel } from '../../../../models/TokenBalanceModel';
import { useMemo, useState } from 'react';
import Tokens from '../../../../components/core/tokens';
import { bigNumberToStr } from '../../../../utils/strings';

const WalletListItem = ({ assets }: { assets: TokenBalanceModel[] }) => {
  const sortedAssets = useMemo(
    () => [...assets].sort((x, y) => -x.total.comparedTo(y.total)),
    [assets]
  );

  return (
    <>
      {sortedAssets.map((item, index) => (
        <div className='wallet-item_table' key={index}>
          <div className='wallet-item_cell'>
            <Tokens tokens={[item]} />
          </div>
          <div className='wallet-item_cell'>
            ${bigNumberToStr(item.usdPrice, 4)}
          </div>
          <div className='wallet-item_cell'>
            {bigNumberToStr(item.amount, 3, { useShortNotation: true })}
          </div>
          <div className='wallet-item_cell'>
            ${bigNumberToStr(item.total, 0)}
          </div>
        </div>
      ))}
    </>
  );
};

const tokenUsdThreshold = 100;
const tokenCountThreshold = 5;

const WalletList = ({ assets }: { assets: TokenBalanceModel[] }) => {
  const [showAll, setShowAll] = useState(false);

  const enableHideFeature = useMemo(() => {
    if (assets.length <= tokenCountThreshold) {
      return false;
    }

    return true;
  }, [assets]);

  const tokensToDisplay = useMemo(() => {
    if (enableHideFeature === false || showAll) {
      return assets;
    }

    return assets.filter((x) => x.total.comparedTo(tokenUsdThreshold) > 0);
  }, [assets, enableHideFeature, showAll]);
  return (
    <div className='wallet-list_main'>
      <div className='wallet-list_header'>
        <div className='wallet-list_title'>Token</div>
        <div className='wallet-list_title'>Price</div>
        <div className='wallet-list_title'>Amount</div>
        <div className='wallet-list_title'>USD Value</div>
      </div>

      <WalletListItem assets={tokensToDisplay} />
    </div>
  );
};

export default WalletList;
