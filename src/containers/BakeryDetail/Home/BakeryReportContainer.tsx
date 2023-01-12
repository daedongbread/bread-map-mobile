import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useGetBakery } from '@/apis/bakery';
import { Divider } from '@/components/BakeryDetail/Divider';
import { RatingStars } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewRating/RatingStar';
import { numberFormat } from '@/utils';
import IcPersonCircle from '@shared/Icons/IcPersonCircle.svg';
import { Text } from '@shared/Text';

type Props = {
  bakeryId: number;
};

export const BakeryReportContainer = ({ bakeryId }: Props) => {
  const { bakery } = useGetBakery({ bakeryId });

  return (
    <React.Fragment>
      <Divider />
      <View style={styles.wrapper}>
        <Text presets={['subtitle2', 'bold']} style={{ marginBottom: 4 }}>
          {bakery?.info.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <IcPersonCircle />
          <Text presets={['caption1', 'regular']}> {numberFormat(bakery?.info.reviewNum || 0)}명이 평가했어요!</Text>
        </View>
        <Text style={styles.ratingText}>{bakery?.info.rating}</Text>
        <RatingStars rating={bakery?.info.rating || 0} />
      </View>
    </React.Fragment>
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
