import React from 'react';
import { Bookmark } from '@/pages/MainStack/Bookmark';
import { BookmarkBottomSheet } from '@/pages/MainStack/BookmarkBottomSheet';
import { MainTab, MainTabParamList } from '@/pages/MainStack/MainTab/Tab';
import { Notification } from '@/pages/MainStack/Notification';
import { Profile } from '@/pages/MainStack/ProfileStack';
import { ReportBakeryStack, ReportBakeryStackParamList } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { Search } from '@/pages/MainStack/Search';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { ReviewWriteStack, ReviewWriteStackParamList } from '../ReviewWriteStack/Stack';
import { ProfileStack, ProfileStackParamList } from './ProfileStack/Stack';

export type MainStackParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  BookmarkBottomSheet: {
    bakeryId: number;
    name: string;
  };
  ReviewWriteStack: NavigatorScreenParams<ReviewWriteStackParamList>;
  Bookmark: undefined;
  Search: undefined;
  ReportBakeryStack: NavigatorScreenParams<ReportBakeryStackParamList>;
  NotificationModal: undefined;
  ProfileModal: undefined;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> = CompositeScreenProps<
  StackScreenProps<MainStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={'MainTab'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen
        name={'BookmarkBottomSheet'}
        component={BookmarkBottomSheet}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: false }}
      />
      <Stack.Screen name={'ReviewWriteStack'} component={ReviewWriteStack} />

      <Stack.Group screenOptions={{ presentation: 'card', headerShown: true }}>
        <Stack.Screen name={'Bookmark'} component={Bookmark} />
        <Stack.Screen
          name={'Search'}
          component={Search}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen name={'ReportBakeryStack'} component={ReportBakeryStack} />
        <Stack.Screen
          options={{ headerTitle: '알림', headerTitleAlign: 'center', headerStyle: { height: 52 } }}
          name={'NotificationModal'}
          component={Notification}
        />
        <Stack.Screen name={'ProfileModal'} component={Profile} />
      </Stack.Group>
      <Stack.Screen name={'ProfileStack'} component={ProfileStack} />
    </Stack.Navigator>
  );
};

export { MainStack };
