import React from 'react';
import { Bookmark } from '@/pages/MainStack/Bookmark';
import { BookmarkBottomSheet } from '@/pages/MainStack/BookmarkBottomSheet';
import { MainTab, MainTabParamList } from '@/pages/MainStack/MainTab/Tab';
import { Search } from '@/pages/MainStack/Search';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { Text } from '@shared/Text';

export type MainStackParamList = {
  MainTab: MainTabParamList;
  BookmarkBottomSheet: {
    bakeryId: number;
    name: string;
  };
  Bookmark: undefined;
  Search: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> = CompositeScreenProps<
  StackScreenProps<MainStackParamList, T>,
  NativeStackScreenProps<MainStackParamList>
>;

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={'MainTab'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen
        name="BookmarkBottomSheet"
        component={BookmarkBottomSheet}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: false }}
      />
      <Stack.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          presentation: 'card',
          headerTitle: () => <Text presets={['subtitle2', 'bold']}>새 리스트</Text>,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          presentation: 'card',
          headerTitle: () => <Text presets={['subtitle2', 'bold']}>새 리스트</Text>,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export { MainStack };
