import React from 'react';
import { DummyAuth } from '@/pages/Auth';
import { MainStack, MainStackParamList } from '@/pages/MainStack/Stack';
import { Onboarding } from '@/pages/Onboarding';
import { useAuth } from '@/provider/AuthProvider/AuthProvider';
import { ReviewWriteStackParamList } from '@/router/types';
import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { ReviewWriteStack } from './ReviewWriteStack/Stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  MainStack: NavigatorScreenParams<MainStackParamList>;
  ReviewWriteStack: NavigatorScreenParams<ReviewWriteStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isLogin } = useAuth();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <>
            <Stack.Screen name={'MainStack'} component={MainStack} />
            <Stack.Screen name={'ReviewWriteStack'} component={ReviewWriteStack} />
          </>
        ) : (
          <>
            <Stack.Screen name={'Onboarding'} component={Onboarding} />
            <Stack.Screen name={'Auth'} component={DummyAuth} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
