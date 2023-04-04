import React from 'react';
import { WelcomeComponent } from '@/components/Welcome';

export const WelcomeContainer = () => {
  const onPressConfirm = () => {};
  return <WelcomeComponent onPressConfirm={onPressConfirm} />;
};
