import React from 'react';
import { CompositeScreenProps, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { MainStackScreenProps } from '../Stack';
import { EditProfile } from './EditProfile';
import { FollowDetail } from './FollowDetail';
import { ListDetail } from './ListDetail';
import { Profile } from './Profile';

export type ProfileStackParamList = {
  Profile: {
    userId: number;
  };
  EditProfile: {
    userImage: string;
    nickName: string;
  };
  ListDetail: {
    flagId: number;
    name: string;
    color: string;
    isMe: boolean;
  };
  FollowDetail: {
    index: number;
    userId: number;
  };

  // UpdateBaker: {
  //   bakeryId: number;
  //   address: string;
  // };
};

export type RootRouteProps<RouteName extends keyof ProfileStackParamList> = RouteProp<ProfileStackParamList, RouteName>;

export type ProfileStackScreenProps = CompositeScreenProps<
  StackScreenProps<ProfileStackParamList>,
  MainStackScreenProps<'ProfileStack'>
>;

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="EditProfile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'EditProfile'} component={EditProfile} />
      <Stack.Screen name={'ListDetail'} component={ListDetail} />
      <Stack.Screen name={'FollowDetail'} component={FollowDetail} />
      <Stack.Screen name={'Profile'} component={Profile} />
    </Stack.Navigator>
  );
};
