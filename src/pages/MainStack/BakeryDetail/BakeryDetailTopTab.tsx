import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetBakery } from '@/apis/bakery';
import { Header } from '@/components/Shared/Header';
import { presets } from '@/components/Shared/Text/presets';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { theme } from '@/styles/theme';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainStackScreenProps } from '../Stack';
import { BakeryHome, BakeryInfo } from './Tab';
import { BakeryMenu } from './Tab/BakeryMenu';
import { BakeryReviewStack } from './Tab/BakeryReview/Stack';

export type BakeryDetailTabParamList = {
  BakeryDetailHome: {
    bakeryId: number;
    bakeryName: string;
  };
  BakeryDetailMenu: {
    bakeryId: number;
    bakeryName: string;
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

export const BakeryDetailTabNavigator = ({ route }: MainStackScreenProps<'BakeryDetail'>) => {
  const insets = useSafeAreaInsets();

  const { bakeryId } = route.params?.params || { bakeryId: 0, bakeryName: '' };
  const { bakery } = useGetBakery({ bakeryId });

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Header title={bakery?.bakeryInfo.name} isPrevButtonShown />
      <Tab.Navigator
        backBehavior="history"
        initialRouteName="BakeryDetailHome"
        screenOptions={{
          tabBarContentContainerStyle: {
            flex: 1,
          },
          tabBarIndicatorStyle: { backgroundColor: theme.color.primary500 },
          tabBarLabelStyle: { color: theme.color.gray900, ...presets.body2, ...presets.bold },
        }}
      >
        <Tab.Screen name="BakeryDetailHome" component={BakeryHome} options={{ title: '홈' }} />
        <Tab.Screen
          name="BakeryDetailMenu"
          component={BakeryMenu}
          options={{ title: '메뉴' }}
          initialParams={{ bakeryId, bakeryName: bakery?.bakeryInfo.name }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});
