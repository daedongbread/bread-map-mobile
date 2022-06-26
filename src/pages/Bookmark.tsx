import React from 'react';

import { StyleSheet, View } from 'react-native';

import { BookmarkFormContainer } from '@/containers/Bookmark';

export const Bookmark: React.VFC = () => {
  return (
    <View style={styles.container}>
      <BookmarkFormContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
