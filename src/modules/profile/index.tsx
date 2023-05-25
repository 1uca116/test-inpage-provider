import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import {
  ProvideProfilePortfolioStore,
  useProfilePortfolioStore,
} from './providers/ProfilePortfolioStoreProvider';
import ProfilePortfolio from './components';
import { ProvideProfileAnalyticsStore } from './providers/ProfileAnalyticsStoreProvider';

const ProfilePage = observer(() => {
  const { address } = useParams();

  const profilePortfolioStore = useProfilePortfolioStore();

  useEffect(() => {
    if (!address) {
      return;
    }

    profilePortfolioStore.fetchPortfolio(address);
  }, [address, profilePortfolioStore]);

  return (
    <React.Fragment>
      <Routes>
        <Route index element={<ProfilePortfolio />} />
        <Route path='*' element={<Navigate to='' />} />
      </Routes>
    </React.Fragment>
  );
});

const Profile = () => {
  return (
    <ProvideProfilePortfolioStore>
      <ProvideProfileAnalyticsStore>
        <ProfilePage />
      </ProvideProfileAnalyticsStore>
    </ProvideProfilePortfolioStore>
  );
};

export default Profile;
