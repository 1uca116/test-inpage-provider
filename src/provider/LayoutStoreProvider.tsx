import ModalArea from '../components/layout/modal-area';
import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { LayoutStore } from '../store/LayoutStore';

const layoutStoreContext = createContext<LayoutStore>({} as LayoutStore);

export const ProvideLayout = ({ children }: any) => {
  const store = useLocalObservable(() => new LayoutStore());

  return (
    <layoutStoreContext.Provider value={store}>
      {children}

      <ModalArea />
    </layoutStoreContext.Provider>
  );
};

export const useLayoutStore = () => {
  return useContext(layoutStoreContext);
};
