import React from 'react';
import { HomeStack, HomeStackParamList } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { Notification } from '@/pages/MainStack/Notification';
import { Profile } from '@/pages/MainStack/ProfileStack';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { Header } from '@shared/Header';

import HomeActiveIcon from '@shared/Icons/HomeActiveIcon.svg';
import HomeIcon from '@shared/Icons/HomeIcon.svg';
import MapActiveIcon from '@shared/Icons/MapActiveIcon.svg';
import MapIcon from '@shared/Icons/MapIcon.svg';
import NotificationActiveIcon from '@shared/Icons/NotificationActiveIcon.svg';
import NotificationIcon from '@shared/Icons/NotificationIcon.svg';
import ProfileActiveIcon from '@shared/Icons/ProfileActiveIcon.svg';
import ProfileIcon from '@shared/Icons/ProfileIcon.svg';
import { ProfileStackParamList } from '../ProfileStack/Stack';
import { Map } from './HomeStack/Map';

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
          tabBarIcon: ({ focused }) => {
            return focused ? <HomeActiveIcon /> : <HomeIcon />;
          },
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name={'Map'}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <MapActiveIcon /> : <MapIcon />;
          },
        }}
        component={Map}
      />
      <Tab.Screen
        name={'Notification'}
        options={{
          headerShown: true,
          header: () => <Header title={'알림'} isPrevButtonShown />,
          tabBarIcon: ({ focused }) => {
            return focused ? <NotificationActiveIcon /> : <NotificationIcon />;
          },
        }}
        component={Notification}
      />
      <Tab.Screen
        name={'Profile'}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ProfileActiveIcon /> : <ProfileIcon />;
          },
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export { MainTab };
