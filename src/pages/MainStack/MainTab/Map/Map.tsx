import React from 'react';

import { StyleSheet, View } from 'react-native';

import { BakeryBottomSheetContainer, BakeryMapContainer } from '@/containers/Map';

export const Map: React.VFC = () => {
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
