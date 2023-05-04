import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { initAuth } from '@/slices/auth';

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
