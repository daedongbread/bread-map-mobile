import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewProps } from 'react-native';

import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

import BottomSheet from '@gorhom/bottom-sheet';
import { Button } from '../Button';

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
  onClose: () => void;
  closeBottomSheet: () => void;
};

export const AlertBottomSheetComponent = React.forwardRef<BottomSheet, Props>(
  ({ title, subTitle, onClose, closeBottomSheet }, ref) => {
    const [snapPoints, setSnapPoints] = useState<[number | string]>(['40%']);

    const onLayout: ViewProps['onLayout'] = e => {
      const height = e.nativeEvent.layout.height;
      if (height) {
        setSnapPoints([height + 50]);
      }
    };

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        onClose={onClose}
        handleIndicatorStyle={styles.indicator}
        backdropComponent={() => <BackdropComponent onClose={closeBottomSheet} />}
      >
        <View onLayout={onLayout}>
          <View style={styles.container}>
            <SplitRow height={16} />

            <Text color={theme.color.gray900} presets={['heading2', 'bold']} style={styles.text}>
              {title}
            </Text>

            <SplitRow height={8} />

            <Text color={theme.color.gray600} presets={['body2', 'regular']} style={styles.text}>
              {subTitle}
            </Text>
          </View>

          <SplitRow height={24} />

          <View style={styles.footer}>
            <Button onPress={onClose}>확인</Button>
          </View>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create(
  resizePixels({
    backDropContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    indicator: {
      backgroundColor: theme.color.gray300,
    },
    text: {
      textAlign: 'center',
    },
    container: {
      alignItems: 'center',
    },
    image: {
      width: 92,
      height: 60,
    },
    footer: {
      paddingHorizontal: 20,
    },
  })
);
