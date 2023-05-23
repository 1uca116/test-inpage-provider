import { observer } from 'mobx-react-lite';
import { useProfilePortfolioStore } from '../providers/ProfilePortfolioStoreProvider';
import { NetworkModel } from '../../../models/NetworkModel';
import React, { useMemo } from 'react';
import { WalletModel } from '../../../models/WalletModel';
import Wallet from '../wallet';

const ProfileWallet = ({ networks }: { networks?: NetworkModel[] }) => {
  const wallet = useMemo(() => {
    if (!networks) {
      return undefined;
    }

    return networks
      .map((x) => x.wallet)
      .reduce((x, y) => x.combine(y), new WalletModel());
  }, [networks]);

  return <Wallet data={wallet} />;
};
const ProfilePortfolio = observer(() => {
  const profilePortfolioStore = useProfilePortfolioStore();

  return <ProfileWallet networks={profilePortfolioStore.networks} />;
});

export default ProfilePortfolio;
