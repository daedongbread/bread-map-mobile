import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { login, logout } from '@/slices/auth';

export const useAuth = () => {
  const accessToken = useAppSelector(selector => selector.auth.accessToken);
  const dispatch = useAppDispatch();

  const signIn = useCallback(
    ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
      dispatch(login({ accessToken, refreshToken }));
    },
    [dispatch]
  );

  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    isLoggedIn: !!accessToken,
    logIn: signIn,
    logOut: signOut,
  };
};
