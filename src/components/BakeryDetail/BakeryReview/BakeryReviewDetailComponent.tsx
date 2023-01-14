import React from 'react';
import { View } from 'react-native';
import { BakeryReviewEntity, BakerySingleEntity } from '@/apis/bakery/types';
import { Text } from '@/components/Shared/Text';

type Props = {
  review: BakeryReviewEntity;
  info: BakerySingleEntity['info'];
};

export const BakeryReviewDetailComponent = ({ review, info }: Props) => {
  return (
    <View>
      <Text>
        Review Detail {info.name} {review.content}
      </Text>
    </View>
  );
};
