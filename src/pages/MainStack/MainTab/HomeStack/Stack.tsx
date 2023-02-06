import React from 'react';
import { MenuEntity } from '@/apis/menu/type';
import { Home } from '@/pages/MainStack/MainTab/HomeStack/Home';
import { BakeryDetailProvider } from '@/provider/BakeryDetailProvider';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { BakeryBreadReport } from './BakeryBreadReport/BakeryBreadReport';
import { BakeryDetailTabNavigator, BakeryDetailTabParamList } from './BakeryDetail/BakeryDetailTopTab';
import { BakeryMenuDetail } from './BakeryDetail/Tab';

export type HomeStackParamList = {
  Home: undefined;
  Bakery: NavigatorScreenParams<BakeryDetailTabParamList>;
  BakeryMenuDetail: {
    bakeryId: number;
    menu: MenuEntity;
  };
  BakeryBreadReport: {
    bakeryId: number;
  };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = StackScreenProps<HomeStackParamList, T>;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <BakeryDetailProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Bakery" component={BakeryDetailTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BakeryMenuDetail" component={BakeryMenuDetail} options={{ headerShown: false }} />
        <Stack.Screen name="BakeryBreadReport" component={BakeryBreadReport} options={{ headerShown: false }} />
      </Stack.Navigator>
    </BakeryDetailProvider>
  );
};

export { HomeStack };
