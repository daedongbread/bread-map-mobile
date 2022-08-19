import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { updateSeletedBakeryRating } from '@/slices/review';
import { AddButton } from '../ReviewSelect/AddButton';
import { RatingRow } from './RatingRow';

type Props = {
  selectedBakery: BakeryType[];
  onUpdateBakeryRating: ({ id, rating }: updateSeletedBakeryRating) => void;
};

export const RatingList: React.FC<Props> = ({ selectedBakery, onUpdateBakeryRating }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>빵 평점</Text>
      {selectedBakery.map(item => (
        <RatingRow bakery={item} onUpdateBakeryRating={onUpdateBakeryRating} />
      ))}
      <AddButton onPress={() => null} buttonText="메뉴 추가하기" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingLeft: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
});
