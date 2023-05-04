import React from 'react';
import { View } from 'react-native';
import { SplitRow } from '@/components/Shared/SplitSpace';
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
    <View>
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
