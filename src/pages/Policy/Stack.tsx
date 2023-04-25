import React from 'react';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootStackScreenProps } from '../Stack';
import { Permission } from './Permission';
import { TermsStack, TermsStackParamList } from './Terms/Stack';
import { Welcome } from './Welcome';

export type PolicyStackParamList = {
  Permission: undefined;
  TermsStack: NavigatorScreenParams<TermsStackParamList>;
  Welcome: {
    accessToken: string;
    refreshToken: string;
    userId: number;
  };
};

export type PolicyStackNavigationProps<T extends keyof PolicyStackParamList> = CompositeScreenProps<
  StackScreenProps<PolicyStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Stack = createNativeStackNavigator<PolicyStackParamList>();

export const PolicyStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={'Permission'} component={Permission} />
    <Stack.Screen name={'TermsStack'} component={TermsStack} />
    <Stack.Screen name={'Welcome'} component={Welcome} />
  </Stack.Navigator>
);
