import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ReviewContent } from '@/apis/bakery/types';
import { follow, unFollow } from '@/apis/profile';
import { useLikeReview, useUnLikeReview } from '@/apis/review';
import { Divider } from '@/components/BakeryDetail/Divider';
import { BakeryReviewStackScreenProps } from '@/pages/MainStack/MainTab/HomeStack/BakeryDetail/Tab/BakeryReview/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { IcComment, IcLike, ViewMoreIcon } from '../Icons';
import { BreadRating } from '../Rating';
import { SplitColumn, SplitRow } from '../SplitSpace';
import { FollowButton, FollowType } from './FollowButton';
import { InteractionButton } from './InteractionButton';

type ProductRatingProps = {
  item: {
    productName: string;
    rating: number;
  };
};

const ProductRating = ({ item }: ProductRatingProps) => (
  <View style={styles.breadRatingContainer}>
    <Text style={styles.menuNameText}>{item.productName}</Text>
    <BreadRating rating={item.rating} type={'review'} />
  </View>
);

type ReviewProps = {
  review: ReviewContent;
  isEnd: boolean;
  onPress: (review: ReviewContent) => void;
  refetchReview: () => void;
};

const CONTENT_TEXT_LIMIT = 60;

const Review = ({ review, isEnd, onPress, refetchReview }: ReviewProps) => {
  const navigation = useNavigation<BakeryReviewStackScreenProps<'BakeryReview'>['navigation']>();

  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: unLikeReview } = useUnLikeReview();

  const onPressReview = (reviewId: number) => {
    // navation type 선언시 아래같은 중첩 구조가 아닌 CompositeScreenProps 같은거 사용해서 할 수 있는 방법?
    navigation.push('BakeryReviewDetail', {
      reviewId,
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
    // navigate
  };

  const onPressMoreButton = (userId: number, reviewId: number) => {
    navigation.navigate('ReviewMoreBottomSheet', {
      reviewId,
      userId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewHeader}>
        <TouchableWithoutFeedback
          style={styles.reviewerContainer}
          onPress={() => onPressProfileImage(review.userInfo.userId)}
        >
          <Image style={styles.profileImage} source={{ uri: review.userInfo.userImage }} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userNameText}>{review.userInfo.nickName}</Text>
            <View style={styles.socialInfo}>
              <Text style={styles.userInfoText}>리뷰 {review.userInfo.reviewNum}</Text>
              <Text style={styles.divider}> | </Text>
              <Text style={styles.userInfoText}>팔로워 {review.userInfo.followerNum}</Text>
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
      <View style={styles.breadRatingListContainer}>
        <FlatList
          data={review.reviewInfo.productRatingList}
          renderItem={({ item, index }) => <ProductRating key={index} item={item} />}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
      <SplitRow height={11} />
      <TouchableWithoutFeedback onPress={() => onPressReview(review.reviewInfo.id)}>
        {review.reviewInfo.imageList.length > 0 && (
          <View style={styles.reviewContainer}>
            <FlatList
              style={styles.reviewImageContainer}
              data={review.reviewInfo.imageList.map((i, ix) => ({ id: ix, src: i }))}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={img => img.id.toString()}
              renderItem={({ item }) => <Image style={styles.reviewImage} source={{ uri: item.src as any }} />}
            />
          </View>
        )}
        <SplitRow height={16} />
        <Text style={styles.reviewText} numberOfLines={2}>
          {review.reviewInfo.content.trim().length > CONTENT_TEXT_LIMIT ? (
            <>
              {review.reviewInfo.content.trim().substring(0, CONTENT_TEXT_LIMIT)}
              <Text style={styles.reviewTextSuffix}>...더보기</Text>
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
            <Text style={styles.dateText}>{review.reviewInfo.createdAt}</Text>
            <SplitColumn width={6} />
            <TouchableWithoutFeedback onPress={() => onPressMoreButton(review.userInfo.userId, review.reviewInfo.id)}>
              <ViewMoreIcon />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <SplitRow height={25} />
      </TouchableWithoutFeedback>
      {isEnd || <Divider style={{ height: 1 }} />}
    </View>
  );
};

export default Review;

const styles = StyleSheet.create(
  resizePixels({
    container: {
      paddingTop: 30,
    },
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
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 2,
    },
    divider: {
      color: theme.color.gray300,
      fontSize: 12,
    },
    breadRatingListContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginRight: -20,
    },

    socialInfo: {
      flexDirection: 'row',
    },
    userInfoText: {
      color: theme.color.gray400,
      fontSize: 12,
    },
    updatedAtText: {
      fontSize: 12,
      color: theme.color.gray600,
      marginTop: 2,
    },
    breadRatingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 8,
      flexGrow: 0,
      backgroundColor: theme.color.gray100,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginTop: 16,
      alignSelf: 'flex-start',
    },
    menuNameText: {
      fontWeight: '700',
      fontSize: 12,
      color: theme.color.gray600,
      marginRight: 0,
    },
    reviewContainer: {},
    // 여기에 문제있음
    reviewImageContainer: {
      flexDirection: 'row',
      left: 0,
    },
    reviewImage: {
      width: 140,
      height: 140,
      borderRadius: 8,
      marginRight: 8,
    },
    reviewText: {
      color: theme.color.gray700,
      fontSize: 14,
    },
    reviewTextSuffix: {
      color: theme.color.gray500,
    },
    footerContainer: {
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
      fontSize: 12,
      fontWeight: '500',
    },
  })
);
