import React from 'react';
import { Home } from '@/pages/MainStack/MainTab/HomeStack/Home';
import { RankingBakeryOfTheWeek } from '@/pages/MainStack/MainTab/HomeStack/RankingBakeryOfTheWeek/RankingBakeryOfTheWeek';
import { BakeryDetailProvider } from '@/provider/BakeryDetailProvider';
import { CompositeScreenProps } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList, MainStackScreenProps } from '../../Stack';
import { CurationDetail } from './CurationDetail';

export type HomeStackParamList = {
  Home: undefined;
  CurationDetail: {
    feedId: number;
  };
  RankingBakeryOfTheWeek: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <BakeryDetailProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="CurationDetail" component={CurationDetail} options={{ headerShown: false }} />
        <Stack.Screen name="RankingBakeryOfTheWeek" component={RankingBakeryOfTheWeek} />
      </Stack.Navigator>
    </BakeryDetailProvider>
  );
};

export { HomeStack };
