import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Post, PostTopic } from '@/apis/community/types';
import { PostSummary } from '../../Community/Post';
import { Header } from '../Header';

type Props = {
  posts: Post[];
  onPressPost: (postTopic: PostTopic, postId: number) => void;
  onPressLike: (postTopic: PostTopic, postId: number, isLiked: boolean) => void;
  onPressMore: () => void;
  onPressMenu: (postTopic: PostTopic, postId: number, userId: number) => void;
};

export const HomeCommunityPartComponent = ({ posts, onPressPost, onPressLike, onPressMore, onPressMenu }: Props) => {
  return (
    <View>
      <View>
        <Header title="커뮤니티 핫한 글" onPressMore={onPressMore} />

        {posts.map((post, index) => {
          return (
            <TouchableOpacity key={post.postId} onPress={() => onPressPost(post.postTopic, post.postId)}>
              <PostSummary post={post} isFirst={index === 0} onPressLike={onPressLike} onPressMenu={onPressMenu} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
