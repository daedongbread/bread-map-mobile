import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewProps } from 'react-native';

import { Button } from '@/components/Shared/Button/Button';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { CommentBottomSheetButtonType } from '@/containers/Community/BottomSheet/CommentMenuBottomSheetContainer';
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
  buttonList: CommentBottomSheetButtonType[];
  onClose: () => void;
  closeBottomSheet: () => void;
};

export const CommentMenuBottomSheetComonent = React.forwardRef<BottomSheet, Props>(
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
          {buttonList.map(item => (
            <TouchableOpacity key={item.text} style={styles.textButtonContainer} onPress={item.onClick}>
              <Text presets={['body1', 'bold']} style={styles.buttonText}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
          <SplitRow height={12} />
          <View style={styles.footer}>
            <Button style={styles.button} appearance={'terdary'} onPress={closeBottomSheet}>
              닫기
            </Button>
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
      backgroundColor: '#E0E0E0',
    },
    textButtonContainer: {
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#EEEEEE',
    },
    buttonText: {
      color: theme.color.gray900,
      fontSize: 16,
      fontWeight: '700',
    },
    footer: {
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: 'white',
    },
  })
);
