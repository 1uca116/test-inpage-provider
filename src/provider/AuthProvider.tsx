import { observer, useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext, useEffect } from 'react';
import { AuthStore } from '../store/Auth';
import { useLayoutStore } from './LayoutStoreProvider';

const authContext = createContext({} as AuthStore);

export const ProvideAuth = observer(({ children }: any) => {

    const layoutStore = useLayoutStore();
    const store = useLocalObservable(() => new AuthStore( layoutStore));

    useEffect(() => {
        store.init();
    }, [store]);

    if (!store.initialized) {
        return null;
    }

    return <authContext.Provider value={store}>{children}</authContext.Provider>;
});

export const useAuthStore = () => {
    return useContext(authContext);
};