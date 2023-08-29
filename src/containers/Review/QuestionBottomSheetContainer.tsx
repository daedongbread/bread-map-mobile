import React, { useRef } from 'react';
import { QuestionBottomSheetComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation, useRoute } from '@react-navigation/native';

type Navigation = MainStackScreenProps<'QuestionBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'QuestionBottomSheet'>['route'];

export const QuestionBottomSheetContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const ref = useRef<BottomSheet>(null);

  const {
    title,
    subTitle,
    leftButtonText = '계속 쓸래요',
    rightButtonText = '그만할게요',
    onPressLeftButton = () => onPressCloseButton(),
    onPressRightButton,
  } = route.params;

  const _onPressRightButton = () => {
    if (onPressRightButton) {
      closeBottomSheet();
      onPressRightButton();
    } else {
      closePage();
    }
  };

  const closePage = () => {
    navigation.pop(2);
  };

  const closeBottomSheet = () => {
    navigation.goBack();
  };

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  return (
    <QuestionBottomSheetComponent
      ref={ref}
      title={title}
      subTitle={subTitle}
      leftButtonText={leftButtonText}
      rightButtonText={rightButtonText}
      onPressLeftButton={onPressLeftButton}
      onPressRightButton={_onPressRightButton}
      closeBottomSheet={closeBottomSheet}
      onPressCloseButton={onPressCloseButton}
    />
  );
};
