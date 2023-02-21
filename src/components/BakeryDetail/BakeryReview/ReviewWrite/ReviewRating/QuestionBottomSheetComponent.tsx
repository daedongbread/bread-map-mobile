import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewProps } from 'react-native';

import { Button } from '@/components/Shared/Button/Button';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

import BottomSheet from '@gorhom/bottom-sheet';

type BackdropComponentProps = {
  onClose: () => void;
};

const BackdropComponent = ({ onClose }: BackdropComponentProps) => (
  <TouchableWithoutFeedback onPress={onClose}>
    <View style={styles.backDropContainer} />
  </TouchableWithoutFeedback>
);

type Props = {
  title: string;
  subTitle: string;
  closePage: () => void;
  closeBottomSheet: () => void;
};

export const QuestionBottomSheetComponent = ({ title, subTitle, closePage, closeBottomSheet }: Props) => {
  const ref = useRef<BottomSheet>(null);

  const [snapPoints, setSnapPoints] = useState<[number | string]>(['40%']);

  const onLayout: ViewProps['onLayout'] = e => {
    const height = e.nativeEvent.layout.height;
    if (height) {
      setSnapPoints([height + 50]);
    }
  };

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      onClose={closeBottomSheet}
      handleIndicatorStyle={styles.indicator}
      backdropComponent={() => <BackdropComponent onClose={onPressCloseButton} />}
    >
      <View style={styles.container} onLayout={onLayout}>
        <SplitRow height={24} />
        <Text presets={['subhead', 'bold']} style={styles.title}>
          {title}
        </Text>
        <SplitRow height={16} />
        <Text presets={['body2', 'semibold']} style={styles.subTitle}>
          {subTitle}
        </Text>
        <SplitRow height={32} />
        <View style={styles.footer}>
          <Button style={styles.button} appearance={'terdary'} onPress={onPressCloseButton}>
            계속 쓸래요
          </Button>
          <SplitColumn width={8} />
          <Button style={styles.button} appearance={'primary'} onPress={closePage}>
            그만할게요
          </Button>
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
    title: {
      color: '#000000',
    },
    subTitle: {
      color: theme.color.gray700,
      textAlign: 'center',
    },
    footer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    button: {
      flex: 1,
      backgroundColor: 'white',
    },
  })
);
