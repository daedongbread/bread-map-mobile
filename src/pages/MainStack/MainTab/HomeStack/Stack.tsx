import React from 'react';
import { Bakery } from '@/pages/MainStack/MainTab/HomeStack/Bakery';
import { Home } from '@/pages/MainStack/MainTab/HomeStack/Home';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';

export type HomeStackParamList = {
  Home: undefined;
  Bakery: { id: number };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  RootStackScreenProps<keyof RootStackParamList>,
  StackScreenProps<HomeStackParamList, T>
>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Bakery" component={Bakery} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export { HomeStack };
