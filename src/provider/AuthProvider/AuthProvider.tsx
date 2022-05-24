import React, { createContext, FC, useContext } from 'react';
import { SocialProvider } from '@/apis/auth/requestLogin';
import { Auth } from '@/pages';
import { useAuthMethod } from './useAuthMethod';

type AuthContextValue = {
  login: ({ token, provider }: { token: string; provider: SocialProvider }) => void;
  logOut: () => void;
  isLogin: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: FC = ({ children }) => {
  const { login, logOut, user, loading } = useAuthMethod();

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ login, logOut, isLogin: Boolean(user?.token) }}>
      {/*{user?.token ? children : <Auth />}*/}
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Not Found OptimizeContext');
  }
  return context;
};

export { AuthProvider, useAuth };
