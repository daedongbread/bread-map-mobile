import format from 'date-fns/format';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Post as PostType } from '@/apis/community/types';
import { CustomImage } from '@/components/Shared/CustomImage';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { theme } from '@/styles/theme';
import { Footer } from './Footer';
import { ProfileInfo } from './ProfileInfo';

type Props = {
  post: PostType;
  onPressLike: (postId: number) => void;
  onPressMenu: () => void;
};

const { width } = Dimensions.get('window');

export const Post = React.memo(({ post, onPressLike, onPressMenu }: Props) => {
  const [likeToggle, setLikeToggle] = useState({
    isLiked: post.isUserLiked,
    count: post.likeCount,
  });

  useDidMountEffect(() => {
    setLikeToggle({
      isLiked: post.isUserLiked,
      count: post.likeCount,
    });
  }, [post]);

  const _onPressLike = async (_postId: number) => {
    try {
      if (likeToggle.isLiked) {
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

      await onPressLike(_postId);
    } catch (e) {
      // 에러발생시 좋아요 상태 롤백
      setLikeToggle(likeToggle);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileInfo
        postId={post.postId}
        writerId={post.writerInfo.userId}
        imageUrl={post.writerInfo.profileImage}
        nickname={post.writerInfo.nickname}
        reviewCount={post.writerInfo.reviewCount}
        followerCount={post.writerInfo.followerCount}
        isFollowed={post.writerInfo.isFollowed}
      />

      <SplitRow height={22} />

      <Text color={theme.color.gray900} presets={['subhead', 'bold']}>
        {post.title}
      </Text>

      <SplitRow height={20} />

      {post.images.length > 0 && (
        <FlatList
          style={styles.imageContainer}
          contentContainerStyle={styles.imageContentContainerStyle}
          keyExtractor={item => item}
          data={post.images}
          renderItem={({ item }) => (
            <CustomImage
              style={styles.postImage}
              resizeMode="cover"
              source={{ uri: item }}
              width={styles.postImage.width}
              height={styles.postImage.height}
            />
          )}
          snapToInterval={width * 0.88 + 12}
          decelerationRate="fast"
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      )}

      <SplitRow height={16} />

      <Text color={theme.color.gray700} presets={['body2', 'medium']}>
        {post.content}
      </Text>

      <SplitRow height={20} />

      <Footer
        isLiked={likeToggle.isLiked}
        likeCount={likeToggle.count}
        commentCount={post.commentCount}
        date={format(new Date(post.createdDate), 'yyyy.MM.dd')}
        onPressLike={() => _onPressLike(post.postId)}
        onPressMenu={onPressMenu}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  profileContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  imageContainer: {
    marginHorizontal: -20,
  },
  imageContentContainerStyle: {
    paddingHorizontal: 20,
  },
  postImage: {
    width: width * 0.88,
    height: width * 0.88,
    borderRadius: 8,
    marginRight: 12,
  },
});
