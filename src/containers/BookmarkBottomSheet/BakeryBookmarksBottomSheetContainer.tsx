import React, { useState } from 'react';

import { useGetFlags } from '@/apis/flag';
import { BakeryBookmarksBottomSheet } from '@/components/Home/BakeryBookmarksBottomSheet';

import { flagColorHexColors } from '@/containers/Bookmark';
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

  const { data } = useGetFlags();

  const onClose = () => {
    goBack();
  };

  const onPressNewBookmark = () => {
    if (bakeryId) {
      push('Bookmark');
    }
  };

  const list = [
    { flagId: 0, icon: React.Fragment, name: 'header' },
    ...(data || [])?.map((flag, index) => ({
      ...flag,
      color: flagColorHexColors[flag.color],
      icon: index === 0 ? HeartIcon : CircleFlag,
    })),
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
