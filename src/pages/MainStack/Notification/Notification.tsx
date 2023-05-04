import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { follow, unFollow } from '@/apis/profile';
import { Divider } from '@/components/BakeryDetail/Divider';
import { NoticeList } from '@/components/Notice/NoticeList';
import { useNoticePagination } from '@/hooks/useNoticePagination';
import { theme } from '@/styles/theme';

const Notification = () => {
  const todayNotice = useNoticePagination({ unit: 'today' });
  const weekNotice = useNoticePagination({ unit: 'week' });
  const beforeNotice = useNoticePagination({ unit: 'before' });

  const toggleFollow = (userId: number, isFollow: boolean) => {
    if (isFollow) {
      unFollow({
        userId,
      });
    } else {
      follow({
        userId,
      });
    }
  };

  const updateNoticeQuery = (userId: number) => {
    todayNotice.onUpdateFollow(userId);
    weekNotice.onUpdateFollow(userId);
    beforeNotice.onUpdateFollow(userId);
  };

  const onPressFollow = (userId: number, isFollow: boolean) => {
    toggleFollow(userId, isFollow);
    updateNoticeQuery(userId);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <NoticeList
          title={'오늘'}
          notice={todayNotice.data}
          hasNext={!!todayNotice.hasNext}
          onClickMore={todayNotice.onNextPage}
          onPressFollow={onPressFollow}
        />
        <Divider style={styles.divider} />
        <NoticeList
          title={'이번주'}
          notice={weekNotice.data}
          hasNext={!!weekNotice.hasNext}
          onClickMore={weekNotice.onNextPage}
          onPressFollow={onPressFollow}
        />
        <Divider style={styles.divider} />
        <NoticeList
          title={'이전 활동'}
          notice={beforeNotice.data}
          hasNext={!!beforeNotice.hasNext}
          onClickMore={beforeNotice.onNextPage}
          onPressFollow={onPressFollow}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export { Notification };

const styles = StyleSheet.create({
  divider: {
    height: 8,
    backgroundColor: theme.color.gray200,
  },
});
