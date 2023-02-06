import React from 'react';
import { Modal } from 'react-native';
import { BlockUserBottomSheetContainer } from '@/containers/BakeryDetail/BakeryMenu';

export const BlockUserBottomSheet = () => {
  return (
    <Modal animationType="fade" transparent statusBarTranslucent>
      <BlockUserBottomSheetContainer />
    </Modal>
  );
};
