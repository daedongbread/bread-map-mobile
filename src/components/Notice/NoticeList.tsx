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
  onPressFollow: (userId: number) => void;
};

export const NoticeList = ({ title, notice, hasNext, onClickMore, onPressFollow }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text presets={['subtitle2', 'bold']}>{title}</Text>
      <FlatList
        data={notice}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListFooterComponent={hasNext ? <Button onPress={onClickMore}>알림 더 보기</Button> : undefined}
        ListEmptyComponent={() => <Text>{`${title} 알림 내역이 없습니다.`}</Text>}
        renderItem={({ item }) => {
          const key = item.noticeId;

          if (item.fromUserId) {
            return (
              <FollowNotice
                key={key}
                notice={item}
                nickName={item.fromUserNickName}
                handlePressFollow={onPressFollow}
              />
            );
          }

          return <Notice key={key} notice={item} nickname={item.fromUserNickName} />;
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
  divider: {
    height: 1,
    backgroundColor: theme.color.gray200,
    marginVertical: 12,
  },
});
