import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layout/navbar';
import { ProvideNotification } from '../provider/NotificationProvider';
import { ProvideLayout } from '../provider/LayoutStoreProvider';
import { ProvideAuth } from '../provider/AuthProvider';
import ROUTES from '../routes/routes';
import MainPage from '../pages/main';
import ProfilePage from '../pages/profile';
import PageContainer from './layout/page-container';
import NftPage from '../pages/nft';
import StatsPage from '../pages/stats';

function App() {
  const AppProviders = ({ children }: { children: JSX.Element }) => {
    return (
      <ProvideNotification>
        <ProvideLayout>
          <ProvideAuth>{children}</ProvideAuth>
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
            <Route path={`${ROUTES.profile.path}`} element={<ProfilePage />} />
            <Route path={`${ROUTES.nft.path}`} element={<NftPage />} />
            <Route path={`${ROUTES.stats.path}`} element={<StatsPage />} />
          </Routes>
        </PageContainer>
      </Router>
    </AppProviders>
  );
}

export default App;
