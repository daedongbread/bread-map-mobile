import React, { useState } from 'react';

import { BakeryBookmarksBottomSheet } from '@/components/Home/BakeryBookmarksBottomSheet';

import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CircleFlag, HeartIcon } from '@shared/Icons';

export type TabItem = 'distance' | 'popularity';

type ScreenProps = MainStackScreenProps<'BookmarkBottomSheet'>;

type Navigation = ScreenProps['navigation'];
type Route = ScreenProps['route'];

export const BakeryBookmarkBottomSheetContainer: React.VFC = () => {
  const { push, goBack } = useNavigation<Navigation>();
  const {
    params: { bakeryId, name },
  } = useRoute<Route>();

  const [selectBookmark, setSelectBookmark] = useState<number>();

  const onClose = () => {
    goBack();
  };

  const onPressNewBookmark = () => {
    if (bakeryId) {
      push('Bookmark');
    }
  };

  const list = [
    { id: 0, icon: React.Fragment, text: 'header' },
    { id: 1, icon: HeartIcon, text: '가고싶어요' },
    { id: 2, icon: CircleFlag, text: '가봤어요' },
  ];

  return (
    <BakeryBookmarksBottomSheet
      list={list}
      bakery={{ id: bakeryId, name }}
      onPressNewBookmark={onPressNewBookmark}
      onClose={onClose}
      selectBookmarkId={selectBookmark}
      onClick={setSelectBookmark}
      onSave={() => {}}
    />
  );
};
