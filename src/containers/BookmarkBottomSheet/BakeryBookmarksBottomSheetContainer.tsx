import React, { useEffect, useState } from 'react';

import { useQueryClient } from 'react-query';
import { useBookmarkBakery, useGetFlags } from '@/apis/flag';
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
  const queryClient = useQueryClient();
  const { push, goBack } = useNavigation<Navigation>();
  const {
    params: { bakeryId, name, flagId },
  } = useRoute<Route>();

  const [selectBookmark, setSelectBookmark] = useState<number>();

  const { mutate, isSuccess } = useBookmarkBakery({ flagId: selectBookmark });
  const { data } = useGetFlags();

  const onSave = () => {
    mutate({ bakeryId: Number(bakeryId) });
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
      if (flagId) {
        queryClient.refetchQueries(['useGetFlag', flagId]);
      }
      goBack();
    }
  }, [isSuccess, goBack, flagId, queryClient]);

  return (
    <BakeryBookmarksBottomSheet
      list={list}
      bakery={{ id: bakeryId, name }}
      onPressNewBookmark={onPressNewBookmark}
      onClose={onClose}
      selectBookmarkId={selectBookmark}
      onClick={setSelectBookmark}
      onSave={onSave}
    />
  );
};
