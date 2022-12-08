import React, { Dispatch, SetStateAction } from 'react';

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
};

export function DeleteLocationComponent({
  onClickRight,
  curType,
  setCurLocationUrl,
  curPhotoUrl,
  curLocationUrl,
  cancelBottomSheetRef,
}: Props) {
  return (
    <>
      <Header title="장소 삭제" onClickRight={onClickRight} />
      {curType === 'Album' ? (
        <AlbumList setCurLocationUrl={setCurLocationUrl} />
      ) : (
        <ConfirmDelete curLocationUrl={curLocationUrl} curPhotoUrl={curPhotoUrl} />
      )}
      <CancelBottomSheet bottomSheetRef={cancelBottomSheetRef} />
    </>
  );
}
