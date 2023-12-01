import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Post, PostTopic } from '@/apis/community/types';
import { ToggleMenu } from '@/containers/Community/CommunityContainer';
import { SplitRow } from '../Shared/SplitSpace';
import { Row, ScrollView } from '../Shared/View';
import { Header } from './Header';
import { PostSummary } from './Post';
import { Toggle } from './Toggle';

type Props = {
  posts: Post[];
  menus: ToggleMenu[];
  postTopic: PostTopic;
  onRefresh: () => void;
  onPressPrev: () => void;
  onPressWrite: () => void;
  onPressToggle: (topic: PostTopic) => void;
  onPressPost: (postTopic: PostTopic, postId: number) => void;
  onPressLike: (postTopic: PostTopic, postId: number, isLiked: boolean) => void;
  onPressMenu: (postTopic: PostTopic, postId: number, userId: number) => void;
  onScrollEnd: () => void;
};

export const CommunityComponent = ({
  posts,
  menus,
  postTopic,
  onRefresh,
  onPressPrev,
  onPressWrite,
  onPressToggle,
  onPressPost,
  onPressMenu,
  onPressLike,
  onScrollEnd,
}: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      onScrollEnd={onScrollEnd}
      refreshControl={<RefreshControl progressViewOffset={top} refreshing={false} onRefresh={onRefresh} />}
    >
      <SafeAreaView>
        <Header title="커뮤니티" onPressPrev={onPressPrev} onPressWrite={onPressWrite} />

        <SplitRow height={8} />

        <Row>
          <FlatList
            data={menus}
            renderItem={({ item }) => (
              <Toggle
                title={item.title}
                isSeleted={item.postTopic === postTopic}
                onPressToggle={() => onPressToggle(item.postTopic)}
              />
            )}
            contentContainerStyle={styles.toggleContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </Row>

        <SplitRow height={16} />

        <View style={styles.postCntainer}>
          {posts.map((post, index) => {
            return (
              <TouchableOpacity
                key={`${post.postTopic}${post.postId}`}
                onPress={() => onPressPost(post.postTopic, post.postId)}
              >
                <PostSummary post={post} isFirst={index === 0} onPressLike={onPressLike} onPressMenu={onPressMenu} />
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    paddingHorizontal: 19,
  },
  postCntainer: {
    paddingHorizontal: 20,
  },
});
