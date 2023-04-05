import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { PolicyStackNavigationProps, PolicyStackParamList } from '../Stack';
import { Service } from './Service';
import { Terms } from './Terms';

export type TermsStackParamList = {
  Terms: undefined;
  Service: undefined;
  Privacy: undefined;
  Marketing: undefined;
};

const Stack = createNativeStackNavigator<TermsStackParamList>();

export type TermsStackNavigationProps<T extends keyof TermsStackParamList> = CompositeScreenProps<
  StackScreenProps<TermsStackParamList, T>,
  PolicyStackNavigationProps<keyof PolicyStackParamList>
>;

export const TermsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={'Terms'} component={Terms} />
    <Stack.Screen name={'Service'} component={Service} />
    {/* <Stack.Screen name={'Marketing'} component={Welcome} /> */}
  </Stack.Navigator>
);
