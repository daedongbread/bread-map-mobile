import React from 'react';
import { SafeAreaView } from 'react-native';
import { BakeryReviewEntity, BakerySingleEntity } from '@/apis/bakery/types';
import { Information, ReviewDetail, ReviewList, ReviewReport } from '@/components/BakeryDetail';
import { MenuList } from '@/components/BakeryDetail/Menu/MenuList';
import { Header } from '@/components/Shared/Header';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { theme } from '@/styles/theme';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackScreenProps } from '../Stack';
import { BakeryHome } from './BakeryHome';

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
  const { bakeryId } = route.params?.params || { bakeryId: 0 };
  const bakery = useBakeryDetail(bakeryId);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header title={bakery.bakery?.info.name || ''} isPrevButtonShown />
      <Tab.Navigator
        backBehavior="history"
        screenOptions={{
          tabBarContentContainerStyle: {
            flex: 1,
            height: '100%',
          },
          tabBarIndicatorStyle: { backgroundColor: theme.color.primary500 },
          tabBarLabelStyle: { fontWeight: 'bold' },
        }}
      >
        <Tab.Screen name="BakeryDetailHome" component={BakeryHome} options={{ title: '홈' }} />
        <Tab.Screen
          name="BakeryDetailMenu"
          component={MenuList}
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
          component={Information}
          options={{ title: '정보' }}
          initialParams={{ bakeryId }}
        />
      </Tab.Navigator>
    </SafeAreaView>
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

export type BakeryReviewStackNavigationProps = StackNavigationProp<BakeryReviewStackParamList>;

const ReviewStack = createNativeStackNavigator<BakeryReviewStackParamList>();

const BakeryReviewStack = ({ route }: any) => (
  <ReviewStack.Navigator initialRouteName="BakeryReviews">
    <ReviewStack.Screen
      name="BakeryReviews"
      initialParams={route.params}
      options={{ headerShown: false }}
      component={ReviewList}
    />
    <ReviewStack.Screen name="BakeryReviewDetail" options={{ headerShown: false }} component={ReviewDetail} />
    <ReviewStack.Screen name="BakeryReport" options={{ headerShown: false }} component={ReviewReport} />
  </ReviewStack.Navigator>
);

export { BakeryDetailTabNavigator };
