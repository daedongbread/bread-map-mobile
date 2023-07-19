import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { AccuseComment } from '../MainStack/Community';
import { AccuseReview } from '../MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview';
import { MainStackParamList, MainStackScreenProps } from '../MainStack/Stack';

export type ModalStackParamList = {
  AccuseReview: {
    reviewId: number;
  };
  AccuseComment: {
    commentId: number;
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
