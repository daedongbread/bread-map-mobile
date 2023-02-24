import React from 'react';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { BakeryReviewDetail } from './BakeryReviewDetail';
import { ReviewCommentsDetail } from './ReviewCommentsDetail';

export type BakeryReviewDetailParamList = {
  BakeryReviewDetail: {
    reviewId: number;
  };
  ReviewCommentsDetail: {
    reviewId: number;
  };
};

export type BakeryReviewDetailScreenProps<T extends keyof BakeryReviewDetailParamList> = CompositeScreenProps<
  StackScreenProps<BakeryReviewDetailParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createNativeStackNavigator<BakeryReviewDetailParamList>();

export const BakeryReviewDetailStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BakeryReviewDetail" component={BakeryReviewDetail} />
    <Stack.Screen name="ReviewCommentsDetail" component={ReviewCommentsDetail} />
  </Stack.Navigator>
);
