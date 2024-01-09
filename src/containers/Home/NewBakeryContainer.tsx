import React, { useCallback } from 'react';
import { useGetNewBakeries } from '@/apis/bakery/useGetNewBakeries';
import { RankBakery } from '@/apis/bakery/useRankBakeries';
import { NewBakeryComponent } from '@/components/Home/NewBakery';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation } from '@react-navigation/core';

export const NewBakeryContainer = () => {
  const navigation = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const { data = [] } = useGetNewBakeries();

  const onPressFlag = useCallback(
    (bakery: Pick<RankBakery, 'id' | 'name'>) => {
      navigation.navigate('MainStack', {
        screen: 'BookmarkBottomSheet',
        params: {
          bakeryId: bakery.id,
          name: bakery.name,
          // onSaveSuccess: (selectBookmark: BookmarkList) => onBookmarkSuccess(selectBookmark),
        },
      });
    },
    [navigation]
  );

  const onPressBakery = useCallback(
    (bakeryId: number, bakeryName: string) => {
      navigation.navigate('BakeryDetail', {
        screen: 'BakeryDetailHome',
        params: {
          bakeryId,
          bakeryName: bakeryName,
        },
      });
    },
    [navigation]
  );

  const onPressMore = () => {
    navigation.navigate('NewBakeryDetail');
  };

  return <NewBakeryComponent newBakery={data} onPressBakery={onPressBakery} onPressMore={onPressMore} />;
};
