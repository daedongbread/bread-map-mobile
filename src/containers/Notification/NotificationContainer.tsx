import React, { useCallback, useEffect, useState } from 'react';
import { useFollow, useUnFollow } from '@/apis/auth/useFollow';
import { useGetInfiniteNotifications } from '@/apis/notification';
import { NotificationType } from '@/apis/notification/types';
import { NotificationComponent } from '@/components/Notification';
import { MainTabNavigation } from '@/pages/MainStack/MainTab/Tab';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

type Navigation = MainTabNavigation<'Notification'>['navigation'];

const NUMBER_OF_ELEMENTS = 20;

export const NotificationContainer = () => {
  const navigation = useNavigation<Navigation>();

  const [lastId, setLastId] = useState(0);

  const { mutateAsync: follow } = useFollow({});
  const { mutateAsync: unFollow } = useUnFollow();

  const {
    notifications = [],
    hasNextPage,
    remove,
    refetch,
    fetchNextPage,
  } = useGetInfiniteNotifications({
    lastId,
  });
  const flatNotifications = notifications && notifications.map(notification => notification.contents).flat();

  useFocusEffect(
    useCallback(() => {
      resetPaging();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  useEffect(() => {
    if (notifications.length > 0 && notifications[0].numberOfElements > 0) {
      const _flatNotifications = notifications && notifications.map(notification => notification.contents).flat();
      const _lastId = _flatNotifications[_flatNotifications.length - 1].noticeId;

      setLastId(_lastId);
    }
  }, [notifications]);

  const onScrollEnd = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const resetPaging = useCallback(() => {
    remove();
    refetch();
  }, [refetch, remove]);

  const onRefresh = useCallback(() => {
    resetPaging();
  }, [resetPaging]);

  const onPressRow = (noticeType: NotificationType, contentId: number) => {
    switch (noticeType) {
      case 'FOLLOW':
        goUserProfilePage(contentId);
        break;
      case 'REVIEW_COMMENT':
      case 'RECOMMENT':
      case 'COMMENT_LIKE':
        // 해당 댓글로 이동
        goReviewComment(contentId);
        break;
      case 'REVIEW_LIKE':
        // 해당 리뷰로 이동
        goReviewPage(contentId);
        break;
      case 'REPORT_BAKERY_ADDED':
        // 해당 빵집 이동
        // goBakeryPage(contentId);
        break;
      case 'ADD_PRODUCT':
        // 해당 빵집 - 메뉴 이동
        // goMenuPage();
        break;
      case 'CURATION':
        // 해당 큐레이션 페이지 이동
        break;
      default:
        return;
    }
  };

  const goUserProfilePage = (userId: number) => {
    navigation.navigate('MainStack', {
      screen: 'ProfileStack',
      params: {
        screen: 'Profile',
        params: {
          userId,
        },
      },
    });
  };

  const goReviewComment = (reviewId: number) => {
    goReviewPage(reviewId);
  };

  const goReviewPage = (reviewId: number) => {
    navigation.navigate('MainStack', {
      screen: 'BakeryReviewDetailStack',
      params: {
        screen: 'BakeryReviewDetail',
        params: {
          reviewId,
        },
      },
    });
  };

  // const goBakeryPage = (bakeryId: number) => {
  //   navigation.navigate('HomeStack', {
  //     screen: 'Bakery',
  //     params: {
  //       screen: 'BakeryDetailHome',
  //       params: {
  //         bakeryId: bakeryId,
  //         bakeryName: '',
  //       },
  //     },
  //   });
  // };

  // const goMenuPage = (bakeryId: number, menuId: number) => {
  //   navigation.navigate('HomeStack', {
  //     screen: 'Bakery',
  //     params: {
  //       screen: 'BakeryDetailMenu',
  //       params: {
  //         bakeryId: bakeryId,
  //         bakeryName: '',
  //       },
  //     },
  //   });
  // };

  // const goCurationPage = () => {
  //   console.log('goCurationPage');
  // };

  const onPressFollowButton = async (toggle: boolean, userId: number, index: number) => {
    const pageNum = Math.floor(index / NUMBER_OF_ELEMENTS);

    if (toggle) {
      await follow({ userId });
    } else {
      await unFollow({ userId });
    }

    refetch(pageNum);
  };

  return (
    <NotificationComponent
      notifications={flatNotifications}
      onPressRow={onPressRow}
      onPressFollowButton={onPressFollowButton}
      onScrollEnd={onScrollEnd}
      onRefresh={onRefresh}
    />
  );
};
