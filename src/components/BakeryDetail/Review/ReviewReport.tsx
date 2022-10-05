import { CircleFlag, StarIcon } from '@/components/Shared/Icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from '../Divider';
import { ReviewSummary } from '../Home/ReviewSummary';

const ReviewReport: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.h1Text}>storeName</Text>
      <ReviewSummary text={'1,200'} icon={<CircleFlag />} />
      <Text style={styles.ratingText}>4.0</Text>
      <View style={styles.ratingWrapper}>
        <StarIcon size={16} fillColor="orange" />
        <StarIcon size={16} fillColor="orange" />
        <StarIcon size={16} fillColor="orange" />
        <StarIcon size={16} fillColor="orange" />
        <StarIcon size={16} fillColor="gray" />
      </View>
    </View>
  );
};

export { ReviewReport };

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 24,
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
