import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { resizePixels } from '@/utils';
import { Button } from '../Shared/Button/Button';
import { SplitRow } from '../Shared/SplitSpace';
import { EditDoneBottomSheet } from './EditDoneBottomSheet';

export function ConfirmDelete({
  curLocationUrl,
  curPhotoUrl,
  onSendDeleteClick,
  EditDoneBottomSheetRef,
  bakeryId,
  NavigationKey,
}: any) {
  return (
    <>
      <SplitRow height={24} />
      <FastImage source={{ uri: curLocationUrl ? curLocationUrl : `file://${curPhotoUrl}` }} style={styles.Image} />
      <Button onPress={onSendDeleteClick} style={styles.Button}>
        제출하기
      </Button>
      <EditDoneBottomSheet
        bottomSheetRef={EditDoneBottomSheetRef}
        title="삭제"
        bakeryId={bakeryId}
        NavigationKey={NavigationKey}
      />
    </>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Image: {
      width: 320,
      height: 280,
      alignSelf: 'center',
    },
    Button: {
      marginTop: 'auto',
      marginBottom: 16,
      marginHorizontal: 20,
    },
  })
);
