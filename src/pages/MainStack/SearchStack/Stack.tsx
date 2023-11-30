import React from 'react';
import { Search } from '@/pages/MainStack/SearchStack/Search';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { CompositeScreenProps, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

export type SearchStackParamList = {
  Search: {};
};

export type RootRouteProps<RouteName extends keyof SearchStackParamList> = RouteProp<SearchStackParamList, RouteName>;

export type SearchStackScreenProps = CompositeScreenProps<
  StackScreenProps<SearchStackParamList>,
  MainStackScreenProps<'SearchStack'>
>;

const Stack = createStackNavigator<SearchStackParamList>();

export const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Search'} component={Search} />
    </Stack.Navigator>
  );
};
