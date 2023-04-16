import React from 'react';
import { WelcomeComponent } from '@/components/Welcome';
import { PolicyStackNavigationProps } from '@/pages/Policy/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = PolicyStackNavigationProps<'Welcome'>['navigation'];

export const WelcomeContainer = () => {
  const navigation = useNavigation<Navigation>();
  const onPressConfirm = () => {
    navigation.navigate('MainStack', {
      screen: 'MainTab',
    });
  };

  return <WelcomeComponent onPressConfirm={onPressConfirm} />;
};
