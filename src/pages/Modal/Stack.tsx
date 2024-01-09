import React from 'react';
import { ReportType } from '@/apis/community/types';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { AccuseReview } from '../MainStack/BakeryDetail/Tab/BakeryReview';
import { AccuseComment } from '../MainStack/Community';
import { MainStackParamList, MainStackScreenProps } from '../MainStack/Stack';

export type ModalStackParamList = {
  AccuseReview: {
    reviewId: number;
  };
  AccuseComment: {
    type: ReportType;
    targetId: number;
  };
};

export type ModalStackScreenProps<T extends keyof ModalStackParamList> = CompositeScreenProps<
  StackScreenProps<ModalStackParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createStackNavigator<ModalStackParamList>();

export const ModalStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccuseReview" component={AccuseReview} />
    <Stack.Screen name="AccuseComment" component={AccuseComment} />
  </Stack.Navigator>
);
