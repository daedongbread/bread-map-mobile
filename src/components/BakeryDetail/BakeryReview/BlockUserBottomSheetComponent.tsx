import React, { useState } from 'react';
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
  blockUser: () => void;
  onClose: () => void;
  closeBottomSheet: () => void;
};

export const BlockUserBottomSheetComponent = React.forwardRef<BottomSheet, Props>(
  ({ blockUser, onClose, closeBottomSheet }, ref) => {
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
        <View style={styles.container} onLayout={onLayout}>
          <SplitRow height={24} />
          <Text presets={['subhead', 'bold']} style={styles.title}>
            이 사용자를 차단하시겠어요?
          </Text>
          <SplitRow height={16} />
          <Text presets={['body2', 'semibold']} style={styles.subTitle}>
            더이상 사용자의 게시물을 볼 수 없으며,{'\n'}상대방에게 회원님의 차단 정보는 알리지 않습니다.
          </Text>
          <SplitRow height={32} />
          <View style={styles.footer}>
            <Button style={styles.button} appearance={'terdary'} onPress={onClose}>
              아니오
            </Button>
            <SplitColumn width={8} />
            <Button style={styles.button} appearance={'primary'} onPress={blockUser}>
              네
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
