import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { RatedBread, UpdateSeletedBreadRating } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
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
      <Text presets={['body2', 'bold']} style={styles.title}>
        빵 평점
      </Text>
      {selectedBreads.map((bread, index) => (
        <RatingRow key={index} bread={bread} onUpdateBreadRating={onUpdateBreadRating} />
      ))}
      <SplitRow height={32} />
      <AddButton
        onPress={() => {
          navigation.pop();
        }}
        buttonText="메뉴 추가하기"
      />
      <SplitRow height={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  title: {
    color: theme.color.gray900,
  },
});
