import React, { useCallback } from 'react';
import { useFollow, useUnFollow } from '@/apis/auth/useFollow';
import { useGetNewBakeries } from '@/apis/bakery/useGetNewBakeries';
import { RankBakery } from '@/apis/bakery/useRankBakeries';
import { NewBakeryComponent } from '@/components/Home/NewBakery';
import { RootStackScreenProps } from '@/pages/Stack';
import { useNavigation } from '@react-navigation/core';

export const NewBakeryContainer = () => {
  const navigation = useNavigation<RootStackScreenProps<'MainStack'>['navigation']>();

  const { mutateAsync: followMutationAsync } = useFollow({});
  const { mutateAsync: unfollowMutation } = useUnFollow();

  const { data = [], refetch } = useGetNewBakeries();

  const onPressFollow = useCallback(
    async (userId: number) => {
      const newBakery = data?.find(v => v.pioneerId === userId);
      if (newBakery?.isFollowed) {
        await unfollowMutation({ userId });
      }

      if (newBakery?.isFollowed === false) {
        await followMutationAsync({ userId });
      }

      refetch();
    },
    [followMutationAsync, unfollowMutation, refetch, data]
  );

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
    (bakery: Pick<RankBakery, 'id' | 'name'>) => {
      navigation.navigate('MainStack', {
        screen: 'MainTab',
        params: {
          screen: 'HomeStack',
          params: {
            screen: 'Bakery',
            params: {
              screen: 'BakeryDetailHome',
              params: {
                bakeryId: bakery.id,
                bakeryName: bakery.name,
              },
            },
          },
        },
      });
    },
    [navigation]
  );

  return <NewBakeryComponent newBakery={data} />;
};
