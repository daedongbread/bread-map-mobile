import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NoticeEntry } from '@/apis/notice/types';
import { FollowNotice } from '@/components/Notice/FollowNotice';
import { Notice } from '@/components/Notice/Notice';
import { theme } from '@/styles/theme';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

type Props = {
  title: string;
  notice?: NoticeEntry[];
  hasNext: boolean;
  onClickMore: () => void;
  onPressFollow: (userId: number, isFollow: boolean) => void;
};

export const NoticeList = ({ title, notice, hasNext, onClickMore, onPressFollow }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title} presets={['subtitle2', 'bold']}>
        {title}
      </Text>
      <FlatList
        scrollEnabled={false}
        data={notice}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListFooterComponent={
          hasNext ? (
            <>
              <View style={styles.divider} />
              <Button onPress={onClickMore}>알림 더 보기</Button>
            </>
          ) : undefined
        }
        ListEmptyComponent={() => <Text>{`${title} 알림 내역이 없습니다.`}</Text>}
        renderItem={({ item }) => {
          return (
            <View style={styles.notice} key={item.noticeId}>
              {isFollowContent(item.content) ? (
                <FollowNotice
                  notice={item}
                  nickName={item.fromUserNickName}
                  handlePressFollow={onPressFollow}
                  isFollow={item.isFollow}
                />
              ) : (
                <Notice notice={item} nickname={item.fromUserNickName} />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  title: {
    color: 'black',
    marginBottom: 8,
  },
  notice: {
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: theme.color.gray200,
  },
  footer: {
    marginTop: 20,
  },
});

const isFollowContent = (content: string | null) => content === null;
