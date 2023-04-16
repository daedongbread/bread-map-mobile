import React, { createContext, FC, useEffect } from 'react';
import { SocialProvider } from '@/apis/auth/requestLogin';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { initAuth } from '@/slices/auth';

type AuthContextValue = {
  login: ({ token, provider }: { token: string; provider: SocialProvider }) => void;
  logOut: () => void;
  isLogin: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selector => selector.auth);

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export { AuthProvider };
