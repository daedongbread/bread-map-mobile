import React from 'react';
import { ReviewWriteStackParamList } from '@/router/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReviewRating } from './ReviewRating';
import { ReviewSelect } from './ReviewSelect';

const Stack = createNativeStackNavigator<ReviewWriteStackParamList>();

export const ReviewWriteStack = () => (
  <Stack.Navigator initialRouteName="ReviewSelect" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ReviewSelect" component={ReviewSelect} />
    <Stack.Screen name="ReviewRating" component={ReviewRating} />
  </Stack.Navigator>
);
