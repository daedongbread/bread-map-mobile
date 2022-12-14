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
  nickName: string;
  handlePressFollow: (userId: number) => void;
}

export const FollowNotice = ({ notice, nickName, handlePressFollow }: Props) => {
  const onPressFollow = () => {
    if (!notice.fromUserId) {
      console.error('from user id 값이 정상적으로 넘어오지 않음');
      return;
    }

    handlePressFollow(notice.fromUserId);
  };

  return (
    <NoticeWrapper key={notice.contentId}>
      <NoticeAvatar image={notice.image} />
      <NoticeText title={notice.title} createdAt={notice.createdAt} nickname={nickName} />
      <View>
        <Button
          size={'tiny'}
          borderRadius={4}
          appearance={'secondary'}
          style={styles.followButton}
          onPress={onPressFollow}
        >
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
