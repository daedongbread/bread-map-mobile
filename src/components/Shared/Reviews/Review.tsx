import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BakeryReviewEntity } from '@/apis/bakery/types';
import { Divider } from '@/components/BakeryDetail/Divider';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { BreadRating } from '../Rating';

type ReviewProps = {
  review: BakeryReviewEntity;
  onPress: (review: BakeryReviewEntity) => void;
  isEnd: boolean;
};

type ProductRatingProps = {
  item: {
    productName: string;
    rating: number;
  };
};

const ProductRating = ({ item }: ProductRatingProps) => (
  <View style={styles.breadRatingContainer}>
    <Text style={styles.menuNameText}>{item?.productName}</Text>
    <BreadRating rating={item?.rating} type={'review'} />
  </View>
);

const Review: React.FC<ReviewProps> = ({ review, onPress, isEnd }) => (
  <View style={styles.container}>
    <View style={styles.reviewContent}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerContainer}>
          <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/100' }} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userNameText}>{review?.nickName}</Text>
            <View style={styles.socialInfo}>
              <Text style={styles.userInfoText}>리뷰 {review?.reviewNum}</Text>
              <Text style={styles.divider}> | </Text>
              <Text style={styles.userInfoText}>팔로워 {review.followerNum}</Text>
            </View>
          </View>
        </View>
        {/*TODO 팔로우 버튼 동작*/}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>팔로우</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.breadRatingListContainer}>
        <FlatList
          data={review.productRatingList}
          renderItem={({ item, index }) => <ProductRating key={index} item={item} />}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </View>
    <TouchableOpacity onPress={() => onPress(review)}>
      {review?.imageList.length > 0 && (
        <View style={styles.reviewContainer}>
          <FlatList
            style={styles.reviewImageContainer}
            data={review?.imageList.map((i, ix) => ({ id: ix, src: i }))}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={img => img.id.toString()}
            renderItem={({ item }) => <Image style={styles.reviewImage} source={{ uri: item.src as any }} />}
          />
        </View>
      )}
      <Text style={styles.reviewText}>{review?.content}</Text>
      {isEnd || <Divider style={{ height: 1 }} />}
    </TouchableOpacity>
  </View>
);

export default Review;

const styles = StyleSheet.create(
  resizePixels({
    container: {
      marginTop: 20,
    },

    reviewContent: {
      marginBottom: 12,
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
    followButton: {
      backgroundColor: theme.color.primary100,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 4,
    },
    followButtonText: {
      color: theme.color.primary500,
      fontWeight: 'bold',
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
      marginBottom: 12,
    },
    reviewImage: {
      width: 140,
      height: 140,
      borderRadius: 8,
      marginRight: 8,
    },
    reviewTextContainer: {
      paddingTop: 20,
    },
    reviewText: {
      color: theme.color.gray700,
      fontSize: 14,
      paddingBottom: 20,
    },
  })
);
