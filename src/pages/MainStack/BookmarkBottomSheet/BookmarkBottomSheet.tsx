import React from 'react';

import { Modal, StyleSheet } from 'react-native';

import { BakeryBookmarkBottomSheetContainer } from '@/containers/BookmarkBottomSheet';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useIsFocused } from '@react-navigation/native';

export const BookmarkBottomSheet: React.FC<MainStackScreenProps<'BookmarkBottomSheet'>> = () => {
  const focused = useIsFocused();
  return (
    <Modal visible={focused} style={styles.container} animationType={'fade'} transparent statusBarTranslucent>
      <BakeryBookmarkBottomSheetContainer />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
});
