import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { Post, PostTopic } from '@/apis/community/types';
import { ToggleMenu } from '@/containers/Community/CommunityContainer';
import { theme } from '@/styles/theme';
import PencilIcon from '@shared/Icons/PencilIcon.svg';
import { SplitColumn, SplitRow } from '../Shared/SplitSpace';
import { Row, ScrollView } from '../Shared/View';
import { Header } from './Header';
import { MenuTab } from './MenuTab';
import { PostSummary } from './Post';
import { WriteMenuModal } from './WriteMenuModal';

type Props = {
  posts: Post[];
  isLoading: boolean;
  menus: ToggleMenu[];
  postTopic: PostTopic;
  isShowWriteMenu: boolean;
  onRefresh: () => void;
  onPressNotification: () => void;
  onPressWrite: (postTopic: PostTopic) => void;
  onPressToggle: (topic: PostTopic) => void;
  onPressPost: (postTopic: PostTopic, postId: number) => void;
  onPressLike: (postTopic: PostTopic, postId: number, isLiked: boolean) => void;
  onPressMenu: (post: Post) => void;
  onPressWriteFloatingButton: () => void;
  onScrollEnd: () => void;
};

export const CommunityComponent = ({
  posts,
  isLoading,
  menus,
  postTopic,
  isShowWriteMenu,
  onRefresh,
  onPressNotification,
  onPressWrite,
  onPressToggle,
  onPressPost,
  onPressMenu,
  onPressLike,
  onPressWriteFloatingButton,
  onScrollEnd,
}: Props) => {
  const [floatingButtonY, setFloatingButtonY] = useState(0);

  return (
    <View style={styles.container}>
      <Header title="커뮤니티" onPressNotification={onPressNotification} />

      <SplitRow height={8} />

      <Row>
        <FlatList
          keyExtractor={item => item.title}
          style={styles.toggleContainer}
          contentContainerStyle={styles.toggleContentContainer}
          data={menus}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPressToggle(item.postTopic)}>
              <MenuTab title={item.title} isSeleted={item.postTopic === postTopic} />
            </Pressable>
          )}
          ItemSeparatorComponent={() => <SplitColumn width={20} />}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </Row>

      <View style={styles.mainContainer}>
        {isLoading ? (
          <LottieView source={require('@/assets/lottiles/community_loading.json')} loop autoPlay />
        ) : (
          <>
            <ScrollView
              onScrollEnd={onScrollEnd}
              refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
            >
              <View style={styles.postCntainer}>
                {posts.map((post, index) => {
                  return (
                    <TouchableOpacity
                      key={`${post.postTopic}${post.postId}`}
                      onPress={() => onPressPost(post.postTopic, post.postId)}
                    >
                      <PostSummary
                        post={post}
                        isFirst={index === 0}
                        onPressLike={onPressLike}
                        onPressMenu={onPressMenu}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}
      </View>

      <Pressable
        style={styles.floatingButtonContainer}
        onLayout={e => setFloatingButtonY(e.nativeEvent.layout.y)}
        onPress={onPressWriteFloatingButton}
      >
        <View style={styles.floatingButton}>
          <PencilIcon />
        </View>
      </Pressable>

      <WriteMenuModal
        visible={isShowWriteMenu}
        menus={menus}
        y={floatingButtonY}
        onPressWrite={onPressWrite}
        onPressClose={onPressWriteFloatingButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.color.gray200,
  },
  toggleContentContainer: {
    paddingHorizontal: 20,
  },
  mainContainer: {
    flex: 1,
  },
  postCntainer: {
    paddingHorizontal: 20,
  },
  floatingButtonContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    bottom: 20,
    right: 20,
  },
  floatingButton: {
    backgroundColor: theme.color.primary600,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
});
