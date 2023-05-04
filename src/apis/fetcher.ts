import axios, { AxiosError } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import store from '@/slices';
import { forceLogout, login } from '@/slices/auth';
import { Config } from '@/utils';
import { requestRefresh } from './auth/requestLogin';

const fetcher = axios.create({
  baseURL: Config.API_URI,
  responseType: 'json',
  withCredentials: true,
});

const TOKEN_REFRESH_ENDPOINT = '/v1/auth/reissue';

let isAlreadyFetchingAccessToken = false;
let subscribers: ((accessToken: string) => void)[] = [];

fetcher.interceptors.request.use(
  async request => {
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // refreshToken 만료시
      if (error.config.url === TOKEN_REFRESH_ENDPOINT) {
        store.dispatch(forceLogout());
        subscribers = [];
        return;
      }

      const retryOriginalRequest = new Promise((resolve, reject) => {
        addSubscriber((accessToken: string) => {
          try {
            if (error.config.headers) {
              error.config.headers.Authorization = `Bearer ${accessToken}`;
            }

            resolve(fetcher(error.config));
          } catch (err) {
            reject(err);
          }
        });
      });

      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;

        const user = await EncryptedStorage.getItem('user');
        if (!user) {
          return;
        }

        const { refreshToken, accessToken } = JSON.parse(user);
        const { data } = await requestRefresh({ accessToken, refreshToken });

        store.dispatch(login(data));
        onAccessTokenFetched(data.accessToken);

        isAlreadyFetchingAccessToken = false;
      }

      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

const addSubscriber = (callback: (accessToken: string) => void) => {
  subscribers.push(callback);
};

const onAccessTokenFetched = (accessToken: string) => {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
};

export const setHeader = (accessToken: string) => {
  fetcher.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const removeHeader = () => {
  fetcher.defaults.headers.common.Authorization = '';
};

export { fetcher };
