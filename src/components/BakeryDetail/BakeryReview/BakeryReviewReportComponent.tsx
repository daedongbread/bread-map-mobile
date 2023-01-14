import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakerySingleEntity } from '@/apis/bakery/types';
import { CircleFlag, StarIcon } from '@/components/Shared/Icons';
import { Text } from '@/components/Shared/Text';
import { ReviewSummary } from '../BakeryHome';
import { Divider } from '../Divider';

type Props = {
  bakery: BakerySingleEntity | null;
};

export const BakeryReviewReportComponent = ({ bakery }: Props) => {
  return (
    <>
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
    </>
  );
};

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
