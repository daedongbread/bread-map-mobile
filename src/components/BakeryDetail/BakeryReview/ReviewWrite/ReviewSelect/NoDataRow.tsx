import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const NoDataRow = () => {
  return (
    <View style={styles.container}>
      <Image source={require('@/components/Shared/Images/nodata.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 27,
  },
});
