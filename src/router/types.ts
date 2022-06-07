import { BakeryInfo, BakeryMenu, BakeryReview } from '@/utils';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackScreenProps } from '@react-navigation/stack';

// ** Main route types **
export type RootStackParamList = {
  HomeStack: undefined;
  BakeryDetail: NavigatorScreenParams<BakeryDetailTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type HomeStackParamList = {
  Home: undefined;
  BookmarkBottomSheet: BookmarkParamList;
  Bookmark: BookmarkParamList;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

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

export type BookmarkParamList = {
  bakeryId: number;
  name: string;
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
