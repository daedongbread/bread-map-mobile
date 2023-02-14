import React from 'react';
import { QuestionBottomSheetComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'QuestionBottomSheet'>['navigation'];

export const QuestionBottomSheetContainer = () => {
  const navigation = useNavigation<Navigation>();

  const closePage = () => {
    navigation.pop(2);
  };

  const closeBottomSheet = () => {
    navigation.goBack();
  };

  return <QuestionBottomSheetComponent closePage={closePage} closeBottomSheet={closeBottomSheet} />;
};
