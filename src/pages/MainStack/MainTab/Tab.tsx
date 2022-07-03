import React from 'react';
import { HomeStack } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavHome, NavNotification, NavProfile } from '@shared/Icons';
import { NavReport } from '@shared/Icons/NavReport';

export type MainTabParamList = {
  HomeStack: undefined;
  ReportBakery: undefined;
  Notification: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tab.Screen name={'HomeStack'} options={{ tabBarIcon: NavHome }} component={HomeStack} />
      <Tab.Screen name={'ReportBakery'} options={{ tabBarIcon: NavReport }} component={React.Fragment} />
      <Tab.Screen name={'Notification'} options={{ tabBarIcon: NavNotification }} component={React.Fragment} />
      <Tab.Screen name={'Profile'} options={{ tabBarIcon: NavProfile }} component={React.Fragment} />
    </Tab.Navigator>
  );
};

export { MainTab };
