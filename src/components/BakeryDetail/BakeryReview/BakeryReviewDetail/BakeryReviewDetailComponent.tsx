import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReviewDetailEntity } from '@/apis/bakery/types';
import { Comment } from '@/apis/community/types';
import { Header } from '@/components/Community/Post';
import { Review } from '@/components/Shared/Reviews';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { CommentContainer } from '@/containers/Comment';
import { resizePixels } from '@/utils';
import { Divider } from '../../Divider';

type Props = {
  review: ReviewDetailEntity;
  comments: Comment[];
  onScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  refetchPage: () => void;
  refetchComments: (pageNum?: number) => void;
  onPressMenu: () => void;
  goNavBakeryDetail: () => void;
};

export const BakeryReviewDetailComponent = ({
  review,
  comments,
  onScrollEndDrag,
  refetchPage,
  refetchComments,
  onPressMenu,
  goNavBakeryDetail,
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
      enableOnAndroid
      enableAutomaticScroll={true}
      extraHeight={12}
      onScrollEndDrag={onScrollEndDrag}
      keyboardShouldPersistTaps="handled"
      scrollIndicatorInsets={{ right: 1 }}
      refreshControl={<RefreshControl progressViewOffset={top} refreshing={false} onRefresh={refetchPage} />}
    >
      <SafeAreaView style={styles.container}>
        <Header
          title={`${review.reviewDto.userInfo.nickName}님의 리뷰`}
          onPressMenu={review.reviewDto.userInfo.isMe ? undefined : onPressMenu}
        />

        <SplitRow height={16} />

        <View style={styles.reviewContainer}>
          <Review mode="detail" review={review.reviewDto} isEnd={true} onPressBakery={goNavBakeryDetail} />
        </View>

        <Divider />

        <CommentContainer
          comments={comments}
          postId={review.reviewDto.reviewInfo.id}
          postTopic="REVIEW"
          refetchComments={refetchComments}
        />

        {bottom === 0 && <SplitRow height={12} />}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flex: 1,
    },
    scrollContentContainer: {
      flexGrow: 1,
    },
    mainContainer: {
      flex: 1,
    },
    reviewContainer: {
      paddingHorizontal: 20,
    },
  })
);
