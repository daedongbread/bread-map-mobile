import React from 'react';
import { BakeryDetailTabNavigator, BakeryDetailTabParamList } from '@/pages/MainStack/MainTab/HomeStack/Bakery/TopTab';
import { Home } from '@/pages/MainStack/MainTab/HomeStack/Home';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { BakeryDetailProvider } from '@/provider/BakeryDetailProvider';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';

export type HomeStackParamList = {
  Home: undefined;
  Bakery: NavigatorScreenParams<BakeryDetailTabParamList>;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  RootStackScreenProps<keyof RootStackParamList>,
  StackScreenProps<HomeStackParamList, T>
>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <BakeryDetailProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Bakery" component={BakeryDetailTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </BakeryDetailProvider>
  );
};

export { HomeStack };
