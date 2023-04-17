import React, { useEffect, useState } from 'react';
import { BookmarkList } from '@/components/Home/BakeryBookmarksBottomSheet';
import { SuccessBottomSheet } from '@/components/Modal/BottomSheet';
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
import { storage } from '@/utils/storage/storage';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { Header } from '@shared/Header';
import IcX24 from '@shared/Icons/IcX24.svg';
import { ModalStack, ModalStackParamList } from '../Modal/Stack';
import { PolicyStack, PolicyStackParamList } from '../Policy/Stack';
import { QuestionBottomSheet } from '../ReviewWriteStack/ReviewRating/QuestionBottomSheet';
import { ReviewWriteStack, ReviewWriteStackParamList } from '../ReviewWriteStack/Stack';
import { EditBakeryStack, EditBakeryStackParamList } from './EditBakeryStack/Stack';
import { ReportMenu } from './MainTab/HomeStack/BakeryDetail/Tab/BakeryMenu/ReportMenu';
import { BlockUserBottomSheet, ReviewMoreBottomSheet } from './MainTab/HomeStack/BakeryDetail/Tab/BakeryReview';
import {
  BakeryReviewDetailParamList,
  BakeryReviewDetailStack,
} from './MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/BakeryReviewDetail/Stack';
import { ProfileStack, ProfileStackParamList } from './ProfileStack/Stack';

export type MainStackParamList = {
  PolicyStack: NavigatorScreenParams<PolicyStackParamList>;
  MainTab: NavigatorScreenParams<MainTabParamList>;
  BookmarkBottomSheet: {
    bakeryId: number;
    name: string;
    flagId?: number;
    onSaveSuccess?: (selectBookmark: BookmarkList) => void;
  };
  ReviewWriteStack: NavigatorScreenParams<ReviewWriteStackParamList>;
  BakeryReviewDetailStack: NavigatorScreenParams<BakeryReviewDetailParamList>;
  ModalStack: NavigatorScreenParams<ModalStackParamList>;
  ReviewMoreBottomSheet: {
    reviewId: number;
    userId: number;
  };
  BlockUserBottomSheet: {
    userId: number;
  };
  SuccessBottomSheet: {
    content: string;
  };
  QuestionBottomSheet: {
    title: string;
    subTitle: string;
    onClose?: () => void;
  };
  Bookmark: {
    name?: string;
    color?: string;
    flagId?: number;
  };
  Search: undefined;
  ReportBakeryStack: NavigatorScreenParams<ReportBakeryStackParamList>;
  ReportMenu: {
    bakeryId: number;
  };
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
  const [isPermissionChecker, setIsPermissionChecker] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    console.log('render');
    const getIsPermissionChecker = async () => {
      const _isPermissionChecker = await storage.get('isPermissionChecker');

      if (_isPermissionChecker) {
        setIsPermissionChecker(JSON.parse(_isPermissionChecker));
      }

      setIsFetching(false);
    };

    getIsPermissionChecker();
  }, []);

  if (isFetching) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isPermissionChecker && <Stack.Screen name={'PolicyStack'} component={PolicyStack} />}
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name={'ReviewWriteStack'} component={ReviewWriteStack} />
      <Stack.Screen name="BakeryReviewDetailStack" component={BakeryReviewDetailStack} />

      <Stack.Screen
        name={'ModalStack'}
        options={{ presentation: 'transparentModal', gestureEnabled: false }}
        component={ModalStack}
      />

      <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal', cardOverlayEnabled: false }}>
        <Stack.Screen name={'BookmarkBottomSheet'} component={BookmarkBottomSheet} />
        <Stack.Screen name="ReviewMoreBottomSheet" component={ReviewMoreBottomSheet} />
        <Stack.Screen name="BlockUserBottomSheet" component={BlockUserBottomSheet} />
        <Stack.Screen name="SuccessBottomSheet" component={SuccessBottomSheet} />
        <Stack.Screen name="QuestionBottomSheet" component={QuestionBottomSheet} />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'card', headerShown: false }}>
        <Stack.Screen name={'Bookmark'} component={Bookmark} />
        <Stack.Screen name={'Search'} component={Search} />
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
        <Stack.Screen name={'ReportBakeryStack'} component={ReportBakeryStack} options={{ headerShown: false }} />
        <Stack.Screen name="ReportMenu" component={ReportMenu} options={{ headerShown: false }} />
        <Stack.Screen
          options={{
            header: () => <Header title={'알림'} isPrevButtonShown />,
          }}
          name={'NotificationModal'}
          component={Notification}
        />
        <Stack.Screen name={'ProfileModal'} component={Profile} />
        <Stack.Screen
          name={'SettingModal'}
          component={Setting}
          options={{
            header: () => <Header title={'설정'} isPrevButtonShown />,
          }}
        />

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
