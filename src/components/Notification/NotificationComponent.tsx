import React from 'react';
import { RefreshControl, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Notification } from '@/apis/notification/types';
import { Header } from '../Shared/Header';
import { ScrollView } from '../Shared/View';
import { NotificationRow } from './NotificationRow';

type Props = {
  notifications: Notification[];
  onPressRow: (notification: Notification) => void;
  onPressFollowButton: (toggle: boolean, userId: number, index: number) => void;
  onScrollEnd: () => void;
  onRefresh: () => void;
};

export const NotificationComponent = ({
  notifications,
  onPressRow,
  onPressFollowButton,
  onScrollEnd,
  onRefresh,
}: Props) => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView
      onScrollEnd={onScrollEnd}
      refreshControl={<RefreshControl progressViewOffset={top} refreshing={false} onRefresh={onRefresh} />}
    >
      <SafeAreaView>
        <Header title={'알림'} isPrevButtonShown />

        {notifications.map((notification, index) => (
          <TouchableWithoutFeedback key={notification.noticeId} onPress={() => onPressRow(notification)}>
            <NotificationRow
              notification={notification}
              onPressFollowButton={toggle => onPressFollowButton(toggle, notification.contentId, index)}
            />
          </TouchableWithoutFeedback>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};
