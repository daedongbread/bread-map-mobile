import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BakeryReviewEntity, BakerySingleEntity } from '@/apis/bakery/types';
import { Header } from '@/components/Shared/Header';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { theme } from '@/styles/theme';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { HomeStackScreenProps } from '../Stack';
import { BakeryHome } from './Tab/BakeryHome';
import { BakeryInfo } from './Tab/BakeryInfo';
import { BakeryMenu } from './Tab/BakeryMenu';
import { BakeryReviewStack } from './Tab/BakeryReview/Stack';

export type BakeryDetailTabParamList = {
  BakeryDetailHome: {
    bakeryId: number;
  };
  BakeryDetailMenu: {
    bakeryId: number;
  };
  BakeryDetailReview: {
    bakeryId: number;
  };
  BakeryDetailInfo: {
    bakeryId: number;
  };
};

export type BakeryDetailTabScreenProps<T extends keyof BakeryDetailTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<BakeryDetailTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Tab = createMaterialTopTabNavigator<BakeryDetailTabParamList>();

const BakeryDetailTabNavigator = ({ route }: HomeStackScreenProps<'Bakery'>) => {
  const insets = useSafeAreaInsets();

  const { bakeryId } = route.params?.params || { bakeryId: 0 };
  const bakery = useBakeryDetail(bakeryId);

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        paddingTop: insets.top,
      }}
    >
      <Header title={bakery.bakery?.info.name || ''} isPrevButtonShown />
      <Tab.Navigator
        backBehavior="history"
        screenOptions={{
          tabBarContentContainerStyle: {
            flex: 1,
          },
          tabBarIndicatorStyle: { backgroundColor: theme.color.primary500 },
          tabBarLabelStyle: { fontWeight: 'bold' },
        }}
      >
        <Tab.Screen name="BakeryDetailHome" component={BakeryHome} options={{ title: '홈' }} />
        <Tab.Screen
          name="BakeryDetailMenu"
          component={BakeryMenu}
          options={{ title: '메뉴' }}
          initialParams={{ bakeryId }}
        />
        <Tab.Screen
          name="BakeryDetailReview"
          component={BakeryReviewStack}
          options={{ title: '리뷰' }}
          initialParams={{ bakeryId }}
        />
        <Tab.Screen
          name="BakeryDetailInfo"
          component={BakeryInfo}
          options={{ title: '정보' }}
          initialParams={{ bakeryId }}
        />
      </Tab.Navigator>
    </View>
  );
};

export type BakeryReviewStackParamList = {
  BakeryReviews: {
    bakeryId: number;
  };
  BakeryReviewDetail: {
    review: BakeryReviewEntity;
    info: BakerySingleEntity['info'];
  };
  BakeryReport: undefined;
};

export { BakeryDetailTabNavigator };
