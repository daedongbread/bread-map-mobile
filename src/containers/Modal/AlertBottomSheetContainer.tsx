import React, { useRef } from 'react';
import { LogBox } from 'react-native';
import { AlertBottomSheetComponent } from '@/components/Shared/Modal';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation, useRoute } from '@react-navigation/native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

type Navigation = MainStackScreenProps<'AlertBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'AlertBottomSheet'>['route'];

export const AlertBottomSheetContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { title, subTitle } = route.params;

  const ref = useRef<BottomSheet>(null);

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <AlertBottomSheetComponent
      ref={ref}
      title={title}
      subTitle={subTitle}
      onClose={onClose}
      closeBottomSheet={onPressCloseButton}
    />
  );
};
