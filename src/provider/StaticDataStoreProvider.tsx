import { observer, useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext, useEffect } from 'react';
import { StaticDataStore } from '../store/StaticDataStore';
import { useApi } from './ApiProvider';

const staticDataStoreContext = createContext<StaticDataStore>(
  {} as StaticDataStore
);

export const ProvideStaticData = observer(({ children }: any) => {
  const api = useApi();
  const store = useLocalObservable(() => new StaticDataStore(api));

  useEffect(() => {
    store.init();
  }, [store]);

  if (!store.initialized) {
    return null;
  }

  return (
    <staticDataStoreContext.Provider value={store}>
      {children}
    </staticDataStoreContext.Provider>
  );
});

export const useStaticData = () => {
  return useContext(staticDataStoreContext);
};
