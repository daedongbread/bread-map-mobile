import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StarIcon } from '@/components/Shared/Icons';

type Props = {
  rating?: number;
  onPressRatingStar: (rating: number) => void;
};

const DEFAULT_RATING_COUNT = 5;

export const RatingStars: React.FC<Props> = ({ rating = 0, onPressRatingStar }) => {
  useEffect(() => {
    // Array.from(Array(DEFAULT_RATING_COUNT), (_, i) => i + 1).map(i => );
  }, []);
  return (
    <View style={styles.container}>
      {Array.from(Array(DEFAULT_RATING_COUNT), (_, i) => i + 1).map(i => (
        <TouchableOpacity style={styles.star} onPress={() => onPressRatingStar(i)} key={i}>
          <StarIcon fillColor={rating >= i ? 'orange' : 'gray'} width={32} height={32} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    paddingRight: 2,
  },
});
