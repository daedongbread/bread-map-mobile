import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { BreadRating } from '../Rating';
import { BakeryReviewEntity } from '@/apis/bakery/types';

type MenuReview = {
  breadCategoryId: number;
  contents: string;
  imgPathList: string[];
  lastModifiedDateTime: string;
  memberId: number;
  memberName: string;
  menuId: number;
  menuName: string;
  menuReviewId: number;
  rating: number;
};

type ReviewProps = {
  review: BakeryReviewEntity;
  onPress: (review: BakeryReviewEntity) => void;
};

const imgs = [
  { id: 1, src: require('../Images/bread.png') },
  { id: 2, src: require('../Images/bread2.png') },
  { id: 3, src: require('../Images/bread.png') },
  { id: 4, src: require('../Images/bread2.png') },
];
// 페이지 이동되는 부분에 btn, view가 있는데, 이것때문에 사진이 안넘어간다.
const Review: React.FC<ReviewProps> = ({ review, onPress }) => (
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
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>팔로우</Text>
        </TouchableOpacity>
      </View>
      {review?.productRatingList.map(i => (
        <View style={styles.breadRatingContainer}>
          <Text style={styles.menuNameText}>{i?.productName}</Text>
          <BreadRating rating={i?.rating} type={'review'} />
        </View>
      ))}
    </View>
    <TouchableOpacity onPress={() => onPress(review)}>
      {review?.imageList.length >= 1 && (
        <View style={styles.reviewContainer}>
          <FlatList
            style={styles.reviewImageContainer}
            data={review?.imageList.map((i, ix) => ({ id: ix, src: i }))}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewImageContent}
            keyExtractor={img => img.id.toString()}
            renderItem={({ item }) => <Image style={styles.reviewImage} source={item.src as any} />}
          />
        </View>
      )}
      <Text style={styles.reviewText}>{review?.content}</Text>
    </TouchableOpacity>
  </View>
);
// <UpdatedAt>{review?.lastModifiedDateTime}</UpdatedAt>

export default Review;

const styles = StyleSheet.create(
  resizePixels({
    container: {
      position: 'relative',
      borderBottomWidth: 1,
      borderBottomColor: theme.color.gray300,
    },

    reviewContent: {
      marginHorizontal: 20,
      marginVertical: 20,

      // TODO: 마지막 리뷰는 border 제거
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
      flexGrow: 0,
      backgroundColor: theme.color.gray100,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginTop: 16,
      alignSelf: 'flex-start',
    },
    menuNameText: {
      fontWeight: 'bold',
      fontSize: 12,
      color: theme.color.gray600,
      marginRight: 0,
    },
    reviewContainer: {
      paddingTop: 30,
    },
    // 여기에 문제있음
    reviewImageContainer: {
      flexDirection: 'row',
      position: 'absolute',
      left: 0,
    },
    reviewImageContent: {
      paddingHorizontal: 20,
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
      // paddingTop: 00,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
  })
);
