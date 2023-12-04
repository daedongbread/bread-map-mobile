import React, { useCallback, useEffect, useState } from 'react';
import { useFollow, useUnFollow } from '@/apis/auth/useFollow';
import { useGetInfiniteNotifications } from '@/apis/notification';
import { Notification } from '@/apis/notification/types';
import { NotificationComponent } from '@/components/Notification';
import { useNotificationNavigation } from '@/hooks/Navigation';
import { useFocusEffect } from '@react-navigation/native';

const NUMBER_OF_ELEMENTS = 20;

export const NotificationContainer = () => {
  const [lastId, setLastId] = useState(0);

  const { goNavRequestedScreen } = useNotificationNavigation();

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

  const onPressRow = (notification: Notification) => {
    goNavRequestedScreen({
      type: notification.noticeType,
      contentId: notification.contentId ? notification.contentId.toString() : '',
      subContentId: notification.subContentId ? notification.subContentId.toString() : '',
      extraParam: notification.extraParam,
    });
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
