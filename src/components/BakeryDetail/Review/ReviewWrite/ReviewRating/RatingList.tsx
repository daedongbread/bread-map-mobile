import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { RatedBread, UpdateSeletedBreadRating } from '@/slices/reviewWrite';
import { useNavigation } from '@react-navigation/native';
import { AddButton } from '../ReviewSelect/AddButton';
import { RatingRow } from './RatingRow';

type Props = {
  selectedBreads: RatedBread[];
  onUpdateBreadRating: ({ id, rating, type }: UpdateSeletedBreadRating) => void;
};

export const RatingList: React.FC<Props> = ({ selectedBreads, onUpdateBreadRating }) => {
  const navigation = useNavigation<MainStackScreenProps<'ReviewWriteStack'>['navigation']>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>빵 평점</Text>
      {selectedBreads.map((bread, index) => (
        <RatingRow key={index} bread={bread} onUpdateBreadRating={onUpdateBreadRating} />
      ))}
      <AddButton
        onPress={() => {
          navigation.pop();
        }}
        buttonText="메뉴 추가하기"
      />
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
