import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StarIcon } from '@/components/Shared/Icons';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { SplitColumn } from '../SplitSpace';
import { Row } from '../View';

type Props = {
  type: 'menu' | 'review';
  rating: number;
  reviewLength?: number;
};

export const BreadRating: React.FC<Props> = ({ type, rating, reviewLength = 0 }) => {
  switch (type) {
    case 'menu':
    default:
      return (
        <View style={menuTypeStyles.container}>
          <StarIcon size={14} fillColor={'orange'} />
          <Text style={menuTypeStyles.rating}>{rating.toFixed(1)}</Text>
          <Text style={menuTypeStyles.count}>({reviewLength})</Text>
        </View>
      );
    case 'review':
      return (
        <Row style={reviewTypeStyles.container}>
          <StarIcon size={13} fillColor={'orange'} />
          <SplitColumn width={4} />
          <Text style={reviewTypeStyles.rating}>{rating}</Text>
        </Row>
      );
  }
};

const menuTypeStyles = StyleSheet.create(
  resizePixels({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      marginLeft: 2,
      marginRight: 2,
      color: theme.color.black,
      fontSize: 12,
    },
    count: {
      color: theme.color.gray600,
      fontSize: 12,
    },
  })
);

const reviewTypeStyles = StyleSheet.create(
  resizePixels({
    container: {
      alignItems: 'center',
    },
    menuName: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.color.gray600,
    },
    rating: {
      color: theme.color.primary500,
      fontSize: 12,
      fontWeight: 'bold',
    },
  })
);
