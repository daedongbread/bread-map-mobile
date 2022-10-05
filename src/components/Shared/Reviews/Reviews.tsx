import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { BakeryReview, resizePixels } from '@/utils';
import Review from './Review';
import { Button } from '../Button/Button';

type ReviewsProps = {
  headerComponent?: React.ReactElement;
  reviews: BakeryReview[];
  onPress: (review: BakeryReview) => void;
};

const Reviews: React.FC<ReviewsProps> = ({ headerComponent, reviews, onPress }) => (
  <FlatList
    ListHeaderComponent={headerComponent}
    ListHeaderComponentStyle={styles.header}
    data={reviews}
    keyExtractor={review => review.menuReviewId.toString()}
    renderItem={({ item }) => <Review review={item} onPress={onPress} />}
    ListFooterComponent={
      <Button size="large" appearance="terdary" style={{ marginHorizontal: 20, marginBottom: 32 }}>
        <Text style={styles.footerButtonText}>전체메뉴보기</Text>
      </Button>
    }
  />
);

export { Reviews };

const styles = StyleSheet.create(
  resizePixels({
    header: {
      marginHorizontal: 20,
    },
    footerButtonText: {
      fontSize: 14,
      fontWeight: '700',
    },
  })
);
