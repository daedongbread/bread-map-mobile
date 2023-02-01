import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StarIcon } from '@/components/Shared/Icons';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  type: 'menu' | 'review';
  menuName?: string;
  rating: number;
  reviewLength?: number;
};

export const BreadRating: React.FC<Props> = ({ type, menuName, rating, reviewLength = 0 }) => {
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
        <View style={reviewTypeStyles.container}>
          <Text style={reviewTypeStyles.menuName}>{menuName}</Text>
          <StarIcon size={13} fillColor={'orange'} />
          <Text style={reviewTypeStyles.rating}>{rating}</Text>
        </View>
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
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.color.gray100,
      borderRadius: 4,
      paddingHorizontal: 4,
      paddingVertical: 4,
    },
    menuName: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.color.gray600,
    },
    rating: {
      marginLeft: 1.5,
      marginRight: 2,
      color: theme.color.primary500,
      fontSize: 12,
      fontWeight: 'bold',
    },
  })
);
