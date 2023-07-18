import React from 'react';

import { StyleSheet, View } from 'react-native';

import { BakeryBottomSheetContainer, BakeryMapContainer } from '@/containers/Map';
import { useNotification } from '@/hooks/useNotification';

export const Map: React.VFC = () => {
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
    backgroundColor: '#FFFFFF',
  },
});
