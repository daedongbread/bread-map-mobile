import { format } from 'date-fns';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Post, PostTopic } from '@/apis/community/types';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { BakeryInfoCard } from './BakeryInfoCard';
import { Footer } from './Footer';

type Props = {
  post: Post;
  isFirst: boolean;
  onPressLike: (postTopic: PostTopic, postId: number, isLiked: boolean) => void;
  onPressMenu: (postTopic: PostTopic, postId: number, userId: number) => void;
};

const MAIN_TEXT_LIMIT = 38;
// const NO_IMAGE_MAIN_TEXT_LIMIT = 55;

export const topics: any = {
  EVENT: '이벤트',
  BREAD_STORY: '빵 이야기',
  REVIEW: '리뷰',
  FREE_TALK: '빵터지는 이야기',
  EATEN_BREAD: '먹은 빵 자랑',
};

export const PostSummary = ({ post, isFirst, onPressLike, onPressMenu }: Props) => {
  return (
    <View style={[styles.container, !isFirst && styles.divider]}>
      <Text presets={['caption2', 'bold']} style={[styles.tag, post.postTopic === 'EVENT' && styles.reviewTag]}>
        {topics[post.postTopic]}
      </Text>

      <SplitRow height={16} />

      <View>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{ uri: post.writerInfo.profileImage }} />

          <SplitColumn width={10} />

          <Text color={theme.color.gray900} presets={['body2', 'bold']}>
            {post.writerInfo.nickname}
          </Text>
        </View>

        <SplitRow height={10} />

        <View style={styles.contentsContainer}>
          <View style={styles.textContainer}>
            <Text color={theme.color.gray900} presets={['body1', 'semibold']} numberOfLines={2} ellipsizeMode="tail">
              {post.title}
            </Text>
            {post.content.trim().length > MAIN_TEXT_LIMIT ? (
              <Text color={theme.color.gray600} presets={['body2', 'medium']} numberOfLines={2} ellipsizeMode="tail">
                {post.content.trim().substring(0, MAIN_TEXT_LIMIT)}...
                <Text color={theme.color.gray500} presets={['body2', 'medium']}>
                  {' '}
                  더보기
                </Text>
              </Text>
            ) : (
              <Text color={theme.color.gray600} presets={['body2', 'medium']}>
                {post.content}
              </Text>
            )}
          </View>

          <SplitColumn width={17} />

          {post.thumbnail && <Image style={styles.postImage} source={{ uri: post.thumbnail }} />}
        </View>

        <SplitRow height={15} />

        {post.postTopic === 'REVIEW' && (
          <>
            <BakeryInfoCard
              bakeryId={post.bakeryInfo.bakeryId}
              bakeryName={post.bakeryInfo.name}
              address={post.bakeryInfo.address}
              thumbnail={post.bakeryInfo.thumbnail}
            />

            <SplitRow height={15} />
          </>
        )}

        <Footer
          isLiked={post.isUserLiked}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          date={format(new Date(post.createdDate), 'yyyy.MM.dd')}
          onPressMenu={() => onPressMenu(post.postTopic, post.postId, post.writerInfo.userId)}
          onPressComment={() => null}
          onPressLike={() => onPressLike(post.postTopic, post.postId, post.isUserLiked)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  divider: {
    borderTopColor: theme.color.gray300,
    borderTopWidth: 0.25,
  },
  tag: {
    backgroundColor: theme.color.gray100,
    color: theme.color.gray600,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  reviewTag: {
    backgroundColor: theme.color.primary600,
    color: theme.color.white,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 27,
  },
  contentsContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    height: 80,
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
