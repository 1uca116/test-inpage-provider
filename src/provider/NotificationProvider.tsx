import NotificationArea from '../components/layout/notification-area';
import {observer, useLocalObservable} from 'mobx-react-lite';
import {createContext, useContext} from 'react';
import {NotificationStore} from '../store/Notification';

const notificationContext = createContext<NotificationStore>(
    {} as NotificationStore
);

export const ProvideNotification = observer(({children}: any) => {
    const state = useLocalObservable(() => new NotificationStore());

    return (
        <notificationContext.Provider value={state}>
            <NotificationArea/>

            {children}
        </notificationContext.Provider>
    );
});

export const useNotification = () => {
    return useContext(notificationContext);
};
