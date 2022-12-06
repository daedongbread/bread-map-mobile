import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NoticeEntry } from '@/apis/notice/types';
import { NoticeAvatar } from '@/components/Notice/NoticeAvatar';
import { NoticeText } from '@/components/Notice/NoticeText';
import { NoticeWrapper } from '@/components/Notice/NoticeWrapper';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

interface Props {
  notice: NoticeEntry;
}

export const FollowNotice = ({ notice }: Props) => {
  return (
    <NoticeWrapper key={notice.contentId}>
      <NoticeAvatar image={notice.image} />
      <NoticeText title={notice.title} createdAt={notice.createdAt} />
      <View>
        <Button size={'tiny'} borderRadius={4} appearance={'secondary'} style={styles.followButton}>
          <Text presets={['bold']}>팔로우</Text>
        </Button>
      </View>
    </NoticeWrapper>
  );
};

const styles = StyleSheet.create({
  followButton: {
    marginLeft: 12,
  },
});
