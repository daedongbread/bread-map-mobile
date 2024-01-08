import { format } from 'date-fns';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Post, PostTopic } from '@/apis/community/types';
import { CustomImage } from '@/components/Shared/CustomImage';
import { StarIcon } from '@/components/Shared/Icons';
import { FollowButton } from '@/components/Shared/Reviews/FollowButton';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { MoreLineText, Text } from '@/components/Shared/Text';

import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';
import VerticalViewMoreIcon from '@shared/Icons/VerticalViewMoreIcon.svg';
import { BakeryInfoCard } from './BakeryInfoCard';
import { Footer } from './Footer';

type Props = {
  post: Post;
  isFirst: boolean;
  onPressLike: (postTopic: PostTopic, postId: number, isLiked: boolean) => void;
  onPressMenu: (postTopic: PostTopic, postId: number, userId: number) => void;
};

export const topics: any = {
  EVENT: '이벤트',
  BREAD_STORY: '빵 이야기',
  REVIEW: '리뷰',
  FREE_TALK: '빵터지는 이야기',
  EATEN_BREAD: '먹은 빵 자랑',
};

export const PostSummary = React.memo(({ post, isFirst, onPressLike, onPressMenu }: Props) => {
  const [likeToggle, setLikeToggle] = useState({
    isLiked: post.isUserLiked,
    count: post.likeCount,
  });

  const _onPressLike = async (_postTopic: PostTopic, _postId: number, isLiked: boolean) => {
    try {
      if (isLiked) {
        setLikeToggle({
          isLiked: false,
          count: likeToggle.count - 1,
        });
      } else {
        setLikeToggle({
          isLiked: true,
          count: likeToggle.count + 1,
        });
      }

      await onPressLike(post.postTopic, post.postId, likeToggle.isLiked);
    } catch (e) {
      setLikeToggle(likeToggle);
    }
  };

  return (
    <View style={[styles.container, !isFirst && styles.divider]}>
      <Row style={[styles.tag]}>
        {post.postTopic === 'EVENT' && (
          <>
            <StarIcon fillColor="orange" width={11} height={11} />
            <SplitColumn width={4} />
          </>
        )}

        <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
          {topics[post.postTopic]}
        </Text>
      </Row>

      <SplitRow height={16} />

      <View>
        <Row style={styles.headerContainer}>
          <Row>
            <FastImage style={styles.profileImage} source={{ uri: post.writerInfo.profileImage }} />

            <SplitColumn width={10} />

            <View>
              <Text color={theme.color.gray900} presets={['body2', 'bold']}>
                {post.writerInfo.nickname}
              </Text>

              <SplitRow height={2} />

              <Text color={theme.color.gray500} presets={['caption2', 'medium']}>
                리뷰 {post.writerInfo.reviewCount || 0}
              </Text>
            </View>
          </Row>

          <Row>
            <FollowButton style={styles.followButton} isFollow={false} onPress={() => null} />

            <SplitColumn width={8} />

            <TouchableOpacity onPress={() => onPressMenu(post.postTopic, post.postId, post.writerInfo.userId)}>
              <VerticalViewMoreIcon />
            </TouchableOpacity>
          </Row>
        </Row>

        <SplitRow height={10} />

        <View style={styles.contentsContainer}>
          <View style={styles.textContainer}>
            {post.postTopic !== 'REVIEW' && (
              <Text color={theme.color.gray900} presets={['subhead', 'bold']} numberOfLines={2} ellipsizeMode="tail">
                {post.title}
              </Text>
            )}

            <MoreLineText
              color={theme.color.gray600}
              presets={['body2', 'regular']}
              linesToTruncate={post.postTopic === 'REVIEW' ? 4 : 2}
              text={post.content.trim()}
            />
          </View>

          <SplitColumn width={17} />

          {post.thumbnail && (
            <CustomImage
              style={styles.postImage}
              source={{ uri: post.thumbnail }}
              resizeMode="cover"
              width={styles.postImage.width}
              height={styles.postImage.height}
              resizedWidth={80}
              resizedHeight={80}
              isResizable={true}
            />
          )}
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
          isLiked={likeToggle.isLiked}
          likeCount={likeToggle.count}
          commentCount={post.commentCount}
          date={format(new Date(post.createdDate), 'yyyy.MM.dd')}
          onPressLike={() => _onPressLike(post.postTopic, post.postId, likeToggle.isLiked)}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  divider: {
    borderTopColor: theme.color.gray300,
    borderTopWidth: 0.25,
  },
  tag: {
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.gray200,
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 60,
  },
  followButton: {
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  contentsContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
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
