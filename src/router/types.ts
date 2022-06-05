import { MenuItem } from '@/components/BakeryDetail/Menu/MenuList';
import { BakeryInfo, BakeryMenu, BakeryReview } from '@/utils';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { StackScreenProps } from '@react-navigation/stack';

// ** Main route types **
export type RootStackParamList = {
  Home: undefined;
  BakeryDetail: NavigatorScreenParams<BakeryDetailTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

// ** BakeryDetail tab (base) route types **
export type Bakery = {
  bakeryMenu: BakeryMenu[];
  bakeryReviews: BakeryReview[];
  bakeryInfo: BakeryInfo;
};

export type BakeryDetailTabParamList = {
  BakeryDetailHome: Bakery;
  BakeryDetailMenu: NavigatorScreenParams<BakeryMenuStackParamList>;
  BakeryDetailReview: NavigatorScreenParams<BakeryReviewStackParamList>;
  BakeryDetailInfo: Bakery['bakeryInfo'];
};

export type BakeryDetailTabScreenProps<T extends keyof BakeryDetailTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<BakeryDetailTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type BakeryDetailTabNavigationProps = NativeStackNavigationProp<BakeryDetailTabParamList>;

// ** BakeryDetail tab (menu) route types **
export type BakeryMenuStackParamList = {
  BakeryMenus: Bakery; // 단일 값으로 할지 고민
  BakeryMenuReviews: {
    info: BakeryInfo;
    menu: MenuItem;
    reviews: BakeryReview[];
  };
};

export type BakeryMenuStackNavigationProps = NativeStackNavigationProp<BakeryMenuStackParamList>;

// ** BakeryDetail tab (review) route types **
export type BakeryReviewStackParamList = {
  BakeryReviews: Bakery;
  BakeryReviewDetail: {
    info: BakeryInfo;
    review: BakeryReview;
  };
  BakeryReport: Bakery;
};

export type BakeryReviewStackNavigationProps = NativeStackNavigationProp<BakeryReviewStackParamList>;

// ** Golobal **
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
