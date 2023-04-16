import { useCallback } from 'react';
import { LoginRequest, requestSocialLogin } from '@/apis/auth/requestLogin';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { login, logout } from '@/slices/auth';

export const useAuth = () => {
  const { accessToken, refreshToken } = useAppSelector(selector => selector.auth);
  const { deviceToken } = useAppSelector(selector => selector.notice);
  const dispatch = useAppDispatch();

  const signIn = useCallback(
    async ({ token, provider }: LoginRequest) => {
      try {
        const { data } = await requestSocialLogin({
          token,
          provider,
        });
        const { accessToken, accessTokenExpired, refreshToken, userId } = data;
        dispatch(login({ accessToken, refreshToken, userId }));
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch]
  );

  const signOut = useCallback(() => {
    if (!accessToken || !refreshToken) {
      return;
    }

    dispatch(
      logout({
        accessToken: accessToken,
        refreshToken: refreshToken,
        deviceToken: deviceToken || '1',
      })
    );
  }, [accessToken, deviceToken, dispatch, refreshToken]);

  return {
    isLoggedIn: !!accessToken,
    logIn: signIn,
    logOut: signOut,
  };
};
