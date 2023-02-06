import React from 'react';
import {
  BakeryReview,
  BakeryReviewDetail,
  BakeryReviewReport,
  BlockUserBottomSheet,
  ReviewMoreBottomSheet,
} from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BakeryDetailTabParamList, BakeryDetailTabScreenProps } from '../..';

export type BakeryReviewStackParamList = {
  BakeryReview: {
    bakeryId: number;
  };
  BakeryReviewDetail: {
    reviewId: number;
  };
  ReviewMoreBottomSheet: {
    reviewId: number;
    userId: number;
  };
  BlockUserBottomSheet: {
    userId: number;
  };
  BakeryReport: undefined;
};

const ReviewStack = createNativeStackNavigator<BakeryReviewStackParamList>();

export type BakeryReviewStackScreenProps<T extends keyof BakeryReviewStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<BakeryReviewStackParamList, T>,
  BakeryDetailTabScreenProps<keyof BakeryDetailTabParamList>
>;

export const BakeryReviewStack = ({ route }: any) => (
  <ReviewStack.Navigator initialRouteName="BakeryReview" screenOptions={{ headerShown: false }}>
    <ReviewStack.Screen
      name="BakeryReview"
      initialParams={route.params}
      options={{ headerShown: false }}
      component={BakeryReview}
    />
    <ReviewStack.Screen name="BakeryReviewDetail" component={BakeryReviewDetail} />
    <ReviewStack.Screen
      name="ReviewMoreBottomSheet"
      component={ReviewMoreBottomSheet}
      options={{
        presentation: 'transparentModal',
        animation: 'none',
      }}
    />
    <ReviewStack.Screen
      name="BlockUserBottomSheet"
      component={BlockUserBottomSheet}
      options={{ presentation: 'transparentModal', animation: 'none' }}
    />
    <ReviewStack.Screen name="BakeryReport" options={{ headerShown: false }} component={BakeryReviewReport} />
  </ReviewStack.Navigator>
);
