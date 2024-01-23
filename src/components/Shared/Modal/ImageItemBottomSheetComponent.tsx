import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewProps } from 'react-native';

import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { ImageItemBttomSheetButtonType } from '@/containers/Modal/ImageItemBottomSheetContainer';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

import BottomSheet from '@gorhom/bottom-sheet';
import BigRightArrow from '@shared/Icons/BigRightArrow.svg';
import { Row } from '../View';

type BackdropComponentProps = {
  onClose: () => void;
};

const BackdropComponent = ({ onClose }: BackdropComponentProps) => (
  <TouchableWithoutFeedback onPress={onClose}>
    <View style={styles.backDropContainer} />
  </TouchableWithoutFeedback>
);

type Props = {
  buttonList: ImageItemBttomSheetButtonType[];
  onClose: () => void;
  closeBottomSheet: () => void;
};

export const ImageItemBottomSheetComponent = React.forwardRef<BottomSheet, Props>(
  ({ buttonList, onClose, closeBottomSheet }, ref) => {
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
          <SplitRow height={16} />
          {buttonList.map(button => {
            return (
              <TouchableOpacity
                key={button.title}
                onPress={() => {
                  // closeBottomSheet();
                  button.onPress();
                }}
              >
                <Row style={styles.textButtonContainer}>
                  <Row style={styles.textButtonLeftContainer}>
                    <View style={styles.imageContainer}>
                      <button.image width={16} height={16} stroke={theme.color.primary600} strokeWidth={2} />
                    </View>

                    <SplitColumn width={12} />

                    <Text color={theme.color.gray900} presets={['body2', 'bold']} style={styles.buttonText}>
                      {button.title}
                    </Text>
                  </Row>

                  <BigRightArrow />
                </Row>
              </TouchableOpacity>
            );
          })}
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
      backgroundColor: '#E0E0E0',
    },
    textButtonContainer: {
      paddingBottom: 20,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonText: {
      color: theme.color.gray900,
      fontSize: 16,
      fontWeight: '700',
    },
    imageContainer: {
      backgroundColor: theme.color.primary50,
      padding: 12,
      borderRadius: 50,
    },
    textButtonLeftContainer: {
      alignItems: 'center',
    },
  })
);
