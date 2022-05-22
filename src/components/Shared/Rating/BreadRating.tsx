import React from 'react';
import { Text, View } from 'react-native';
import { StarIcon } from '@/components/Shared/Icons';

type RatingProps = {
  rating: string;
  reviewLength?: number;
};

const BreadRating: React.FC<RatingProps> = ({ rating, reviewLength }) => {
  return (
    <View>
      <StarIcon size={16} fillColor={'orange'} />
      <Text>{rating}</Text>
      {reviewLength && <Text>({reviewLength})</Text>}
    </View>
  );
};

export { BreadRating };
