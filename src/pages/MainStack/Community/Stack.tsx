import React from 'react';
import { PostTopic } from '@/apis/community/types';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList, MainStackScreenProps } from '../Stack';
import { Community } from './Community';

export type CommunityStackParamList = {
  Community: {
    postTopic?: PostTopic;
  };
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
    <Stack.Screen name={'Community'} initialParams={{ postTopic: 'ALL' }} component={Community} />
  </Stack.Navigator>
);
