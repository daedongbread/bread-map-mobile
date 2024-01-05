import React from 'react';
import { Modal } from 'react-native';
import { ImageItemBottomSheetContainer } from '@/containers/Modal';
import { useIsFocused } from '@react-navigation/native';

export const ImageItemBottomSheet = () => {
  const focused = useIsFocused();

  return (
    <Modal visible={focused} animationType={'fade'} transparent statusBarTranslucent>
      <ImageItemBottomSheetContainer />
    </Modal>
  );
};
