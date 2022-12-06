import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { NoticeEntry } from '@/apis/notice/types';
import { useGetNotice } from '@/apis/notice/useGetNotification';
import { FollowNotice } from '@/components/Notice/FollowNotice';
import { Notice } from '@/components/Notice/Notice';
import { useAppSelector } from '@/hooks/redux';
import { theme } from '@/styles/theme';

const Notification = () => {
  const { deviceToken } = useAppSelector(state => state.notice);

  useGetNotice({ deviceToken });

  const todayNoticeList: NoticeEntry[] = [
    {
      image: 'noticeImage/michael-dam.jpg',
      fromUserId: 3,
      title: '오늘의빵님이 회원님을 팔로우하기 시작했어요',
      contentId: 1,
      content: null,
      createdAt: '1분 전',
    },
    {
      image: 'noticeImage/comment.jpg',
      fromUserId: null,
      title: '내 리뷰에 뫄뫄님이 댓글을 달았어요!\n ‘항상 남부터미널오면 꼭 방문해서 몇개씩 사는...’',
      contentId: 2,
      content: null,
      createdAt: '15시간 전',
    },
    {
      image: 'noticeImage/like.jpg',
      fromUserId: null,
      title: '내 리뷰를 뫄뫄님이 좋아해요!\n‘항상 남부터미널오면 꼭 방문해서 몇개씩 사는...’',
      contentId: 3,
      content: null,
      createdAt: '20시간 전',
    },
    {
      image: 'noticeImage/bread.jpg',
      fromUserId: null,
      title: '내가 제보한 빵집이 추가되었어요!\n루엘드파리 강남본점',
      contentId: 4,
      content: null,
      createdAt: '21시간 전',
    },
    {
      image: 'noticeImage/heart.jpg',
      fromUserId: null,
      title: '파리바게트 강남점 관리자 글이 업데이트됐어요!\n‘오늘은 사정상 휴뮤입니다! 죄송합니다!!!’',
      contentId: 5,
      content: null,
      createdAt: '21시간 전',
    },
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={todayNoticeList}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={({ item }) => {
          if (item.fromUserId) {
            return <FollowNotice key={item.contentId} notice={item} />;
          }

          return <Notice key={item.contentId} notice={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: theme.color.gray200,
    marginVertical: 12,
  },
});

export { Notification };
