import React from 'react';
import { Modal } from 'react-native';
import { CommentMenuBottomSheetContainer } from '@/containers/Community';
import { useIsFocused } from '@react-navigation/native';

export const CommentMenuBottomSheet = () => {
  const focused = useIsFocused();

  return (
    <Modal visible={focused} animationType={'fade'} transparent statusBarTranslucent>
      <CommentMenuBottomSheetContainer />
    </Modal>
  );
};
