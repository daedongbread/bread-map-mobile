import React, { useCallback } from 'react';
import { useGetCurationFeedDetail } from '@/apis/feed/useGetCurationFeedDetail';
import { usePostLike } from '@/apis/feed/usePostLike';
import { CurationDetailComponent } from '@/components/Home/CurationDetail/CurationDetailComponent';
import { useAppDispatch } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { showToast } from '@/slices/toast';
import { useNavigation, useRoute } from '@react-navigation/native';

type Route = MainStackScreenProps<'CurationDetail'>['route'];

export const CurationDetailContainer = () => {
  const route = useRoute<Route>();
  const { navigate } = useNavigation<MainStackScreenProps<'CurationDetail'>['navigation']>();

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
          onSaveSuccess: (selectBookmark: BookmarkList) => {
            refetchCurationDetail();
          },
        },
      });
    },
    [navigate]
  );

  const onLikePress = async () => {
    await userLikeInfo(feedId, {
      onSettled(data, error, variables, context) {
        if (error?.response?.data?.code === 50002) {
          dispatch(
            showToast({
              text: '빵을 좋아하시는군요❤️',
              duration: 2 * 1000,
            })
          );
          return;
        }

        if (data) {
          const { likeCounts } = data;

          dispatch(
            showToast({
              text: `좋아요를 ${likeCounts}번 눌렀어요.`,
              duration: 2 * 1000,
            })
          );
        }
      },
      onSuccess: () => {
        refetchCurationDetail();
      },
    });
  };

  if (!feedDetail) {
    return null;
  }

  return <CurationDetailComponent feedDetail={feedDetail} onPressFlag={onPressFlag} onLikePress={onLikePress} />;
};
