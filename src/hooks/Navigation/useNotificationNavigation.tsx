import { useCallback } from 'react';
import { PostTopic } from '@/apis/community/types';
import { RootStackScreenProps } from '@/pages/Stack';
import { RequestedScreenInfo } from '@/slices/notification';
import { useNavigation } from '@react-navigation/native';

export const useNotificationNavigation = () => {
  const navigation = useNavigation<RootStackScreenProps<'MainStack'>['navigation']>();

  const goNavRequestedScreen = useCallback((data: RequestedScreenInfo) => {
    const contentId = +data.contentId;
    const subContentId = +data.subContentId;
    const extraParam = data.extraParam;

    switch (data.type) {
      case 'FOLLOW':
        goNavProfile(contentId);
        break;
      case 'REVIEW_LIKE':
        goNavReviewDetail(contentId);
        break;
      case 'REVIEW_COMMENT':
      case 'REVIEW_RECOMMENT':
      case 'REVIEW_COMMENT_LIKE':
        goNavReviewDetail(subContentId);
        break;
      case 'COMMUNITY_LIKE':
        goNavPostDetail(extraParam, contentId);
        break;
      case 'COMMUNITY_COMMENT':
      case 'RECOMMENT':
      case 'COMMENT_LIKE':
        goNavPostDetail(extraParam, subContentId);
        break;
      case 'EVENT':
        goNavPostDetail('EVENT', contentId);
        break;
      case 'REPORT_BAKERY_ADDED':
      case 'ADD_PRODUCT':
      case 'BAKERY_ADDED':
        goNavBakeryDetail(contentId);
        break;
      case 'CURATION':
        goNavCuration(contentId);
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNavProfile = useCallback(
    (userId: number) => {
      navigation.navigate('MainStack', {
        screen: 'ProfileStack',
        params: {
          screen: 'Profile',
          params: {
            userId: userId,
          },
        },
      });
    },
    [navigation]
  );

  const goNavReviewDetail = useCallback(
    (reviewId: number) => {
      navigation.navigate('MainStack', {
        screen: 'BakeryReviewDetailStack',
        params: {
          screen: 'BakeryReviewDetail',
          params: {
            reviewId: reviewId,
          },
        },
      });
    },
    [navigation]
  );

  const goNavPostDetail = useCallback(
    (postTopic: PostTopic, postId: number) => {
      navigation.navigate('MainStack', {
        screen: 'CommunityStack',
        params: {
          screen: 'PostDetail',
          params: {
            postTopic,
            postId,
          },
        },
      });
    },
    [navigation]
  );

  const goNavBakeryDetail = useCallback(
    (bakeryId: number) => {
      navigation.navigate('MainStack', {
        screen: 'MainTab',
        params: {
          screen: 'HomeStack',
          params: {
            screen: 'Bakery',
            params: {
              screen: 'BakeryDetailHome',
              params: {
                bakeryName: '',
                bakeryId,
              },
            },
          },
        },
      });
    },
    [navigation]
  );

  const goNavCuration = useCallback(
    (feedId: number) => {
      navigation.navigate('MainStack', {
        screen: 'MainTab',
        params: {
          screen: 'HomeStack',
          params: {
            screen: 'CurationDetail',
            params: {
              feedId,
            },
          },
        },
      });
    },
    [navigation]
  );

  return {
    goNavRequestedScreen,
  };
};
