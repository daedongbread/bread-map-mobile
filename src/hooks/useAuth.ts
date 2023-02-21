import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { login, logout } from '@/slices/auth';

export const useAuth = () => {
  const { accessToken, refreshToken } = useAppSelector(selector => selector.auth);
  const { deviceToken } = useAppSelector(selector => selector.notice);
  const dispatch = useAppDispatch();

  const signIn = useCallback(
    ({ accessToken, refreshToken, userId }: { accessToken: string; refreshToken: string; userId: number }) => {
      dispatch(login({ accessToken, refreshToken, userId }));
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
        deviceToken: deviceToken || '',
      })
    );
  }, [accessToken, deviceToken, dispatch, refreshToken]);

  return {
    isLoggedIn: !!accessToken,
    logIn: signIn,
    logOut: signOut,
  };
};
