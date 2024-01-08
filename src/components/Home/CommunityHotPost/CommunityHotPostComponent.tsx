import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Post, PostTopic } from '@/apis/community/types';
import { PostSummary } from '../../Community/Post';
import { SubHeader } from '../SubHeader';
import { ViewMoreButton } from '../ViewMoreButton';

type Props = {
  posts: Post[];
  onPressPost: (postTopic: PostTopic, postId: number) => void;
  onPressLike: (postTopic: PostTopic, postId: number, isLiked: boolean) => void;
  onPressMenu: (postTopic: PostTopic, postId: number, userId: number) => void;
  onPressMore: () => void;
};

export const CommunityHotPostComponent = ({ posts, onPressPost, onPressLike, onPressMenu, onPressMore }: Props) => {
  return (
    <View style={styles.container}>
      <SubHeader title="커뮤니티 핫한 글" />

      {posts.map((post, index) => {
        return (
          <TouchableOpacity key={post.postId} onPress={() => onPressPost(post.postTopic, post.postId)}>
            <PostSummary post={post} isFirst={index === 0} onPressLike={onPressLike} onPressMenu={onPressMenu} />
          </TouchableOpacity>
        );
      })}

      <ViewMoreButton onPress={onPressMore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
