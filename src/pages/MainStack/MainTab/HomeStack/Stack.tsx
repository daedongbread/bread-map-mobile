import React from 'react';
import { MenuEntity } from '@/apis/menu/type';
import { Home } from '@/pages/MainStack/MainTab/HomeStack/Home';
import { RankingBakeryOfTheWeek } from '@/pages/MainStack/MainTab/HomeStack/RankingBakeryOfTheWeek/RankingBakeryOfTheWeek';
import { BakeryDetailProvider } from '@/provider/BakeryDetailProvider';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { BakeryDetailTabNavigator, BakeryDetailTabParamList } from './BakeryDetail/BakeryDetailTopTab';
import { BakeryMenuDetail } from './BakeryDetail/Tab';
import { CurationDetail } from './CurationDetail';

export type HomeStackParamList = {
  Home: undefined;
  CurationDetail: {
    feedId: number;
  };
  Bakery: NavigatorScreenParams<BakeryDetailTabParamList>;
  BakeryMenuDetail: {
    bakeryId: number;
    bakeryName: string;
    menu: MenuEntity;
  };
  RankingBakeryOfTheWeek: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = StackScreenProps<HomeStackParamList, T>;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <BakeryDetailProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="CurationDetail" component={CurationDetail} options={{ headerShown: false }} />
        <Stack.Screen name="RankingBakeryOfTheWeek" component={RankingBakeryOfTheWeek} />
        <Stack.Screen name="Bakery" component={BakeryDetailTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BakeryMenuDetail" component={BakeryMenuDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </BakeryDetailProvider>
  );
};

export { HomeStack };
