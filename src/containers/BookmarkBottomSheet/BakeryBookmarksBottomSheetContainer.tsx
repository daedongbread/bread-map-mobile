import React, { useEffect, useState } from 'react';

import { LogBox } from 'react-native';
import { useBookmarkBakery, useGetFlags } from '@/apis/flag';
import { BakeryBookmarksBottomSheet, BookmarkList } from '@/components/Home/BakeryBookmarksBottomSheet';

import { flagColorHexColors } from '@/containers/Bookmark';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CircleFlag, HeartIcon } from '@shared/Icons';

export type TabItem = 'distance' | 'popularity';

type ScreenProps = MainStackScreenProps<'BookmarkBottomSheet'>;

type Navigation = ScreenProps['navigation'];
type Route = ScreenProps['route'];

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export const BakeryBookmarkBottomSheetContainer: React.VFC = () => {
  const { push, goBack } = useNavigation<Navigation>();
  const {
    params: { bakeryId, name, onSaveSuccess },
  } = useRoute<Route>();

  const [selectBookmark, setSelectBookmark] = useState<BookmarkList>();

  const { mutate, isSuccess } = useBookmarkBakery({ flagId: selectBookmark?.flagId });
  const { data } = useGetFlags();

  const onSave = () => {
    if (selectBookmark) {
      mutate({ bakeryId: Number(bakeryId) });
    }
  };

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

  useEffect(() => {
    if (isSuccess) {
      // navigation을 통해 함수를 넘겨 받았을경우 excute
      if (onSaveSuccess && selectBookmark) {
        onSaveSuccess(selectBookmark);
      }

      goBack();
    }
  }, [isSuccess, selectBookmark, onSaveSuccess, goBack]);

  return (
    <BakeryBookmarksBottomSheet
      list={list}
      bakery={{ id: bakeryId, name }}
      onPressNewBookmark={onPressNewBookmark}
      onClose={onClose}
      selectBookmark={selectBookmark}
      onClick={setSelectBookmark}
      onSave={onSave}
    />
  );
};
