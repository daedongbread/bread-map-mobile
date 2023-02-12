import React from 'react';
import { BakeryReview } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BakeryDetailTabParamList, BakeryDetailTabScreenProps } from '../..';

export type BakeryReviewStackParamList = {
  BakeryReview: {
    bakeryId: number;
  };
};

const ReviewStack = createNativeStackNavigator<BakeryReviewStackParamList>();

export type BakeryReviewStackScreenProps<T extends keyof BakeryReviewStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<BakeryReviewStackParamList, T>,
  BakeryDetailTabScreenProps<keyof BakeryDetailTabParamList>
>;

export const BakeryReviewStack = ({ route }: any) => (
  <ReviewStack.Navigator initialRouteName="BakeryReview" screenOptions={{ headerShown: false }}>
    <ReviewStack.Screen name="BakeryReview" initialParams={route.params} component={BakeryReview} />
  </ReviewStack.Navigator>
);
