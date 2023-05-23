import { Api } from '../api';
import { AxiosResponse } from 'axios';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { NotificationType } from '../store/Notification';
import { useNotification } from './NotificationProvider';

const api = new Api({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const apiContext = createContext(api);

export const ProvideApi = ({ children }: any) => {
  const notification = useNotification();
  const handleApiError = useCallback(
    (error: any) => {
      const response = error.response as AxiosResponse;

      if (!response) {
        return;
      }
      if (response.status >= 403) {
        notification.addNotification({
          text: 'Server error occured',
          type: NotificationType.Error,
        });
      }
    },
    [notification]
  );

  useEffect(() => {
    api.instance.interceptors.response.use(
      (res) => res,
      (error) => {
        handleApiError(error);
        return Promise.reject(error);
      }
    );
  }, [handleApiError]);

  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
};

export const useApi = () => {
  return useContext(apiContext);
};
