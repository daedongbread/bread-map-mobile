import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Flex } from '@/components/Shared/View';
import { useAuth } from '@/hooks/useAuth';
import { useDimensions } from '@/hooks/useDimensions';
import { Auth } from '@/pages/Auth';
import { AuthWebView } from '@/pages/Auth/AuthWebView';
import { MainStack, MainStackParamList } from '@/pages/MainStack/Stack';
import analytics from '@react-native-firebase/analytics';
import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { Onboarding } from './Onboarding';
import { PolicyStack, PolicyStackParamList } from './Policy/Stack';

export type RootStackParamList = {
  Onboarding: undefined;
  PolicyStack: NavigatorScreenParams<PolicyStackParamList>;
  Auth: undefined;
  AuthWebView: {
    type: 'google' | 'kakao';
  };
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  const routeNameRef = useRef<string>();

  const { setWindowHeight } = useDimensions();

  const { isLoggedIn, isNewbie } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    let isComponentMounted = true;

    async function getLaunchStatus() {
      const status = await EncryptedStorage.getItem('firstLaunch');
      if (!isComponentMounted) {
        return;
      }

      if (status === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }
    getLaunchStatus();

    return () => {
      isComponentMounted = false;
    };
  }, [isNewbie]);

  if (typeof isFirstLaunch === 'undefined') {
    return null;
  }
  return (
    <Flex onLayout={e => setWindowHeight(e.nativeEvent.layout.height)}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }

          routeNameRef.current = currentRouteName;
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name={'MainStack'} component={MainStack} />
            </>
          ) : (
            <>
              {isFirstLaunch && <Stack.Screen name={'Onboarding'} component={Onboarding} />}

              {isNewbie ? (
                <Stack.Screen name={'PolicyStack'} component={PolicyStack} />
              ) : (
                <Stack.Screen name={'Auth'} component={Auth} />
              )}
              <Stack.Screen name={'AuthWebView'} component={AuthWebView} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Flex>
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
