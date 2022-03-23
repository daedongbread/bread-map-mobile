import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BakeryEntity } from '@/apis';
import { resizePixels } from '@/utils';
import styled from '@emotion/native';
import { CircleFlag, CirclePencil, CircleStar, Quote } from '@shared/Icons';
import { BakeryThumbnail } from '../BakeryThumbnail';

type BakeryCardProps = {
  bakery: BakeryEntity;
};

const BakeryCard = ({ bakery }: BakeryCardProps) => (
  <BakeryCardContainer style={styles.bakeryCardContainer}>
    <BakeryThumbnail src={`${bakery.imgPath}`} />
    <BakeryInfoContainer style={styles.bakeryInfoContainer}>
      <BakeryName style={styles.bakeryName}>{bakery.bakeryName}</BakeryName>
      <CountItemsWrap style={styles.countItemsWrap}>
        <CountItem style={styles.countItem}>
          <CircleFlag />
          <Text style={styles.countItemText}>{bakery.flagsCount}</Text>
        </CountItem>
        <CountItem style={styles.countItem}>
          <CircleStar />
          <Text style={styles.countItemText}>{bakery.avgRating.toFixed(1)}</Text>
        </CountItem>
        <CountItem style={styles.countItem}>
          <CirclePencil />
          <Text style={styles.countItemText}>{bakery.menuReviewsCount}</Text>
        </CountItem>
      </CountItemsWrap>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {bakery.menuReviewList.map((review, idx) => (
          <ReviewView key={'' + review.breadCategoryId + '_' + idx} style={styles.reviewView}>
            <ReviewContent>
              <Quote />
              <Text style={styles.countItemText} numberOfLines={2}>
                {review.contents}
              </Text>
            </ReviewContent>
          </ReviewView>
        ))}
      </ScrollView>
    </BakeryInfoContainer>
  </BakeryCardContainer>
);

export { BakeryCard };

const styles = StyleSheet.create(
  resizePixels({
    bakeryCardContainer: {
      marginBottom: 20,
    },
    bakeryInfoContainer: {
      marginLeft: 8,
      flex: 1,
    },
    bakeryName: {
      fontSize: 16,
      marginVertical: 4,
    },
    countItemsWrap: {
      marginBottom: 8,
      height: 20,
    },
    countItem: {
      marginRight: 8,
    },
    countItemText: {
      fontSize: 12,
    },
    reviewView: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      width: 195,
      marginRight: 8,
      borderRadius: 8,
    },
  })
);

const BakeryCardContainer = styled.View`
  flex-direction: row;
`;

const BakeryName = styled.Text`
  font-weight: bold;
`;

const BakeryInfoContainer = styled.View`
  align-items: flex-start;
  overflow: hidden;
`;

const CountItemsWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CountItem = styled.View`
  flex-direction: row;
`;

const ReviewView = styled.View`
  background-color: ${({ theme }) => theme.color.gray200};
  justify-content: center;
`;

const ReviewContent = styled.View`
  flex-direction: row;
`;
