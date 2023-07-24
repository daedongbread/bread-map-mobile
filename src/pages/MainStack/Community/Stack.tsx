import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList, MainStackScreenProps } from '../Stack';
import { Community } from './Community';
import { PostDetail } from './PostDetail';
import { PostWrite } from './PostWrite';

export type CommunityStackParamList = {
  Community: undefined;
  PostWrite: undefined;
  PostDetail: undefined;
};

export type CommunityStackScreenProps<T extends keyof CommunityStackParamList> = CompositeScreenProps<
  StackScreenProps<CommunityStackParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createStackNavigator<CommunityStackParamList>();

export const CommunityStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={'Community'} component={Community} />
    <Stack.Screen name={'PostWrite'} component={PostWrite} />
    <Stack.Screen name={'PostDetail'} component={PostDetail} />
  </Stack.Navigator>
);
