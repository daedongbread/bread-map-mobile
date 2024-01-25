import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewProps } from 'react-native';

import FastImage from 'react-native-fast-image';
import { Button } from '@/components/Shared/Button/Button';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';

import BottomSheet from '@gorhom/bottom-sheet';

import { useNavigation, useRoute } from '@react-navigation/native';
import happyBread from '@shared/Images/happyBread.png';

type BackdropComponentProps = {
  onClose: () => void;
};

const BackdropComponent = ({ onClose }: BackdropComponentProps) => (
  <TouchableWithoutFeedback onPress={onClose}>
    <View style={styles.backDropContainer} />
  </TouchableWithoutFeedback>
);

type Navigation = MainStackScreenProps<'SuccessBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'SuccessBottomSheet'>['route'];

export const SuccessBottomSheet = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const ref = useRef<BottomSheet>(null);
  const [snapPoints, setSnapPoints] = useState<[number | string]>(['40%']);

  const { content, onPressConfirmButton } = route.params;

  const onLayout: ViewProps['onLayout'] = e => {
    const height = e.nativeEvent.layout.height;

    if (height) {
      setSnapPoints([height + 50]);
    }
  };

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  const onClose = () => {
    if (onPressConfirmButton) {
      onPressConfirmButton();
    }

    navigation.goBack();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      onClose={onClose}
      handleIndicatorStyle={styles.indicator}
      backdropComponent={() => <BackdropComponent onClose={onPressCloseButton} />}
    >
      <View onLayout={onLayout}>
        <View style={styles.container}>
          <SplitRow height={20} />
          <FastImage style={styles.image} source={happyBread} />
          <SplitRow height={20} />
          <Text presets={['subhead', 'bold']} style={styles.title}>
            {content}
          </Text>
        </View>
        <SplitRow height={30} />
        <View style={styles.footer}>
          <Button onPress={onClose}>확인</Button>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    backDropContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    indicator: {
      backgroundColor: '#E0E0E0',
    },
    container: {
      alignItems: 'center',
    },
    image: {
      width: 92,
      height: 60,
    },
    title: {
      color: '#000000',
      textAlign: 'center',
    },
    footer: {
      paddingHorizontal: 20,
    },
  })
);
