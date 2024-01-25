import React from 'react';
import { PostTopic } from '@/apis/community/types';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList, MainStackScreenProps } from '../../Stack';
import { PostWrite } from './PostWrite';

export type PostWriteStackParamList = {
  PostWrite: {
    postId?: number;
    postTopic: PostTopic;
  };
};

export type PostWriteStackNavigationProps<T extends keyof PostWriteStackParamList> = CompositeScreenProps<
  StackScreenProps<PostWriteStackParamList, T>,
  MainStackScreenProps<keyof MainStackParamList>
>;

const Stack = createStackNavigator<PostWriteStackParamList>();

export const PostWriteStack = () => (
  <Stack.Navigator initialRouteName="PostWrite" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PostWrite" component={PostWrite} />
  </Stack.Navigator>
);
