import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '@/styles/theme';
import { BakeryReview, resizePixels } from '@/utils';
import styled from '@emotion/native';
import { BreadRating } from '../Rating';

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
  review: MenuReview;
  onPress: (review: BakeryReview) => void;
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
            <Text style={styles.userNameText}>{review?.memberName}</Text>
            <View style={styles.socialInfo}>
              <Text style={styles.userInfoText}>리뷰 {6}</Text>
              <Text style={styles.divider}> | </Text>
              <Text style={styles.userInfoText}>팔로워 {100}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>팔로우</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.breadRatingContainer}>
        <Text style={styles.menuNameText}>{review?.menuName}</Text>
        <BreadRating rating={review?.rating} type={'review'} />
      </View>
    </View>
    <TouchableOpacity onPress={() => onPress(review)}>
      <View style={styles.reviewContainer}>
        <FlatList
          style={styles.reviewImageContainer}
          data={imgs}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviewImageContent}
          keyExtractor={img => img.id.toString()}
          renderItem={({ item }) => <Image style={styles.reviewImage} source={item.src} />}
        />
      </View>
      <Text style={styles.reivewText}>{review?.contents}</Text>
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
    reivewText: {
      color: theme.color.gray700,
      fontSize: 14,
      paddingTop: 130,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
  })
);

const Container = styled.View`
  position: relative;
`;

const ReviewContent = styled.View`
  margin: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.color.gray300};
  // TODO: 마지막 리뷰는 border 제거
`;

const Reviewer = styled.View`
  flex-direction: row;
`;

const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 12px;
`;

const Info = styled.View`
  margin-left: 8px;
  justify-content: center;
`;

const Nickname = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

const UpdatedAt = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray600};
  margin-top: 2px;
`;

const ReviewRating = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px 0 160px;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray600};
  margin-right: 8px;
`;

const ReviewImg = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 8px;
  margin-right: 8px;
`;

const ReviewText = styled.Text`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 14px;
`;
