import React from 'react';
import { presets } from '@/components/Shared/Text/presets';
import { HomeStack, HomeStackParamList } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { Profile } from '@/pages/MainStack/MainTab/ProfileStack';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { theme } from '@/styles/theme';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

import CommunityActiveIcon from '@shared/Icons/CommunityActiveIcon.svg';
import CommunityIcon from '@shared/Icons/CommunityIcon.svg';
import HomeActiveIcon from '@shared/Icons/HomeActiveIcon.svg';
import HomeIcon from '@shared/Icons/HomeIcon.svg';
import MapActiveIcon from '@shared/Icons/MapActiveIcon.svg';
import MapIcon from '@shared/Icons/MapIcon.svg';
import ProfileActiveIcon from '@shared/Icons/ProfileActiveIcon.svg';
import ProfileIcon from '@shared/Icons/ProfileIcon.svg';
import { CommunityStack, CommunityStackParamList } from '../Community';
import { Map } from './Map';
import { ProfileStackParamList } from './ProfileStack/Stack';

export type MainTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Map: undefined;
  CommunityStack: NavigatorScreenParams<CommunityStackParamList>;
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
        tabBarInactiveTintColor: theme.color.gray500,
        tabBarActiveTintColor: theme.color.primary600,
        tabBarLabelStyle: {
          ...presets.caption3,
        },
      }}
    >
      <Tab.Screen
        name={'HomeStack'}
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => (focused ? <HomeActiveIcon /> : <HomeIcon />),
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name={'Map'}
        options={{
          title: '지도',
          tabBarActiveTintColor: 'red',
          tabBarIcon: ({ focused }) => (focused ? <MapActiveIcon /> : <MapIcon />),
        }}
        component={Map}
      />
      <Tab.Screen
        name={'CommunityStack'}
        options={{
          title: '커뮤니티',
          tabBarIcon: ({ focused }) => (focused ? <CommunityActiveIcon /> : <CommunityIcon />),
        }}
        component={CommunityStack}
      />
      <Tab.Screen
        name={'Profile'}
        options={{
          title: 'MY',
          tabBarIcon: ({ focused }) => (focused ? <ProfileActiveIcon /> : <ProfileIcon />),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export { MainTab };
