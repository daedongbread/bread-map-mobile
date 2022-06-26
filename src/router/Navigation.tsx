import React from 'react';
import { HomeSection, InfoSection, MenuSection, ReviewSection } from '@/components/BakeryDetail';
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
import { Text } from '@shared/Text';
import { RootStackParamList } from '.';

const Tab = createMaterialTopTabNavigator();

const BakeryDetailTabNavigator = () => (
  <BakeryDetailProvider>
    <Tab.Navigator
      tabBarPosition="top"
      backBehavior="history"
      screenOptions={{
        tabBarStyle: { marginHorizontal: 20, elevation: 0, shadowOffset: { width: 0, height: 0 } },
        tabBarIndicatorStyle: { backgroundColor: theme.color.primary500 },
        tabBarLabelStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="BakeryDetailHome" component={HomeSection} options={{ title: '홈' }} />
      <Tab.Screen name="BakeryDetailMenu" component={MenuSection} options={{ title: '메뉴' }} />
      <Tab.Screen name="BakeryDetailReview" component={ReviewSection} options={{ title: '리뷰' }} />
      <Tab.Screen name="bakeryDetailInfo" component={InfoSection} options={{ title: '정보' }} />
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
