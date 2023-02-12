import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
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

const Stack = createNativeStackNavigator<ModalStackParamList>();

export const ModalStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ReportReview" component={ReportReview} />
  </Stack.Navigator>
);
