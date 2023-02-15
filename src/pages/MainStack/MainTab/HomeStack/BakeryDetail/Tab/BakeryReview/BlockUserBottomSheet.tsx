import React from 'react';
import { Modal } from 'react-native';
import { BlockUserBottomSheetContainer } from '@/containers/BakeryDetail/BakeryMenu';
import { useIsFocused } from '@react-navigation/native';

export const BlockUserBottomSheet = () => {
  const focused = useIsFocused();

  return (
    <Modal visible={focused} animationType={'fade'} transparent statusBarTranslucent>
      <BlockUserBottomSheetContainer />
    </Modal>
  );
};
