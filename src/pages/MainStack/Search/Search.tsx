import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from '@shared/Text';

const Search = () => {
  return (
    <SafeAreaView style={[styles.fullScreen, styles.container]}>
      <View style={styles.fullScreen}>
        <Text>Search</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 32,
  },
  fullScreen: {
    flex: 1,
  },
});

export { Search };
