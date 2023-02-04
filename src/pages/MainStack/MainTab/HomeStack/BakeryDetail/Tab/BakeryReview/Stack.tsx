import React from 'react';
import { BakeryReview, BakeryReviewReport } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { BakeryReviewStackParamList } from '../../BakeryDetailTopTab';

const ReviewStack = createNativeStackNavigator<BakeryReviewStackParamList>();

export type BakeryReviewStackNavigationProps = StackNavigationProp<BakeryReviewStackParamList>;

export const BakeryReviewStack = ({ route }: any) => (
  <ReviewStack.Navigator initialRouteName="BakeryReviews">
    <ReviewStack.Screen
      name="BakeryReviews"
      initialParams={route.params}
      options={{ headerShown: false }}
      component={BakeryReview}
    />
    <ReviewStack.Screen name="BakeryReport" options={{ headerShown: false }} component={BakeryReviewReport} />
  </ReviewStack.Navigator>
);
