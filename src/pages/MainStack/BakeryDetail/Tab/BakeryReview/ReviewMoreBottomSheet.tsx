import React from 'react';
import { Modal } from 'react-native';
import { ReviewMoreBottomSheetContainer } from '@/containers/BakeryDetail/BakeryMenu';
import { useIsFocused } from '@react-navigation/native';

export const ReviewMoreBottomSheet = () => {
  const focused = useIsFocused();

  return (
    <Modal visible={focused} animationType={'fade'} transparent statusBarTranslucent>
      <ReviewMoreBottomSheetContainer />
    </Modal>
  );
};
