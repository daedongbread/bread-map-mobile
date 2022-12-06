import React from 'react';

import { StyleSheet, View } from 'react-native';
import { BakeryBottomSheetContainer, BakeryMapContainer } from '@/containers/Home';

import { useNotification } from '@/hooks/useNotification';
import { theme } from '@/styles/theme';

export const Home: React.VFC = () => {
  useNotification();

  return (
    <View style={styles.container}>
      <BakeryMapContainer />
      <BakeryBottomSheetContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.primary500,
  },
});
