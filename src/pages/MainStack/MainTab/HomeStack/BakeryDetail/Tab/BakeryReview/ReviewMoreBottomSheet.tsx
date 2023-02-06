import React from 'react';
import { Modal } from 'react-native';
import { ReviewMoreBottomSheetContainer } from '@/containers/BakeryDetail/BakeryMenu';

export const ReviewMoreBottomSheet = () => {
  return (
    <Modal animationType="fade" transparent statusBarTranslucent>
      <ReviewMoreBottomSheetContainer />
    </Modal>
  );
};
