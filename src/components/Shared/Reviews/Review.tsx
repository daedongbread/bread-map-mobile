import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ReviewContent } from '@/apis/bakery/types';
import { follow, unFollow } from '@/apis/profile';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { Divider } from '@/components/BakeryDetail/Divider';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { IcComment, IcLike, ViewMoreIcon } from '../Icons';
import { SplitColumn, SplitRow } from '../SplitSpace';
import { Text } from '../Text';
import { FollowButton, FollowType } from './FollowButton';
import { InteractionButton } from './InteractionButton';
import { ProductRating } from './ProductRating';

const { width } = Dimensions.get('window');

type ReviewProps = {
  mode: 'preview' | 'detail';
  review: ReviewContent;
  isEnd: boolean;
  refetchReview: () => void;
};

const CONTENT_TEXT_LIMIT = 60;

export const Review = ({ mode, review, isEnd, refetchReview }: ReviewProps) => {
  const navigation = useNavigation<MainStackScreenProps<keyof MainStackParamList>['navigation']>();

  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: unLikeReview } = useUnLikeReview();

  const ImageRenderItem = ({ uri, onPress }: { uri: string; onPress: () => void }) => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Image style={nonResizeStyles[`${mode}ReviewImage`]} source={{ uri }} />
      </TouchableWithoutFeedback>
    );
  };

  const onPressReview = () => {
    if (mode === 'detail') {
      return;
    }

    navigation.navigate('BakeryReviewDetailStack', {
      screen: 'BakeryReviewDetail',
      params: {
        reviewId: review.reviewInfo.id,
      },
    });
  };

  const onPressProfileImage = (userId: number) => {
    navigation.push('MainTab', {
      screen: 'Profile',
      params: {
        userId,
      },
    });
  };

  const onPressFollowButton = async (type: FollowType, userId: number) => {
    if (type === 'follow') {
      await follow({ userId });
    } else if (type === 'unFollow') {
      await unFollow({ userId });
    }

    refetchReview();
  };

  const onPressLikeButton = async (isLiked: boolean, reviewId: number) => {
    if (isLiked) {
      await unLikeReview(reviewId);
    } else {
      await likeReview(reviewId);
    }

    refetchReview();
  };

  const onPressAddCommentButton = () => {
    navigation.navigate('BakeryReviewDetailStack', {
      screen: 'ReviewCommentsDetail',
      params: {
        reviewId: review.reviewInfo.id,
      },
    });
  };

  const onPressMoreButton = (userId: number, reviewId: number) => {
    navigation.navigate('ReviewMoreBottomSheet', {
      reviewId,
      userId,
    });
  };

  return (
    <View>
      <SplitRow height={30} />
      <View style={styles.reviewHeader}>
        <TouchableWithoutFeedback
          style={styles.reviewerContainer}
          onPress={() => onPressProfileImage(review.userInfo.userId)}
        >
          <Image style={styles.profileImage} source={{ uri: review.userInfo.userImage }} />
          <View style={styles.userInfoContainer}>
            <Text presets={['body1', 'bold']} style={styles.userNameText}>
              {review.userInfo.nickName}
            </Text>
            <View style={styles.socialInfo}>
              <Text presets={['caption2', 'medium']} style={styles.userInfoText}>
                리뷰 {review.userInfo.reviewNum}
              </Text>
              <Text style={styles.divider}> | </Text>
              <Text presets={['caption2', 'medium']} style={styles.userInfoText}>
                팔로워 {review.userInfo.followerNum}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {!review.userInfo.isMe && (
          <FollowButton
            isFollow={review.userInfo.isFollow}
            onPress={type => onPressFollowButton(type, review.userInfo.userId)}
          />
        )}
      </View>

      <SplitRow height={10} />

      <View style={styles.breadRatingListContainer}>
        <FlatList
          contentContainerStyle={styles.productRatingStyle}
          data={review.reviewInfo.productRatingList}
          renderItem={({ item, index }) => (
            <ProductRating
              key={index}
              productName={item.productName}
              rating={item.rating}
              isEnd={index === review.reviewInfo.productRatingList.length - 1}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

      <SplitRow height={11} />

      <TouchableWithoutFeedback style={styles.reviewContainer} onPress={() => onPressReview()}>
        {review.reviewInfo.imageList.length > 0 && (
          <FlatList
            contentContainerStyle={styles.reviewImageContainer}
            keyExtractor={index => index.toString()}
            data={review.reviewInfo.imageList}
            renderItem={({ item }) => <ImageRenderItem uri={item} onPress={() => onPressReview()} />}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={mode === 'detail'}
            horizontal
          />
        )}

        <SplitRow height={16} />

        <Text presets={['body2', 'medium']} style={styles.reviewText}>
          {mode === 'preview' && review.reviewInfo.content.trim().length > CONTENT_TEXT_LIMIT ? (
            <>
              {review.reviewInfo.content.trim().substring(0, CONTENT_TEXT_LIMIT)}
              <Text presets={['body2', 'medium']} style={styles.reviewTextSuffix}>
                ... 더보기
              </Text>
            </>
          ) : (
            review.reviewInfo.content.trim()
          )}
        </Text>
        <SplitRow height={20} />
        <View style={styles.footerContainer}>
          <View style={styles.footerLeftContainer}>
            <InteractionButton
              icon={IcLike}
              count={review.reviewInfo.likeNum}
              defaultText={'좋아요'}
              isActive={true}
              onPress={() => onPressLikeButton(true, review.reviewInfo.id)}
            />
            <SplitColumn width={8} />
            <InteractionButton
              icon={IcComment}
              count={review.reviewInfo.commentNum}
              defaultText={'댓글달기'}
              onPress={onPressAddCommentButton}
            />
          </View>
          <View style={styles.footerRightContainer}>
            <Text presets={['caption1', 'medium']} style={styles.dateText}>
              {review.reviewInfo.createdAt}
            </Text>
            <SplitColumn width={6} />
            <TouchableWithoutFeedback onPress={() => onPressMoreButton(review.userInfo.userId, review.reviewInfo.id)}>
              <ViewMoreIcon />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <SplitRow height={25} />
      </TouchableWithoutFeedback>
      {isEnd || <Divider style={styles.endDivider} />}
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    reviewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    reviewerContainer: {
      flexDirection: 'row',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 12,
    },
    userInfoContainer: {
      marginLeft: 8,
      justifyContent: 'center',
    },
    userNameText: {
      color: theme.color.gray900,
      marginBottom: 2,
    },
    divider: {
      color: theme.color.gray300,
      fontSize: 12,
    },
    breadRatingListContainer: {
      marginHorizontal: -20,
    },
    productRatingStyle: {
      paddingHorizontal: 20,
    },
    socialInfo: {
      flexDirection: 'row',
    },
    userInfoText: {
      color: theme.color.gray400,
    },
    updatedAtText: {
      fontSize: 12,
      color: theme.color.gray600,
      marginTop: 2,
    },
    reviewContainer: {
      marginHorizontal: -20,
    },
    reviewImageContainer: {
      paddingHorizontal: 20,
    },
    reviewText: {
      paddingHorizontal: 20,
      color: theme.color.gray700,
    },
    reviewTextSuffix: {
      color: theme.color.gray500,
    },
    footerContainer: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footerLeftContainer: {
      flexDirection: 'row',
    },
    footerRightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateText: {
      color: theme.color.gray600,
    },
    endDivider: {
      height: 1,
    },
  })
);

const nonResizeStyles = StyleSheet.create({
  previewReviewImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginRight: 8,
  },
  detailReviewImage: {
    width: width * 0.88,
    height: width * 0.88,
    borderRadius: 8,
    marginRight: 8,
  },
});
