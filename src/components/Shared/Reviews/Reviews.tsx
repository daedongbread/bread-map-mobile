import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { resizePixels } from '@/utils';
import Review from './Review';
import { Button } from '../Button/Button';
import { BakeryReviewEntity } from '@/apis/bakery/types';

type ReviewsProps = {
  headerComponent?: React.ReactElement;
  reviews: BakeryReviewEntity[];
  onPress: (review: BakeryReviewEntity) => void;
};

const Reviews: React.FC<ReviewsProps> = ({ headerComponent, reviews, onPress }) => (
  <FlatList
    ListHeaderComponent={headerComponent}
    ListHeaderComponentStyle={styles.header}
    data={reviews}
    keyExtractor={review => review.id.toString()}
    renderItem={({ item }) => <Review review={item} onPress={onPress} />}
    ListFooterComponent={
      <Button size="large" appearance="terdary" style={{ marginHorizontal: 20, marginVertical: 32 }}>
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
