import React from 'react';
import { BakeryMenuEntity } from '@/apis/bakery/types';
import { MenuReviewList } from '@/components/BakeryDetail';
import { Home } from '@/pages/MainStack/MainTab/HomeStack/Home';
import { BakeryDetailProvider } from '@/provider/BakeryDetailProvider';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { BakeryBreadReport } from './BakeryBreadReport/BakeryBreadReport';
import { BakeryDetailTabNavigator, BakeryDetailTabParamList } from './BakeryDetail/BakeryDetailTopTab';

export type HomeStackParamList = {
  Home: undefined;
  Bakery: NavigatorScreenParams<BakeryDetailTabParamList>;
  BakeryMenuReviews: {
    menu: BakeryMenuEntity;
    bakeryId: number;
  };
  BakeryBreadReport: {
    bakeryId: number;
  };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = StackScreenProps<HomeStackParamList, T>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <BakeryDetailProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Bakery" component={BakeryDetailTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BakeryMenuReviews" component={MenuReviewList} options={{ headerShown: false }} />
        <Stack.Screen name="BakeryBreadReport" component={BakeryBreadReport} options={{ headerShown: false }} />
      </Stack.Navigator>
    </BakeryDetailProvider>
  );
};

export { HomeStack };
