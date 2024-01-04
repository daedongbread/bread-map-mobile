import LottieView from 'lottie-react-native';
import React from 'react';
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

type Props = {
  posts: Post[];
  isLoading: boolean;
  menus: ToggleMenu[];
  postTopic: PostTopic;
  onRefresh: () => void;
  onPressWrite: () => void;
  onPressToggle: (topic: PostTopic) => void;
  onPressPost: (postTopic: PostTopic, postId: number) => void;
  onPressLike: (postTopic: PostTopic, postId: number, isLiked: boolean) => void;
  onPressMenu: (postTopic: PostTopic, postId: number, userId: number) => void;
  onScrollEnd: () => void;
};

export const CommunityComponent = ({
  posts,
  isLoading,
  menus,
  postTopic,
  onRefresh,
  onPressWrite,
  onPressToggle,
  onPressPost,
  onPressMenu,
  onPressLike,
  onScrollEnd,
}: Props) => {
  return (
    <View style={styles.container}>
      <Header title="커뮤니티" onPressWrite={onPressWrite} />

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

            <TouchableOpacity style={styles.floatingButtonContainer} onPress={onPressWrite}>
              <View style={styles.floatingButton}>
                <PencilIcon />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
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
