import React from 'react';
import { HomeStack } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { Notification } from '@/pages/MainStack/Notification';
import { Profile } from '@/pages/MainStack/ProfileStack';
import { ReportBakery } from '@/pages/MainStack/ReportBakeryStack';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NavHome, NavNotification, NavProfile } from '@shared/Icons';
import { NavReport } from '@shared/Icons/NavReport';

export type MainTabParamList = {
  HomeStack: undefined;
  ReportBakery: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type MainTabNavigation<T extends keyof MainTabParamList> = CompositeScreenProps<
  RootStackScreenProps<keyof RootStackParamList>,
  BottomTabScreenProps<MainTabParamList, T>
>;

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tab.Screen name={'HomeStack'} options={{ tabBarIcon: NavHome }} component={HomeStack} />
      <Tab.Screen
        name={'ReportBakery'}
        options={{ tabBarIcon: NavReport }}
        component={ReportBakery}
        listeners={({ navigation: { navigate } }) => ({
          tabPress: e => {
            e.preventDefault();
            navigate('MainStack', {
              screen: 'ReportBakeryStack',
            });
          },
        })}
      />
      <Tab.Screen
        name={'Notification'}
        options={{ tabBarIcon: NavNotification }}
        component={Notification}
        listeners={({ navigation: { navigate } }) => ({
          tabPress: e => {
            e.preventDefault();
            navigate('MainStack', {
              screen: 'NotificationModal',
            });
          },
        })}
      />
      <Tab.Screen
        name={'Profile'}
        options={{ tabBarIcon: NavProfile }}
        component={Profile}
        listeners={({ navigation: { navigate } }) => ({
          tabPress: e => {
            e.preventDefault();
            navigate('MainStack', {
              screen: 'ProfileModal',
            });
          },
        })}
      />
    </Tab.Navigator>
  );
};

export { MainTab };
