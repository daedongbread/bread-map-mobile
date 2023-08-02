import React, { useCallback } from 'react';
import { useGetCurationFeedDetail } from '@/apis/feed/useGetCurationFeedDetail';
import { usePostLike } from '@/apis/feed/usePostLike';
import { CurationDetailComponent } from '@/components/Home/CurationDetail/CurationDetailComponent';
import { useAppDispatch } from '@/hooks/redux';
import { HomeStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/Stack';
import { showToast } from '@/slices/toast';
import { useNavigation, useRoute } from '@react-navigation/native';

type Route = HomeStackScreenProps<'CurationDetail'>['route'];

export const CurationDetailContainer = () => {
  const route = useRoute<Route>();
  const { navigate } = useNavigation<HomeStackScreenProps<'CurationDetail'>['navigation']>();

  const { feedId } = route.params;
  const { feedDetail, refetch: refetchCurationDetail } = useGetCurationFeedDetail(feedId);
  const { mutateAsync: userLikeInfo } = usePostLike();
  const dispatch = useAppDispatch();

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

  const onLikePress = async () => {
    await userLikeInfo(feedId, {
      onSuccess: () => {
        refetchCurationDetail();

        dispatch(
          showToast({
            text: '해당 피드에 좋아요를 눌렀어요.',
            duration: 2 * 1000,
          })
        );
      },
    });
  };

  if (!feedDetail) {
    return null;
  }

  return <CurationDetailComponent feedDetail={feedDetail} onPressFlag={onPressFlag} onLikePress={onLikePress} />;
};
