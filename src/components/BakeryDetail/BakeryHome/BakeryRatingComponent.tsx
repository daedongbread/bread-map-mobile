import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakerySingleEntity } from '@/apis/bakery/types';
import { Text } from '@/components/Shared/Text';
import { numberFormat } from '@/utils';
import IcPersonCircle from '@shared/Icons/IcPersonCircle.svg';
import { RatingStars } from '../BakeryReview/ReviewWrite/ReviewRating/RatingStar';
import { Divider } from '../Divider';

type Props = {
  bakery: BakerySingleEntity | null;
};

export const BakeryRatingComponent = ({ bakery }: Props) => {
  return (
    <>
      <Divider />
      <View style={styles.wrapper}>
        <Text presets={['subhead', 'bold']} style={{ marginBottom: 4 }}>
          {bakery?.bakeryInfo.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <IcPersonCircle />
          <Text presets={['caption1', 'medium']}>
            {' '}
            {numberFormat(bakery?.bakeryInfo.reviewNum || 0)}명이 평가했어요!
          </Text>
        </View>
        <Text style={styles.ratingText}>{bakery?.bakeryInfo.rating}</Text>
        <RatingStars rating={bakery?.bakeryInfo.rating || 0} />
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
    lineHeight: 24,
  },
  ratingText: {
    marginHorizontal: 4,
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 56,
  },
  ratingWrapper: {
    flexDirection: 'row',
  },
});
