import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { PolicyStackNavigationProps, PolicyStackParamList } from '../Stack';
import { Marketing } from './Marketing';
import { Privacy } from './Privacy';
import { Service } from './Service';
import { Terms } from './Terms';

export type TermsStackParamList = {
  Terms: undefined;
  Service: {
    onClickAgree: (value: boolean) => void;
  };
  Privacy: {
    onClickAgree: (value: boolean) => void;
  };
  Marketing: {
    onClickAgree: (value: boolean) => void;
  };
};

const Stack = createStackNavigator<TermsStackParamList>();

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
    <Stack.Screen name={'Privacy'} component={Privacy} />
    <Stack.Screen name={'Marketing'} component={Marketing} />
  </Stack.Navigator>
);
