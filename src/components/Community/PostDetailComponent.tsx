import React from 'react';
import { StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Post as PostType } from '@/apis/community/types';
import { CommentContainer } from '@/containers/Comment';
import { Divider } from '../BakeryDetail/Divider';
import { Header } from '../Shared/Header';
import { SplitRow } from '../Shared/SplitSpace';
import { Post } from './Post';
import { topics } from './Post/PostSummary';

type Props = {
  post: PostType;
  onPressLike: (postId: number) => void;
  onPressMenu: () => void;
  refetchPost: () => void;
};

export const PostDetailComponent = ({ post, onPressLike, onPressMenu, refetchPost }: Props) => {
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
        <Header title={topics[post.postTopic]} isPrevButtonShown />

        <Post post={post} onPressLike={onPressLike} onPressMenu={onPressMenu} />

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
