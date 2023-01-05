import React from 'react';
import { BlockList } from '@/pages/MainStack/BlockList';
import { Bookmark } from '@/pages/MainStack/Bookmark';
import { BookmarkBottomSheet } from '@/pages/MainStack/BookmarkBottomSheet';
import { DeleteAccount } from '@/pages/MainStack/DeleteAccount';
import { MainTab, MainTabParamList } from '@/pages/MainStack/MainTab/Tab';
import { Notification } from '@/pages/MainStack/Notification';
import { Profile } from '@/pages/MainStack/ProfileStack';
import { ReportBakeryStack, ReportBakeryStackParamList } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { Search } from '@/pages/MainStack/Search';
import { Setting } from '@/pages/MainStack/Setting';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import IcX24 from '@shared/Icons/IcX24.svg';
import { ReviewWriteStack, ReviewWriteStackParamList } from '../ReviewWriteStack/Stack';
import { EditBakeryStack, EditBakeryStackParamList } from './EditBakeryStack/Stack';
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
  SettingModal: undefined;
  BlockListModal?: {
    blockUserId?: number;
  };
  DeleteAccountModal: undefined;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  EditBakeryStack: NavigatorScreenParams<EditBakeryStackParamList>;
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
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerStyle: {
            height: 52,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name={'ReportBakeryStack'} component={ReportBakeryStack} />
        <Stack.Screen name={'NotificationModal'} component={Notification} />
        <Stack.Screen name={'ProfileModal'} component={Profile} />
        <Stack.Screen name={'SettingModal'} component={Setting} options={{ title: '설정' }} />

        <Stack.Screen
          options={{
            headerBackImage: () => <IcX24 />,
            headerTitle: '탈퇴하기',
          }}
          name={'DeleteAccountModal'}
          component={DeleteAccount}
        />
      </Stack.Group>
      <Stack.Screen name={'ProfileStack'} component={ProfileStack} />
      <Stack.Screen name={'EditBakeryStack'} component={EditBakeryStack} />
      <Stack.Screen name={'BlockListModal'} component={BlockList} />
    </Stack.Navigator>
  );
};

export { MainStack };
