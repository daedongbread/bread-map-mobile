import React from 'react';
import {
  Home as BakeryHome,
  Information,
  MenuList,
  MenuReviewList,
  ReviewDetail,
  ReviewList,
  ReviewReport,
} from '@/components/BakeryDetail';
import { Text } from '@/components/Shared/Text';
import { Home } from '@/pages';
import { Bookmark } from '@/pages/Bookmark';
import { BookmarkBottomSheet } from '@/pages/BookmarkBottomSheet';
import { BakeryDetailProvider } from '@/provider/BakeryDetailProvider';
import { theme } from '@/styles/theme';
import { bakeryMenu, bakeryReviews, bakeryInfo } from '@/utils';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '@react-navigation/routers';
import { createStackNavigator } from '@react-navigation/stack';
import { BakeryReviewStackParamList } from './types';
import { RootStackParamList, BakeryMenuStackParamList } from '.';

const MenuStack = createNativeStackNavigator<BakeryMenuStackParamList>();
const ReviewStack = createNativeStackNavigator<BakeryReviewStackParamList>();

const BakeryMenuStack = () => (
  <MenuStack.Navigator initialRouteName="BakeryMenus">
    <MenuStack.Screen name="BakeryMenus" options={{ headerShown: false }} component={MenuList} />
    <MenuStack.Screen name="BakeryMenuReviews" options={{ headerShown: false }} component={MenuReviewList} />
  </MenuStack.Navigator>
);

const BakeryReviewStack = () => (
  <ReviewStack.Navigator initialRouteName="BakeryReviews">
    <ReviewStack.Screen name="BakeryReviews" options={{ headerShown: false }} component={ReviewList} />
    <ReviewStack.Screen name="BakeryReviewDetail" options={{ headerShown: false }} component={ReviewDetail} />
    <ReviewStack.Screen name="BakeryReport" options={{ headerShown: false }} component={ReviewReport} />
  </ReviewStack.Navigator>
);

const Tab = createMaterialTopTabNavigator();

// TODO: 홈 화면에서 탭바 위치가 변경되는 부분 구현 필요, getHeaderTitle 방식 생각해보기
const BakeryDetailTabNavigator = () => (
  <BakeryDetailProvider>
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarStyle: {
          marginHorizontal: 20,
          elevation: 0,
          shadowOffset: { width: 0, height: 0 },
        },
        tabBarIndicatorStyle: { backgroundColor: theme.color.primary500 },
        tabBarLabelStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="BakeryDetailHome" component={BakeryHome} options={{ title: '홈' }} />
      <Tab.Screen name="BakeryDetailMenu" component={BakeryMenuStack} options={{ title: '메뉴' }} />
      <Tab.Screen name="BakeryDetailReview" component={BakeryReviewStack} options={{ title: '리뷰' }} />
      <Tab.Screen name="bakeryDetailInfo" component={Information} options={{ title: '정보' }} />
    </Tab.Navigator>
  </BakeryDetailProvider>
);

const RootStack = createNativeStackNavigator<RootStackParamList>();

const bakeryData = { bakeryMenu, bakeryReviews, bakeryInfo };

const getHeaderTitle = (route: Partial<Route<string>>) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Header title';

  switch (routeName) {
    case 'BakeryDetailHome':
    default:
      return bakeryData.bakeryInfo.bakeryName;
  }
};

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="BookmarkBottomSheet"
        component={BookmarkBottomSheet}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          presentation: 'card',
          headerTitle: () => <Text presets={['subtitle2', 'bold']}>새 리스트</Text>,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => (
  <NavigationContainer theme={navigationTheme}>
    <RootStack.Navigator initialRouteName="HomeStack">
      <RootStack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <RootStack.Screen
        name="BakeryDetail"
        component={BakeryDetailTabNavigator}
        options={({ route }) => ({ headerTitle: getHeaderTitle(route) })}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export { Navigation };

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};
