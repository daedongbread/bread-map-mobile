import React, { useCallback, useEffect, useState } from 'react';
import { useFollow, useUnFollow } from '@/apis/auth/useFollow';
import { useGetInfiniteNotifications } from '@/apis/notification';
import { NotificationType } from '@/apis/notification/types';
import { NotificationComponent } from '@/components/Notification';
import { MainTabNavigation } from '@/pages/MainStack/MainTab/Tab';
import { useNavigation } from '@react-navigation/native';

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
        goReviewComment();
        break;
      case 'REVIEW_LIKE':
        // 해당 리뷰로 이동
        goReviewPage();
        break;
      case 'REPORT_BAKERY_ADDED':
        // 해당 빵집 이동
        goBakeryPage();
        break;
      case 'ADD_PRODUCT':
        // 해당 빵집 - 메뉴 이동
        goMenuPage();
        break;
      case 'CURATION':
        // 해당 큐레이션 페이지 이동
        goCurationPage();
        break;
      default:
        return;
    }
  };

  const goUserProfilePage = (userId: number) => {
    console.log('go user profile page: ', userId);
    navigation.navigate('Profile', {
      userId,
    });
  };

  const goReviewComment = () => {
    console.log('goReviewComment');
  };
  const goReviewPage = () => {
    console.log('goReviewPage');
  };
  const goBakeryPage = () => {
    console.log('goBakeryPage');
  };
  const goMenuPage = () => {
    console.log('goMenuPage');
  };
  const goCurationPage = () => {
    console.log('goCurationPage');
  };

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
