import React from 'react';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { BakeryReviewDetail } from './BakeryReviewDetail';

export type BakeryReviewDetailParamList = {
  BakeryReviewDetail: {
    reviewId: number;
  };
};

export type BakeryReviewDetailScreenProps<T extends keyof BakeryReviewDetailParamList> = CompositeScreenProps<
  StackScreenProps<BakeryReviewDetailParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createStackNavigator<BakeryReviewDetailParamList>();

export const BakeryReviewDetailStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BakeryReviewDetail" component={BakeryReviewDetail} />
  </Stack.Navigator>
);
