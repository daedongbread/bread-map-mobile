import React, { Dispatch, SetStateAction } from 'react';

import { SafeAreaView, StyleSheet } from 'react-native';
import { AlbumList } from './AlbumList';
import { ConfirmDelete } from './ConfirmDelete';
import { Header } from './Header';
import { CancelBottomSheet } from '.';

type Props = {
  onClickRight: () => void;
  curType: string;
  setCurLocationUrl: Dispatch<SetStateAction<string>>;
  curPhotoUrl: string;
  curLocationUrl: string;
  cancelBottomSheetRef: any;
  onSendDeleteClick: () => void;
  EditDoneBottomSheetRef: any;
  bakeryId: number;
  NavigationKey: string;
};

export function DeleteLocationComponent({
  onClickRight,
  curType,
  setCurLocationUrl,
  curPhotoUrl,
  curLocationUrl,
  cancelBottomSheetRef,
  onSendDeleteClick,
  EditDoneBottomSheetRef,
  bakeryId,
  NavigationKey,
}: Props) {
  return (
    <SafeAreaView style={styles.Container}>
      <Header title="장소 삭제" onClickRight={onClickRight} />
      {curType === 'Album' ? (
        <AlbumList setCurLocationUrl={setCurLocationUrl} />
      ) : (
        <ConfirmDelete
          curLocationUrl={curLocationUrl}
          curPhotoUrl={curPhotoUrl}
          onSendDeleteClick={onSendDeleteClick}
          EditDoneBottomSheetRef={EditDoneBottomSheetRef}
          bakeryId={bakeryId}
          NavigationKey={NavigationKey}
        />
      )}
      <CancelBottomSheet bottomSheetRef={cancelBottomSheetRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});
