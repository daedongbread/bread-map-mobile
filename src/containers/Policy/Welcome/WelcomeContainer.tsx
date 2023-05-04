import React from 'react';
import { WelcomeComponent } from '@/components/Welcome';
import { useAppDispatch } from '@/hooks/redux';
import { PolicyStackNavigationProps } from '@/pages/Policy/Stack';
import { login } from '@/slices/auth';
import { useRoute } from '@react-navigation/native';

type Route = PolicyStackNavigationProps<'Welcome'>['route'];

export const WelcomeContainer = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<Route>();
  const { accessToken, refreshToken, userId } = params;

  const onPressConfirm = () => {
    dispatch(login({ accessToken, refreshToken, userId }));
  };

  return <WelcomeComponent onPressConfirm={onPressConfirm} />;
};
