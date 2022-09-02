import React from 'react';
import {
  Information,
  MenuList,
  MenuReviewList,
  ReviewDetail,
  ReviewList,
  ReviewReport,
} from '@/components/BakeryDetail';
import { MenuItem } from '@/components/BakeryDetail/Menu/MenuList';
import { BakeryHome } from '@/pages/MainStack/MainTab/HomeStack/Bakery/BakeryHome';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { theme } from '@/styles/theme';
import { Bakery } from '@/types/bakery';
import { BakeryInfo, BakeryReview } from '@/utils';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

export type BakeryDetailTabParamList = {
  BakeryDetailHome: {
    bakeryId: number;
  };
  BakeryDetailMenu: undefined;
  BakeryDetailReview: undefined;
  bakeryDetailInfo: undefined;
};

export type BakeryDetailTabScreenProps<T extends keyof BakeryDetailTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<BakeryDetailTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Tab = createMaterialTopTabNavigator<BakeryDetailTabParamList>();

const BakeryDetailTabNavigator = () => (
  <Tab.Navigator
    backBehavior="history"
    screenOptions={{
      tabBarStyle: {
        elevation: 0,
        shadowOffset: { width: 0, height: 0 },
      },
      tabBarIndicatorStyle: { backgroundColor: theme.color.primary500 },
      tabBarLabelStyle: { fontWeight: 'bold' },
      lazy: false,
    }}
  >
    <Tab.Screen name="BakeryDetailHome" component={BakeryHome} options={{ title: '홈' }} />
    <Tab.Screen name="BakeryDetailMenu" component={BakeryMenuStack} options={{ title: '메뉴' }} />
    <Tab.Screen name="BakeryDetailReview" component={BakeryReviewStack} options={{ title: '리뷰' }} />
    <Tab.Screen name="bakeryDetailInfo" component={Information} options={{ title: '정보' }} />
  </Tab.Navigator>
);

// ** BakeryDetail tab (menu) route types **
export type BakeryMenuStackParamList = {
  BakeryMenus: Bakery; // 단일 값으로 할지 고민
  BakeryMenuReviews: {
    info: BakeryInfo;
    menu: MenuItem;
    reviews: BakeryReview[];
  };
};

export type BakeryMenuStackNavigationProps = StackNavigationProp<BakeryMenuStackParamList>;

const MenuStack = createNativeStackNavigator<BakeryMenuStackParamList>();

const BakeryMenuStack = () => (
  <MenuStack.Navigator initialRouteName="BakeryMenus">
    <MenuStack.Screen name="BakeryMenus" options={{ headerShown: false }} component={MenuList} />
    <MenuStack.Screen name="BakeryMenuReviews" options={{ headerShown: false }} component={MenuReviewList} />
  </MenuStack.Navigator>
);

export type BakeryReviewStackParamList = {
  BakeryReviews: Bakery;
  BakeryReviewDetail: {
    info: BakeryInfo;
    review: BakeryReview;
  };
  BakeryReport: Bakery;
};

export type BakeryReviewStackNavigationProps = StackNavigationProp<BakeryReviewStackParamList>;

const ReviewStack = createNativeStackNavigator<BakeryReviewStackParamList>();

const BakeryReviewStack = () => (
  <ReviewStack.Navigator initialRouteName="BakeryReviews">
    <ReviewStack.Screen name="BakeryReviews" options={{ headerShown: false }} component={ReviewList} />
    <ReviewStack.Screen name="BakeryReviewDetail" options={{ headerShown: false }} component={ReviewDetail} />
    <ReviewStack.Screen name="BakeryReport" options={{ headerShown: false }} component={ReviewReport} />
  </ReviewStack.Navigator>
);

export { BakeryDetailTabNavigator };
