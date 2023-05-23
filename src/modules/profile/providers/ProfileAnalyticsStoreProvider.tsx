import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { useApi } from '../../../provider/ApiProvider';
import { ProfileAnalyticsStore } from '../stores/ProfileAnalyticsStore';
import { useStaticData } from '../../../provider/StaticDataStoreProvider';

const storeContext = createContext<ProfileAnalyticsStore>(
  {} as ProfileAnalyticsStore
);

export const ProvideProfileAnalyticsStore = ({ children }: any) => {
  const api = useApi();
  const staticData = useStaticData();
  const store = useLocalObservable(
    () => new ProfileAnalyticsStore(api, staticData)
  );

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useProfileAnalyticsStore = () => {
  return useContext(storeContext);
};
