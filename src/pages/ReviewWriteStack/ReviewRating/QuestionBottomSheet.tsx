import React from 'react';
import { Modal } from 'react-native';
import { QuestionBottomSheetContainer } from '@/containers/Review';
import { useIsFocused } from '@react-navigation/native';

export const QuestionBottomSheet = () => {
  const focused = useIsFocused();

  return (
    <Modal visible={focused} animationType={'fade'} transparent statusBarTranslucent>
      <QuestionBottomSheetContainer />
    </Modal>
  );
};
