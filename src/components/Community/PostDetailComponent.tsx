import React from 'react';
import { StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Post as PostType } from '@/apis/community/types';
import { CommentContainer } from '@/containers/Comment';
import { Divider } from '../BakeryDetail/Divider';
import { SplitRow } from '../Shared/SplitSpace';
import { Header, Post } from './Post';

type Props = {
  post: PostType;
  onPressLike: (postId: number) => void;
  refetchPost: () => void;
  onPressMenu: () => void;
};

export const PostDetailComponent = ({ post, onPressLike, refetchPost, onPressMenu }: Props) => {
  const { top } = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
      enableOnAndroid
      enableAutomaticScroll={true}
      extraHeight={12}
      keyboardShouldPersistTaps="handled"
      scrollIndicatorInsets={{ right: 1 }}
      refreshControl={<RefreshControl progressViewOffset={top} refreshing={false} onRefresh={refetchPost} />}
    >
      <SafeAreaView style={styles.container}>
        <Header title={`${post.writerInfo.nickname}님의 게시물`} onPressMenu={onPressMenu} />

        <Post post={post} onPressLike={onPressLike} />

        <SplitRow height={20} />

        <Divider />

        <CommentContainer postId={post.postId} postTopic={post.postTopic} />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
  },
});
