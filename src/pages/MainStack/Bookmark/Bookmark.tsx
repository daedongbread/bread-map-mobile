import React from 'react';

import { StyleSheet, View } from 'react-native';

import { BookmarkFormContainer } from '@/containers/Bookmark';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';

export const Bookmark: React.FC<MainStackScreenProps<'Bookmark'>> = () => {
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
