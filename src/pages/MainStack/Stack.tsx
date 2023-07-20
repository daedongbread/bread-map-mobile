import React from 'react';
import { BookmarkList } from '@/components/Map/BakeryBookmarksBottomSheet';
import { SuccessBottomSheet } from '@/components/Modal/BottomSheet';
import { BlockList } from '@/pages/MainStack/BlockList';
import { Bookmark } from '@/pages/MainStack/Bookmark';
import { BookmarkBottomSheet } from '@/pages/MainStack/BookmarkBottomSheet';
import { DeleteAccount } from '@/pages/MainStack/DeleteAccount';
import { MainTab, MainTabParamList } from '@/pages/MainStack/MainTab/Tab';
import { ReportBakeryStack, ReportBakeryStackParamList } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { Search } from '@/pages/MainStack/Search';
import { Setting } from '@/pages/MainStack/Setting';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { ModalStack, ModalStackParamList } from '../Modal/Stack';
import { QuestionBottomSheet } from '../ReviewWriteStack/ReviewRating/QuestionBottomSheet';
import { ReviewWriteStack, ReviewWriteStackParamList } from '../ReviewWriteStack/Stack';
import { CommentMenuBottomSheet, Community } from './Community';
import { EditBakeryStack, EditBakeryStackParamList } from './EditBakeryStack/Stack';
import { ReportMenu } from './MainTab/HomeStack/BakeryDetail/Tab/BakeryMenu/ReportMenu';
import { BlockUserBottomSheet, ReviewMoreBottomSheet } from './MainTab/HomeStack/BakeryDetail/Tab/BakeryReview';
import {
  BakeryReviewDetailParamList,
  BakeryReviewDetailStack,
} from './MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/BakeryReviewDetail/Stack';
import { ProfileStack, ProfileStackParamList } from './MainTab/ProfileStack/Stack';

export type MainStackParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  Community: undefined;
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
  CommentMenuBottomSheet: {
    commentId: number;
    type: number;
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
    leftButtonText?: string;
    rightButtonText?: string;
    onPressLeftButton?: () => void;
    onPressRightButton?: () => void;
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
    <Stack.Navigator initialRouteName="MainTab" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name={'ReviewWriteStack'} component={ReviewWriteStack} />
      <Stack.Screen name="BakeryReviewDetailStack" component={BakeryReviewDetailStack} />
      <Stack.Screen
        name={'ModalStack'}
        options={{ presentation: 'transparentModal', gestureEnabled: false }}
        component={ModalStack}
      />

      <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
        <Stack.Screen name={'BookmarkBottomSheet'} component={BookmarkBottomSheet} />
        <Stack.Screen name="ReviewMoreBottomSheet" component={ReviewMoreBottomSheet} />
        <Stack.Screen name="BlockUserBottomSheet" component={BlockUserBottomSheet} />
        <Stack.Screen name="SuccessBottomSheet" component={SuccessBottomSheet} />
        <Stack.Screen name="QuestionBottomSheet" component={QuestionBottomSheet} />
        <Stack.Screen name="CommentMenuBottomSheet" component={CommentMenuBottomSheet} />
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
        <Stack.Screen name={'SettingModal'} component={Setting} options={{ headerShown: false }} />

        <Stack.Screen name={'DeleteAccountModal'} component={DeleteAccount} options={{ headerShown: false }} />
      </Stack.Group>
      <Stack.Screen name={'ProfileStack'} component={ProfileStack} />
      <Stack.Screen name={'EditBakeryStack'} component={EditBakeryStack} />
      <Stack.Screen name={'BlockListModal'} component={BlockList} />
    </Stack.Navigator>
  );
};

export { MainStack };
