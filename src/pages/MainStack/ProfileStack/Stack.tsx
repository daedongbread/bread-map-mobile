import React from 'react';
import { Bookmark } from '@/pages/MainStack/Bookmark';
import { BookmarkBottomSheet } from '@/pages/MainStack/BookmarkBottomSheet';
import { MainTab, MainTabParamList } from '@/pages/MainStack/MainTab/Tab';
import { Notification } from '@/pages/MainStack/Notification';
import { Profile } from '@/pages/MainStack/ProfileStack/Profile';
import { ReportBakery } from '@/pages/MainStack/ReportBakeryStack';
import { Search } from '@/pages/MainStack/Search';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { Text } from '@shared/Text';

export type MainStackParamList = {
  MainTab: BottomTabScreenProps<MainTabParamList>;
  BookmarkBottomSheet: {
    bakeryId: number;
    name: string;
  };
  Bookmark: undefined;
  Search: undefined;
  ReportBakeryModal: undefined;
  NotificationModal: undefined;
  Profile: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> = CompositeScreenProps<
  StackScreenProps<MainStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Stack = createStackNavigator<MainStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={'MainTab'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen
        name="BookmarkBottomSheet"
        component={BookmarkBottomSheet}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'card', headerBackTitleVisible: false, headerShadowVisible: false }}>
        <Stack.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            headerTitle: () => <Text presets={['subtitle2', 'bold']}>새 리스트</Text>,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTitle: () => <Text presets={['subtitle2', 'bold']}>새 리스트</Text>,
          }}
        />
        <Stack.Screen name={'ReportBakeryModal'} component={ReportBakery} />
        <Stack.Screen name={'NotificationModal'} component={Notification} />
        <Stack.Screen name={'Profile'} component={Profile} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export { ProfileStack };
