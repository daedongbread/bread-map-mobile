import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useAuth } from '@/hooks/useAuth';
import { Auth } from '@/pages/Auth';
import { AuthWebView } from '@/pages/Auth/AuthWebView';
import { MainStack, MainStackParamList } from '@/pages/MainStack/Stack';
import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { Onboarding } from './Onboarding';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  AuthWebView: {
    type: 'google' | 'kakao';
  };
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isLoggedIn } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    async function getLaunchStatus() {
      const status = await EncryptedStorage.getItem('firstLaunch');
      if (status === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }
    getLaunchStatus();
  }, []);

  if (typeof isFirstLaunch === 'undefined') {
    return null;
  }
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name={'MainStack'} component={MainStack} />
            </>
          ) : (
            <>
              {isFirstLaunch && <Stack.Screen name={'Onboarding'} component={Onboarding} />}
              <Stack.Screen name={'Auth'} component={Auth} />
              <Stack.Screen name={'AuthWebView'} component={AuthWebView} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export { RootNavigation };
