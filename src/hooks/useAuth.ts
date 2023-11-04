import { useCallback } from 'react';
import { LoginRequest, requestSocialLogin } from '@/apis/auth/requestLogin';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { login, logout, updateNewbieInfo } from '@/slices/auth';

export const useAuth = () => {
  const { accessToken, refreshToken, isNewbie } = useAppSelector(selector => selector.auth);
  const { deviceToken } = useAppSelector(selector => selector.notification);
  const dispatch = useAppDispatch();

  const signIn = useCallback(
    async ({ token, provider }: LoginRequest) => {
      try {
        const { data } = await requestSocialLogin({
          token,
          provider,
          deviceToken: deviceToken || '',
        });
        const { accessToken: _accessToken, refreshToken: _refreshToken, userId } = data;
        dispatch(login({ accessToken: _accessToken, refreshToken: _refreshToken, userId }));
      } catch (error: any) {
        // 등록되지 않은 유저 일 경우
        if (error.response.data.code === 40410) {
          dispatch(
            updateNewbieInfo({
              isNewbie: true,
              token,
              provider,
            })
          );
        }
      }
    },
    [dispatch, deviceToken]
  );

  const signOut = useCallback(() => {
    if (!accessToken || !refreshToken) {
      return;
    }

    dispatch(
      logout({
        accessToken: accessToken,
        refreshToken: refreshToken,
        deviceToken: deviceToken || '',
      })
    );
  }, [accessToken, deviceToken, dispatch, refreshToken]);

  return {
    isLoggedIn: !!accessToken,
    isNewbie: !!isNewbie,
    logIn: signIn,
    logOut: signOut,
  };
};
