import React, { useRef } from 'react';
import { LogBox } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ImageItemBottomSheetComponent } from '@/components/Shared/Modal';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation, useRoute } from '@react-navigation/native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export type ImageItemBttomSheetButtonType = {
  image: React.FC<SvgProps>;
  title: string;
  onPress: () => void;
};

type Navigation = MainStackScreenProps<'ImageItemBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'ImageItemBottomSheet'>['route'];

export const ImageItemBottomSheetContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { buttonList } = route.params;

  const ref = useRef<BottomSheet>(null);

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <ImageItemBottomSheetComponent
      ref={ref}
      buttonList={buttonList}
      onClose={onClose}
      closeBottomSheet={onPressCloseButton}
    />
  );
};
