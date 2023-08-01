import React, { useCallback } from 'react';
import { useGetCurationFeedDetail } from '@/apis/feed/useGetCurationFeedDetail';
import { CurationDetailComponent } from '@/components/Home/CurationDetail/CurationDetailComponent';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

type Route = HomeStackScreenProps<'CurationDetail'>['route'];

export const CurationDetailContainer = () => {
  const route = useRoute<Route>();
  const { navigate } = useNavigation<HomeStackScreenProps<'CurationDetail'>['navigation']>();

  const { feedId } = route.params;
  const { feedDetail } = useGetCurationFeedDetail(feedId);

  const onPressFlag = useCallback(
    (bakeryId: number, bakeryName: string) => {
      navigate('MainStack', {
        screen: 'BookmarkBottomSheet',
        params: {
          bakeryId,
          name: bakeryName,
        },
      });
    },
    [navigate]
  );

  if (!feedDetail) {
    return null;
  }

  return <CurationDetailComponent feedDetail={feedDetail} onPressFlag={onPressFlag} />;
};
