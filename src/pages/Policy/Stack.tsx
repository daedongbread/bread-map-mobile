import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootStackScreenProps } from '../Stack';
import { Permission } from './Permission';
import { Terms } from './Terms';
import { Welcome } from './Welcome';

export type PolicyStackParamList = {
  Permission: undefined;
  Terms: undefined;
  Welcome: undefined;
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
    <Stack.Screen name={'Terms'} component={Terms} />
    <Stack.Screen name={'Welcome'} component={Welcome} />
  </Stack.Navigator>
);
