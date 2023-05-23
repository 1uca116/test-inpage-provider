import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { useApi } from '../../../provider/ApiProvider';
import { ProfilePortfolioStore } from '../stores/ProfilePortfolioStore';
import { useStaticData } from '../../../provider/StaticDataStoreProvider';

const profilePortfolioStoreContext = createContext<ProfilePortfolioStore>(
  {} as ProfilePortfolioStore
);

export const ProvideProfilePortfolioStore = ({ children }: any) => {
  const api = useApi();
  const staticData = useStaticData();
  const store = useLocalObservable(
    () => new ProfilePortfolioStore(api, staticData)
  );

  return (
    <profilePortfolioStoreContext.Provider value={store}>
      {children}
    </profilePortfolioStoreContext.Provider>
  );
};

export const useProfilePortfolioStore = () => {
  return useContext(profilePortfolioStoreContext);
};
