import React from 'react';
import { QuestionBottomSheetComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'QuestionBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'QuestionBottomSheet'>['route'];

export const QuestionBottomSheetContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { title, subTitle } = route.params;

  const closePage = () => {
    navigation.pop(2);
  };

  const closeBottomSheet = () => {
    navigation.goBack();
  };

  return (
    <QuestionBottomSheetComponent
      title={title}
      subTitle={subTitle}
      closePage={closePage}
      closeBottomSheet={closeBottomSheet}
    />
  );
};
