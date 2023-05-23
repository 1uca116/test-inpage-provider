import ROUTES from '../routes/routes';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layout/navbar';
import { ProvideNotification } from '../provider/NotificationProvider';
import { ProvideLayout } from '../provider/LayoutStoreProvider';
import { ProvideAuth } from '../provider/AuthProvider';
import MainPage from '../pages/main';
import ProfilePage from '../pages/profile';
import PageContainer from './layout/page-container';
import NftPage from '../pages/nft';
import StatsPage from '../pages/stats';
import BundlesPage from '../pages/bundles';
import { ProvideApi } from '../provider/ApiProvider';
import { ProvideStaticData } from '../provider/StaticDataStoreProvider';

function App() {
  const AppProviders = ({ children }: { children: JSX.Element }) => {
    return (
      <ProvideNotification>
        <ProvideLayout>
          <ProvideApi>
            <ProvideAuth>
              <ProvideStaticData>{children}</ProvideStaticData>
            </ProvideAuth>
          </ProvideApi>
        </ProvideLayout>
      </ProvideNotification>
    );
  };

  return (
    <AppProviders>
      <Router>
        <PageContainer>
          <Navbar />
          <Routes>
            <Route index element={<MainPage />} />
            <Route
              path={`${ROUTES.profile.path}/*`}
              element={<ProfilePage />}
            />
            <Route path={`${ROUTES.nft.path}`} element={<NftPage />} />
            <Route path={`${ROUTES.stats.path}`} element={<StatsPage />} />
            <Route path={`${ROUTES.bundles.path}`} element={<BundlesPage />} />
          </Routes>
        </PageContainer>
      </Router>
    </AppProviders>
  );
}

export default App;
