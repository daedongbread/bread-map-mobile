import React, { useCallback, useEffect, useState } from 'react';
import { useGetInfiniteNotifications } from '@/apis/notification';
import { Notification } from '@/apis/notification/types';
import { NotificationComponent } from '@/components/Notification';
import { useNotificationNavigation } from '@/hooks/Navigation';
import { useFocusEffect } from '@react-navigation/native';

export const NotificationContainer = () => {
  const [lastId, setLastId] = useState(0);

  const { goNavRequestedScreen } = useNotificationNavigation();

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

  return (
    <NotificationComponent
      notifications={flatNotifications}
      onPressRow={onPressRow}
      onScrollEnd={onScrollEnd}
      onRefresh={onRefresh}
    />
  );
};
