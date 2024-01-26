import React, { useEffect } from 'react';
import { PostTopic } from '@/apis/community/types';
import { MenuEntity } from '@/apis/menu/type';
import { BookmarkList } from '@/components/Map/BakeryBookmarksBottomSheet';
import { SuccessBottomSheet } from '@/components/Modal/BottomSheet';
import { ImageItemBttomSheetButtonType } from '@/containers/Modal/ImageItemBottomSheetContainer';
import { useNotificationNavigation } from '@/hooks/Navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { BlockList } from '@/pages/MainStack/BlockList';
import { Bookmark } from '@/pages/MainStack/Bookmark';
import { BookmarkBottomSheet } from '@/pages/MainStack/BookmarkBottomSheet';
import { DeleteAccount } from '@/pages/MainStack/DeleteAccount';
import { MainTab, MainTabParamList } from '@/pages/MainStack/MainTab/Tab';
import { ReportBakeryStack, ReportBakeryStackParamList } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { Search } from '@/pages/MainStack/Search';
import { Setting } from '@/pages/MainStack/Setting';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { clearRequestedScreenInfo } from '@/slices/notification';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { AlertBottomSheet } from '../Modal';
import { ImageItemBottomSheet } from '../Modal/ImageItemBottomSheet';
import { ModalStack, ModalStackParamList } from '../Modal/Stack';
import { QuestionBottomSheet } from '../ReviewWriteStack/ReviewRating/QuestionBottomSheet';
import { ReviewWriteStack, ReviewWriteStackParamList } from '../ReviewWriteStack/Stack';
import { BakeryDetailTabNavigator, BakeryDetailTabParamList } from './BakeryDetail';
import { BakeryMenuDetail } from './BakeryDetail/Tab';
import { ReportMenu } from './BakeryDetail/Tab/BakeryMenu/ReportMenu';
import { BlockUserBottomSheet } from './BakeryDetail/Tab/BakeryReview';
import {
  BakeryReviewDetailParamList,
  BakeryReviewDetailStack,
} from './BakeryDetail/Tab/BakeryReview/BakeryReviewDetail/Stack';
import { CommentMenuBottomSheet, CommunityStackParamList } from './Community';
import { PostWriteStack } from './Community/PostWriteStack';
import { PostWriteStackParamList } from './Community/PostWriteStack/Stack';
import { CurationDetail } from './CurationDetail';
import { EditBakeryStack, EditBakeryStackParamList } from './EditBakeryStack/Stack';
import { RankingBakeryOfTheWeek } from './MainTab/HomeStack/RankingBakeryOfTheWeek/RankingBakeryOfTheWeek';
import { Notification } from './MainTab/Notification';
import { ProfileStack, ProfileStackParamList } from './MainTab/ProfileStack/Stack';
import { NewBakeryDetail } from './NewBakeryDetail';
import { PostDetail } from './PostDetail';

export type MainStackParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  Notification: undefined;
  CurationDetail: {
    feedId: number;
  };
  NewBakeryDetail: undefined;
  RankingBakeryOfTheWeek: undefined;
  PostDetail: {
    postId: number;
    postTopic: PostTopic;
  };
  CommunityStack: NavigatorScreenParams<CommunityStackParamList>;
  BookmarkBottomSheet: {
    bakeryId: number;
    name: string;
    flagId?: number;
    onSaveSuccess?: (selectBookmark: BookmarkList) => void;
  };
  PostWriteStack: NavigatorScreenParams<PostWriteStackParamList>;
  ReviewWriteStack: NavigatorScreenParams<ReviewWriteStackParamList>;
  BakeryReviewDetailStack: NavigatorScreenParams<BakeryReviewDetailParamList>;
  BakeryDetail: NavigatorScreenParams<BakeryDetailTabParamList>;
  BakeryMenuDetail: {
    bakeryId: number;
    bakeryName: string;
    menu: MenuEntity;
  };
  ModalStack: NavigatorScreenParams<ModalStackParamList>;
  CommentMenuBottomSheet: {
    commentId: number;
    ownerId: number;
    postId: number;
  };
  BlockUserBottomSheet: {
    userId: number;
  };
  SuccessBottomSheet: {
    content: string;
    onPressConfirmButton?: () => void;
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
  ImageItemBottomSheet: {
    buttonList: ImageItemBttomSheetButtonType[];
  };
  AlertBottomSheet: {
    title: string;
    subTitle: string;
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
  const dispatch = useAppDispatch();
  const { requestedScreenInfo } = useAppSelector(selctor => selctor.notification);
  const { goNavRequestedScreen } = useNotificationNavigation();

  // 요청된 화면이 있는지 체크하고, 있다면 navigate
  useEffect(() => {
    if (!requestedScreenInfo) {
      return;
    }

    goNavRequestedScreen(requestedScreenInfo);

    dispatch(clearRequestedScreenInfo());
  }, [dispatch, goNavRequestedScreen, requestedScreenInfo]);

  return (
    <Stack.Navigator initialRouteName="MainTab" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="CurationDetail" component={CurationDetail} />
      <Stack.Screen name="NewBakeryDetail" component={NewBakeryDetail} />
      <Stack.Screen name="RankingBakeryOfTheWeek" component={RankingBakeryOfTheWeek} />

      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="PostWriteStack" component={PostWriteStack} />
      <Stack.Screen name="ReviewWriteStack" component={ReviewWriteStack} />
      <Stack.Screen name="BakeryReviewDetailStack" component={BakeryReviewDetailStack} />
      <Stack.Screen
        name={'ModalStack'}
        options={{ presentation: 'transparentModal', gestureEnabled: false }}
        component={ModalStack}
      />
      <Stack.Screen name="BakeryDetail" component={BakeryDetailTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BakeryMenuDetail" component={BakeryMenuDetail} options={{ headerShown: false }} />

      <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
        <Stack.Screen name="BookmarkBottomSheet" component={BookmarkBottomSheet} />
        <Stack.Screen name="BlockUserBottomSheet" component={BlockUserBottomSheet} />
        <Stack.Screen name="SuccessBottomSheet" component={SuccessBottomSheet} />
        <Stack.Screen name="QuestionBottomSheet" component={QuestionBottomSheet} />
        <Stack.Screen name="CommentMenuBottomSheet" component={CommentMenuBottomSheet} />

        <Stack.Screen name="ImageItemBottomSheet" component={ImageItemBottomSheet} />
        <Stack.Screen name="AlertBottomSheet" component={AlertBottomSheet} />
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
