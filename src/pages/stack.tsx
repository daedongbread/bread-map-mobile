import React from 'react';
import { DummyAuth } from '@/pages/Auth';
import { HomeStack } from '@/pages/home/stack';
import { Onboarding } from '@/pages/Onboarding';
import { useAuth } from '@/provider/AuthProvider/AuthProvider';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  HomeStack: undefined;
  Onboarding: undefined;
  Auth: undefined;
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
            <Stack.Screen name="HomeStack" component={HomeStack} />
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
