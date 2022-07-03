import React from 'react';
import { Home } from '@/pages';
import { Bookmark } from '@/pages/Bookmark';
import { BookmarkBottomSheet } from '@/pages/BookmarkBottomSheet';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from '@shared/Text';

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

export { HomeStack };
