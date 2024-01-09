import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Notification } from '@/apis/notification/types';
import { theme } from '@/styles/theme';
import { convertToRecentFormat } from '@/utils/date/convertToRecentFormat';
import { FollowButton } from '../Shared/Reviews/FollowButton';
import { SplitColumn, SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';
import { Row } from '../Shared/View';

type Props = {
  notification: Notification;
};

export const NotificationRow = ({ notification }: Props) => {
  const splitContent = notification.content ? notification.content.split('%s') : [];

  return (
    <Row style={styles.container}>
      <Image style={styles.icon} source={{ uri: notification.image }} />

      <SplitColumn width={8} />

      <Row style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <Text
            color={theme.color.gray900}
            presets={notification.noticeType === 'FOLLOW' ? ['body2', 'bold'] : ['body2', 'semibold']}
          >
            {notification.title}
          </Text>

          <SplitRow height={2} />

          <Text color={theme.color.gray900} presets={['body2', 'medium']}>
            {splitContent.length > 1 ? (
              <>
                {splitContent[0]}
                <Text color={theme.color.gray900} presets={['body2', 'bold']}>
                  {notification.contentParam}
                </Text>
                {splitContent[1]}
              </>
            ) : (
              notification.content
            )}
          </Text>

          <SplitRow height={6} />

          <Text color={theme.color.gray400} presets={['caption2', 'semibold']}>
            {convertToRecentFormat(notification.createdAt)}
          </Text>
        </View>

        <SplitColumn width={16} />

        {notification.noticeType === 'FOLLOW' && (
          <FollowButton isFollow={notification.isFollow} targetUserId={notification.contentId} />
        )}
      </Row>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomColor: theme.color.gray100,
    borderBottomWidth: 1,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexShrink: 1,
  },
});
