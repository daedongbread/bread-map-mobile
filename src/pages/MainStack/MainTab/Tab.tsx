import React from 'react';
import { HomeStack, HomeStackParamList } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { Notification } from '@/pages/MainStack/MainTab/Notification';
import { Profile } from '@/pages/MainStack/MainTab/ProfileStack';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

import HomeActiveIcon from '@shared/Icons/HomeActiveIcon.svg';
import HomeIcon from '@shared/Icons/HomeIcon.svg';
import MapActiveIcon from '@shared/Icons/MapActiveIcon.svg';
import MapIcon from '@shared/Icons/MapIcon.svg';
import NotificationActiveIcon from '@shared/Icons/NotificationActiveIcon.svg';
import NotificationIcon from '@shared/Icons/NotificationIcon.svg';
import ProfileActiveIcon from '@shared/Icons/ProfileActiveIcon.svg';
import ProfileIcon from '@shared/Icons/ProfileIcon.svg';
import { Map } from './Map';
import { ProfileStackParamList } from './ProfileStack/Stack';

export type MainTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Map: undefined;
  Notification: undefined;
  Profile: ProfileStackParamList['Profile'];
};

export type MainTabNavigation<T extends keyof MainTabParamList> = CompositeScreenProps<
  RootStackScreenProps<keyof RootStackParamList>,
  BottomTabScreenProps<MainTabParamList, T>
>;

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={'HomeStack'}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <HomeActiveIcon /> : <HomeIcon />),
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name={'Map'}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <MapActiveIcon /> : <MapIcon />),
        }}
        component={Map}
      />
      <Tab.Screen
        name={'Notification'}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <NotificationActiveIcon /> : <NotificationIcon />),
        }}
        component={Notification}
      />
      <Tab.Screen
        name={'Profile'}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <ProfileActiveIcon /> : <ProfileIcon />),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export { MainTab };
