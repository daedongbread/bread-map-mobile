import React from 'react';
import { CompositeScreenProps, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { MainStackScreenProps } from '../Stack';
import { Camera } from './Camera';
import { DeleteLocation } from './DeleteLocation';
import { EditBakery } from './EditBakery';
import { EditDetail } from './EditDetail';

export type EditBakeryStackParamList = {
  EditBakery: {
    bakeryId: number;
  };
  EditDetail: {
    bakeryId: number;
  };
  Camera: undefined;
  DeleteLocation: {
    type: 'Album' | 'Confirm';
    url?: string;
  };
};

export type RootRouteProps<RouteName extends keyof EditBakeryStackParamList> = RouteProp<
  EditBakeryStackParamList,
  RouteName
>;

export type EditBakeryStackScreenProps = CompositeScreenProps<
  StackScreenProps<EditBakeryStackParamList>,
  MainStackScreenProps<'EditBakeryStack'>
>;

const Stack = createStackNavigator<EditBakeryStackParamList>();

export const EditBakeryStack = () => {
  return (
    <Stack.Navigator initialRouteName="EditBakery" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'EditBakery'} component={EditBakery} />
      <Stack.Screen name={'EditDetail'} component={EditDetail} />
      <Stack.Screen name={'DeleteLocation'} component={DeleteLocation} />
      <Stack.Screen name={'Camera'} component={Camera} />
    </Stack.Navigator>
  );
};
