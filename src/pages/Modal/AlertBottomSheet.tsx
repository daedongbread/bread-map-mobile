import React from 'react';
import { Modal } from 'react-native';
import { AlertBottomSheetContainer } from '@/containers/Modal';
import { useIsFocused } from '@react-navigation/native';

export const AlertBottomSheet = () => {
  const focused = useIsFocused();

  return (
    <Modal visible={focused} animationType={'fade'} transparent statusBarTranslucent>
      <AlertBottomSheetContainer />
    </Modal>
  );
};
