import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ReviewContent } from '@/apis/bakery/types';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { Divider } from '@/components/BakeryDetail/Divider';
import { BakeryInfoCard, Footer } from '@/components/Community/Post';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { MainStackParamList, MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { CustomImage } from '../CustomImage';
import { SplitRow } from '../SplitSpace';
import { MoreLineText, Text } from '../Text';
import { FollowButton } from './FollowButton';
import { ProductRating } from './ProductRating';

const { width } = Dimensions.get('window');

type ReviewProps = {
  mode: 'preview' | 'detail';
  review: ReviewContent;
  isEnd: boolean;
  onPressBakery?: () => void;
};

export const Review = React.memo(({ mode, review, isEnd, onPressBakery }: ReviewProps) => {
  const navigation = useNavigation<MainStackScreenProps<keyof MainStackParamList>['navigation']>();

  const [likeToggle, setLikeToggle] = useState({
    isLiked: review.reviewInfo.isLike,
    count: review.reviewInfo.likeNum,
  });

  useDidMountEffect(() => {
    setLikeToggle({
      isLiked: review.reviewInfo.isLike,
      count: review.reviewInfo.likeNum,
    });
  }, [review.reviewInfo]);

  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: unLikeReview } = useUnLikeReview();

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
    navigation.push('ProfileStack', {
      screen: 'Profile',
      params: {
        userId,
      },
    });
  };

  const onPressLikeButton = async (isLiked: boolean, reviewId: number) => {
    try {
      if (isLiked) {
        setLikeToggle({
          isLiked: false,
          count: likeToggle.count - 1,
        });
        await unLikeReview(reviewId);
      } else {
        setLikeToggle({
          isLiked: true,
          count: likeToggle.count + 1,
        });
        await likeReview(reviewId);
      }
    } catch (e) {
      // 에러발생시 좋아요 상태 롤백
      setLikeToggle(likeToggle);
    }
  };

  return (
    <View>
      {mode === 'preview' && <SplitRow height={32} />}
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
          <FollowButton isFollow={review.userInfo.isFollow} targetUserId={review.userInfo.userId} />
        )}
      </View>

      <TouchableWithoutFeedback style={styles.reviewContainer} onPress={() => onPressReview()}>
        {review.reviewInfo.imageList.length > 0 && (
          <>
            <SplitRow height={22} />
            <FlatList
              contentContainerStyle={styles.reviewImageContainer}
              keyExtractor={(item, index) => index.toString()}
              data={review.reviewInfo.imageList}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={onPressReview}>
                  <CustomImage
                    style={nonResizeStyles[`${mode}ReviewImage`]}
                    resizeMode="cover"
                    source={{ uri: item }}
                    width={nonResizeStyles[`${mode}ReviewImage`].width}
                    height={nonResizeStyles[`${mode}ReviewImage`].height}
                    resizedWidth={310}
                    resizedHeight={310}
                    isResizable
                  />
                </TouchableWithoutFeedback>
              )}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={mode === 'detail'}
              snapToInterval={mode === 'detail' ? width * 0.88 + 12 : 0}
              snapToAlignment="start"
              decelerationRate="fast"
              automaticallyAdjustContentInsets={false}
              horizontal
            />
          </>
        )}

        <SplitRow height={12} />

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

        <SplitRow height={20} />

        <View style={styles.reviewTextContainer}>
          {mode === 'preview' ? (
            <MoreLineText
              color="#616161"
              presets={['body2', 'medium']}
              linesToTruncate={2}
              text={review.reviewInfo.content.trim()}
            />
          ) : (
            <Text color="#616161" presets={['body2', 'medium']}>
              {review.reviewInfo.content.trim()}
            </Text>
          )}
        </View>

        {mode === 'detail' && onPressBakery && (
          <>
            <SplitRow height={20} />
            <View style={styles.bakeryInfoCardContainer}>
              <BakeryInfoCard
                isFlagged={true}
                bakeryId={review.bakeryInfo.bakeryId}
                bakeryName={review.bakeryInfo.bakeryName}
                address={review.bakeryInfo.bakeryAddress}
                thumbnail={review.bakeryInfo.bakeryImage}
              />
            </View>
          </>
        )}

        <SplitRow height={20} />

        <View style={styles.footerContainer}>
          <Footer
            isLiked={likeToggle.isLiked}
            likeCount={likeToggle.count}
            commentCount={review.reviewInfo.commentNum}
            date={review.reviewInfo.createdAt}
            onPressLike={() => onPressLikeButton(likeToggle.isLiked, review.reviewInfo.id)}
          />
        </View>

        <SplitRow height={25} />
      </TouchableWithoutFeedback>
      {isEnd || <Divider style={styles.endDivider} />}
    </View>
  );
});

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
      paddingLeft: 20,
      paddingRight: 8,
    },
    reviewTextContainer: {
      paddingHorizontal: 20,
    },
    bakeryInfoCardContainer: {
      paddingHorizontal: 20,
    },
    footerContainer: {
      paddingHorizontal: 20,
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
    marginRight: 12,
  },
});
