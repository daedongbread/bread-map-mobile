import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useMutation } from 'react-query';
import { LoginResponse, requestRefresh, requestSocialLogin, SocialProvider } from '@/apis/auth/requestLogin';
import { fetcher } from '@/apis/fetcher';

type User = {
  age: number;
  token: string;
};

const USER_KEY = 'user';
const EXPIRE_GAP = 5 * 24 * 60 * 60 * 60;
const EXPIRE_DATE = 30 * 24 * 60 * 60 * 60;

let REFRESH_TIME_OUT: ReturnType<typeof setTimeout> | null = null;

const getExpireDate = () => (EXPIRE_DATE + new Date().getTime()) * 1000;

const refreshTimeOut = (callBack: () => void, timeout?: number) => {
  if (REFRESH_TIME_OUT) {
    clearTimeout(REFRESH_TIME_OUT);
  }
  REFRESH_TIME_OUT = setTimeout(callBack, timeout || EXPIRE_DATE - EXPIRE_GAP * 1000);
};

export const useAuthMethod = () => {
  const userRef = useRef<User>();
  const [, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);

  const refreshQuery = useMutation(requestRefresh, {
    onSuccess: ({ appToken }) => {
      userRef.current = { age: getExpireDate(), token: appToken };
      EncryptedStorage.setItem(
        USER_KEY,
        JSON.stringify({
          age: getExpireDate(),
          token: appToken,
        })
      );
      refreshTimeOut(refreshQuery.mutateAsync);
    },
  });

  const onSuccessLogin = useCallback<(props: LoginResponse) => void>(
    ({ appToken }) => {
      if (appToken) {
        userRef.current = { age: getExpireDate(), token: appToken };
        EncryptedStorage.setItem(
          USER_KEY,
          JSON.stringify({
            age: EXPIRE_DATE,
            token: appToken,
          })
        );
        refreshTimeOut(refreshQuery.mutateAsync);
      }
    },
    [refreshQuery.mutateAsync]
  );

  const loginQuery = useMutation(requestSocialLogin, {
    onSuccess: onSuccessLogin,
  });

  useEffect(() => {
    console.log(userRef.current?.token);
    fetcher.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      config.headers = {
        Authorization: `Bearer ${userRef.current?.token}`,
      };
      return config;
    });
  }, []);

  useEffect(() => {
    EncryptedStorage.getItem(USER_KEY).then((data: string | null) => {
      if (data) {
        const { age, token } = JSON.parse(data);
        if (age > new Date().getTime() * 1000 && token) {
          if (age < (new Date().getTime() - EXPIRE_GAP) * 1000) {
            refreshQuery.mutate;
          } else {
            userRef.current = { age: getExpireDate(), token };
            refreshTimeOut(refreshQuery.mutate, age - EXPIRE_GAP * 1000);
          }
        }
      }
      setLoading(false);
    });
  }, [refreshQuery.mutate]);

  const login = ({ token, provider }: { token: string; provider: SocialProvider }) => {
    // loginQuery.mutate({ accessToken: token, provider });
    onSuccessLogin({ appToken: token, isNewMember: true });
  };

  const logOut = async () => {
    if (REFRESH_TIME_OUT) {
      clearTimeout(REFRESH_TIME_OUT);
    }
    await EncryptedStorage.removeItem(USER_KEY);
    userRef.current = undefined;
    setUpdate(prev => !prev);
  };

  return { login, user: userRef.current, loading, logOut };
};
