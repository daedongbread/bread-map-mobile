import React from 'react';
import { SafeAreaView } from 'react-native';
import { Information, ReviewDetail, ReviewList, ReviewReport } from '@/components/BakeryDetail';
import { MenuList } from '@/components/BakeryDetail/Menu/MenuList';
import { BakeryHome } from '@/pages/MainStack/MainTab/HomeStack/Bakery/BakeryHome';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { theme } from '@/styles/theme';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

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

const BakeryDetailTabNavigator = ({ route }: any) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Tab.Navigator
        backBehavior="history"
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: theme.color.primary500 },
          tabBarLabelStyle: { fontWeight: 'bold' },
        }}
      >
        <Tab.Screen name="BakeryDetailHome" component={BakeryHome} options={{ title: '홈' }} />
        <Tab.Screen
          name="BakeryDetailMenu"
          component={MenuList}
          options={{ title: '메뉴' }}
          initialParams={{ bakeryId: route.params.params.bakeryId }}
        />
        <Tab.Screen
          name="BakeryDetailReview"
          component={BakeryReviewStack}
          options={{ title: '리뷰' }}
          initialParams={{ bakeryId: route.params.params.bakeryId }}
        />
        <Tab.Screen
          name="BakeryDetailInfo"
          component={Information}
          options={{ title: '정보' }}
          initialParams={{ bakeryId: route.params.params.bakeryId }}
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
    reviewId: number;
  };
  BakeryReport: undefined;
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
