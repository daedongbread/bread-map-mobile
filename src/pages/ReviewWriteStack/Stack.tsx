import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList, MainStackScreenProps } from '../MainStack/Stack';
import { ReviewRating } from './ReviewRating';
import { ReviewSelect } from './ReviewSelect';

export type ReviewWriteStackParamList = {
  ReviewSelect: {
    bakeryId: number;
  };
  ReviewRating: {
    bakeryId: number;
  };
};

export type ReviewWriteStackNavigationProps<T extends keyof ReviewWriteStackParamList> = CompositeScreenProps<
  StackScreenProps<ReviewWriteStackParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createNativeStackNavigator<ReviewWriteStackParamList>();

export const ReviewWriteStack = () => (
  <Stack.Navigator initialRouteName="ReviewSelect" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ReviewSelect" component={ReviewSelect} />
    <Stack.Screen name="ReviewRating" component={ReviewRating} />
  </Stack.Navigator>
);
