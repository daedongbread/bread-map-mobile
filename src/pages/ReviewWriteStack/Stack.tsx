import React from 'react';
import { BakeryManualWriteForm } from '@/containers/Review/BakeryManualWriteContainer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList, MainStackScreenProps } from '../MainStack/Stack';
import { BakeryManualWrite, BakeryManualWriteDetail } from './BakeryManualWrite';
import { ReviewRating } from './ReviewRating';
import { ReviewSelect } from './ReviewSelect';
import { ReviewTagSelect } from './ReviewTagSelect';

export type ReviewWriteStackParamList = {
  ReviewTagSelect: {
    bakeryId: number;
    bakeryName: string;
  };
  ReviewSelect: {
    bakeryId: number;
    bakeryName: string;
  };
  ReviewRating: {
    bakeryId: number;
    bakeryName: string;
  };
  BakeryManualWrite: undefined;
  BakeryManualWriteDetail: {
    bakeryInfoForm: BakeryManualWriteForm;
  };
};

export type ReviewWriteStackNavigationProps<T extends keyof ReviewWriteStackParamList> = CompositeScreenProps<
  StackScreenProps<ReviewWriteStackParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createStackNavigator<ReviewWriteStackParamList>();

export const ReviewWriteStack = () => (
  <Stack.Navigator initialRouteName="ReviewTagSelect" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ReviewTagSelect" component={ReviewTagSelect} />
    <Stack.Screen name="ReviewSelect" component={ReviewSelect} />
    <Stack.Screen name="ReviewRating" component={ReviewRating} />

    <Stack.Screen name="BakeryManualWrite" component={BakeryManualWrite} />
    <Stack.Screen name="BakeryManualWriteDetail" component={BakeryManualWriteDetail} />
  </Stack.Navigator>
);
