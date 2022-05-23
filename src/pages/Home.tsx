import React from 'react';

import { StyleSheet, View } from 'react-native';
import { BakeryBottomSheetContainer, BakeryMapContainer } from '@/containers/Home';

import { RootStackScreenProps } from '@/router';

import { theme } from '@/styles/theme';

export const Home: React.FC<RootStackScreenProps<'Home'>> = () => (
  <View style={styles.container}>
    <BakeryMapContainer />
    <BakeryBottomSheetContainer />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.primary500,
  },
});
