import React from 'react';
import { Modal } from 'react-native';
import { PostMenuBottomSheetContainer } from '@/containers/Community/BottomSheet/PostMenuBottomSheetContainer';
import { useIsFocused } from '@react-navigation/native';

export const PostMenuBottomSheet = () => {
  const focused = useIsFocused();

  return (
    <Modal visible={focused} animationType={'fade'} transparent statusBarTranslucent>
      <PostMenuBottomSheetContainer />
    </Modal>
  );
};
