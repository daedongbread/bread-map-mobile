import React from 'react';
import { Asset } from 'react-native-image-picker';
import { DeleteBakery } from '@/pages/MainStack/ReportBakeryStack/DeleteBakery';
import { ReportBakery } from '@/pages/MainStack/ReportBakeryStack/ReportBakery';
import { ReportBakeryOnboarding } from '@/pages/MainStack/ReportBakeryStack/ReportBakeryOnboarding';
import { UpdateBakery } from '@/pages/MainStack/ReportBakeryStack/UpdateBakery';
import { UpdateBakeryOnboarding } from '@/pages/MainStack/ReportBakeryStack/UpdateBakeryOnboarding';
import { RootStackParamList, RootStackScreenProps } from '@/pages/Stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { ReportPhoto } from './ReportPhoto/ReportPhoto';

export type ReportBakeryStackParamList = {
  ReportBakeryOnboard: undefined;
  ReportBakery: undefined;
  ReportPhoto: {
    bakeryId: number;
    bakeryName: string;
    photos: Asset[];
  };
  UpdateBakeryOnboarding: undefined;
  UpdateBaker: {
    bakeryId: number;
    address: string;
  };
  DeleteBakery: {
    bakeryId: number;
  };
};

export type ReportBakeryStackScreenProps<T extends keyof ReportBakeryStackParamList> = CompositeScreenProps<
  StackScreenProps<ReportBakeryStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Stack = createStackNavigator<ReportBakeryStackParamList>();

const ReportBakeryStack = () => {
  return (
    <Stack.Navigator initialRouteName={'ReportBakeryOnboard'} screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name={'ReportBakeryOnboard'} component={ReportBakeryOnboarding} />
        <Stack.Screen name={'ReportBakery'} component={ReportBakery} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={'UpdateBakeryOnboarding'} component={UpdateBakeryOnboarding} />
        <Stack.Screen name={'UpdateBaker'} component={UpdateBakery} />
        <Stack.Screen name={'DeleteBakery'} component={DeleteBakery} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={'ReportPhoto'} component={ReportPhoto} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export { ReportBakeryStack };
