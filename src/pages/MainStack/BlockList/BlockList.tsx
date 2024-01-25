import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { BlockListContainer } from '@/containers/BlockList/BlockListContainer';
import { BlockListHeader } from '@/pages/MainStack/BlockList/StackHeader';

export const BlockList = () => (
  <SafeAreaView style={styles.flex}>
    <BlockListHeader />
    <BlockListContainer />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
