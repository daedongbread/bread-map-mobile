import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Divider } from '@/components/BakeryDetail/Divider';
import { NoticeList } from '@/components/Notice/NoticeList';
import { useAppSelector } from '@/hooks/redux';
import { useNoticePagination } from '@/hooks/useNoticePagination';
import { theme } from '@/styles/theme';

const Notification = () => {
  const { deviceToken } = useAppSelector(state => state.notice);

  const todayNotice = useNoticePagination({ deviceToken, unit: 'today' });
  const weekNotice = useNoticePagination({ deviceToken, unit: 'week' });
  const beforeNotice = useNoticePagination({ deviceToken, unit: 'before' });

  const onPressFollow = (userId: number) => {
    todayNotice.onUpdateFollow(userId);
    weekNotice.onUpdateFollow(userId);
    beforeNotice.onUpdateFollow(userId);
  };

  return (
    <SafeAreaView>
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
