import React from 'react';
import { CompositeScreenProps, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { MainStackScreenProps } from '../Stack';
import { EditProfile } from './EditProfile';
import { FollowDetail } from './FollowDetail';
import { ListDetail } from './ListDetail';

export type ProfileStackParamList = {
  EditProfile: undefined;
  ListDetail: undefined;
  FollowDetail: {
    index: number;
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
    </Stack.Navigator>
  );
};
