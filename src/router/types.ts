import { BakeryInfo, BakeryMenu, BakeryReview } from '@/utils';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

// ** Main route types **
export type RootStackParamList = {
  Home: undefined;
  BakeryDetail: NavigatorScreenParams<BakeryDetailTabParamList>;
  Bookmark: BookmarkStackParamList;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

// ** BakeryDetail tab route types **
export type Bakery = {
  bakeryMenu: BakeryMenu[];
  bakeryReviews: BakeryReview[];
  bakeryInfo: BakeryInfo;
};

export type BakeryDetailTabParamList = {
  BakeryDetailHome: Bakery;
  BakeryDetailMenu: Bakery['bakeryMenu'];
  BakeryDetailReview: Bakery['bakeryReviews'];
  BakeryDetailInfo: Bakery['bakeryInfo'];
};

export type BookmarkStackParamList = {
  bakeryId: number;
};

export type BakeryDetailTabScreenProps<T extends keyof BakeryDetailTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<BakeryDetailTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

// ** Global **
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
