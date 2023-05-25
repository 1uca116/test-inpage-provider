import './index.css'
import { observer } from 'mobx-react-lite';
import { useProfilePortfolioStore } from '../providers/ProfilePortfolioStoreProvider';
import { NetworkModel } from '../../../models/NetworkModel';
import React, { useMemo } from 'react';
import { WalletModel } from '../../../models/WalletModel';
import WalletList from "./wallet";
import ChartCard from "./chart";

const ProfileComponents = ({ data }: { data?: WalletModel }) => {
  if (!data || data.tokens.length === 0) {
    return null;
  }

  return (
      <div className='flex '>
        <div className='wallet_main'>
          <WalletList assets={data.tokens} />
        </div>
        <ChartCard assets={data.tokens} />
      </div>
  );
}



const ProfileWallet = ({ networks }: { networks?: NetworkModel[] }) => {
  const wallet = useMemo(() => {
    if (!networks) {
      return undefined;
    }

    return networks
      .map((x) => x.wallet)
      .reduce((x, y) => x.combine(y), new WalletModel());
  }, [networks]);

  return (
    <div className='flex flex-col'>
      <ProfileComponents data={wallet}/>
      {/*<Wallet data={wallet} />*/}
    </div>
  );
};

const ProfilePortfolio = observer(() => {
  const profilePortfolioStore = useProfilePortfolioStore();

  return <ProfileWallet networks={profilePortfolioStore.networks} />;
});

export default ProfilePortfolio;
