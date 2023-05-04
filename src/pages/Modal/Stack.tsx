import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { ReportReview } from '../MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview';
import { MainStackParamList, MainStackScreenProps } from '../MainStack/Stack';

export type ModalStackParamList = {
  ReportReview: {
    reviewId: number;
  };
};

export type ModalStackScreenProps<T extends keyof ModalStackParamList> = CompositeScreenProps<
  StackScreenProps<ModalStackParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createStackNavigator<ModalStackParamList>();

export const ModalStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ReportReview" component={ReportReview} />
  </Stack.Navigator>
);
