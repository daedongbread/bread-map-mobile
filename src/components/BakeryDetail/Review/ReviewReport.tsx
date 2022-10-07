import { CircleFlag, StarIcon } from '@/components/Shared/Icons';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from '../Divider';
import { ReviewSummary } from '../Home/ReviewSummary';

const ReviewReport: React.FC = () => {
  const { bakery } = useBakeryDetail();

  return (
    <React.Fragment>
      <Divider />
      <View style={styles.wrapper}>
        <Text style={styles.h1Text}>{bakery?.info.name}</Text>
        <ReviewSummary text={'1,200'} icon={<CircleFlag />} />
        <Text style={styles.ratingText}>{bakery?.info.rating}</Text>
        <View style={styles.ratingWrapper}>
          <StarIcon size={16} fillColor="orange" />
          <StarIcon size={16} fillColor="orange" />
          <StarIcon size={16} fillColor="orange" />
          <StarIcon size={16} fillColor="orange" />
          <StarIcon size={16} fillColor="gray" />
        </View>
      </View>
    </React.Fragment>
  );
};

export { ReviewReport };

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 24,
  },
  h1Text: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  ratingText: {
    marginHorizontal: 4,
    fontSize: 48,
    fontWeight: '700',
  },
  ratingWrapper: {
    flexDirection: 'row',
  },
});
