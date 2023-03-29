import React, { useEffect, useState } from 'react';

import { LogBox } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useQueryClient } from 'react-query';
import { useGetBakery } from '@/apis/bakery';
import { useBookmarkBakery, useGetFlags } from '@/apis/flag';
import { BakeryBookmarksBottomSheet, BookmarkList } from '@/components/Home/BakeryBookmarksBottomSheet';

import { flagColorHexColors } from '@/containers/Bookmark';
import { useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CircleFlag, HeartIcon } from '@shared/Icons';

export type TabItem = 'distance' | 'popularity';

type ScreenProps = MainStackScreenProps<'BookmarkBottomSheet'>;

type Navigation = ScreenProps['navigation'];
type Route = ScreenProps['route'];

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export const BakeryBookmarkBottomSheetContainer: React.VFC = () => {
  const queryClient = useQueryClient();
  const { push, goBack } = useNavigation<Navigation>();
  const {
    params: { bakeryId, name, flagId, onSaveSuccess },
  } = useRoute<Route>();

  const [selectBookmark, setSelectBookmark] = useState<BookmarkList>();

  const { userId } = useAppSelector(selector => selector.auth);
  const { mutate, isSuccess } = useBookmarkBakery();
  const { data } = useGetFlags(userId);
  const { bakery } = useGetBakery({ bakeryId });

  const onSave = () => {
    if (selectBookmark) {
      mutate({ flagId: selectBookmark?.flagId, bakeryId: Number(bakeryId) });
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

  const list: { flagId: number; name: string; color?: string; icon: React.FC<SvgProps> }[] = [
    { flagId: 0, icon: React.Fragment, name: 'header' },
    ...(data || [])?.map((flag, index) => ({
      flagId: flag.flagInfo.id,
      name: flag.flagInfo.name,
      color: flagColorHexColors[flag.flagInfo.color],
      icon: index === 0 ? HeartIcon : CircleFlag,
    })),
  ];

  useEffect(() => {
    if (isSuccess) {
      // navigation을 통해 함수를 넘겨 받았을경우 excute
      if (onSaveSuccess && selectBookmark) {
        onSaveSuccess(selectBookmark);
      }

      if (flagId) {
        queryClient.refetchQueries(['useGetFlag', flagId]);
      }

      goBack();
    }
  }, [isSuccess, selectBookmark, onSaveSuccess, goBack, flagId, queryClient]);

  useEffect(() => {
    const flagInfo = bakery?.flagInfo;
    if (flagInfo?.flagId) {
      setSelectBookmark({
        flagId: flagInfo.flagId,
        icon: HeartIcon,
        name: '',
      });
    }
  }, [bakery?.flagInfo]);

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
