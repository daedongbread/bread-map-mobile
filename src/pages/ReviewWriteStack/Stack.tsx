import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackScreenProps } from '../MainStack/Stack';
import { ReviewRating } from './ReviewRating';
import { ReviewSelect } from './ReviewSelect';

export type ReviewWriteStackParamList = {
  ReviewSelect: undefined;
  ReviewRating: undefined;
};

export type ReviewWriteStackNavigationProps = CompositeScreenProps<
  StackScreenProps<ReviewWriteStackParamList>,
  MainStackScreenProps<'ReviewWriteStack'>
>;

const Stack = createNativeStackNavigator<ReviewWriteStackParamList>();

export const ReviewWriteStack = () => (
  <Stack.Navigator initialRouteName="ReviewSelect" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ReviewSelect" component={ReviewSelect} />
    <Stack.Screen name="ReviewRating" component={ReviewRating} />
  </Stack.Navigator>
);
