import React from 'react';

import { StyleSheet, View } from 'react-native';

import { HomeStackScreenProps } from '@/router/types';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';

export const Bookmark: React.FC<HomeStackScreenProps<'Bookmark'>> = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.bakeryId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.primary500,
  },
});
