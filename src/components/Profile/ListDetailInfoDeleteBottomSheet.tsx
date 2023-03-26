import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { resizePixels } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { Button } from '../Shared/Button/Button';
import { SplitColumn, SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';
import { BackdropComponent } from './BackdropComponent';

export function ListDetailInfoDeleteBottomSheet({ bottomSheetRef, onConfirmClick }: any) {
  const snapPoints = useMemo(() => [228], []);

  const onCancelClick = () => {
    bottomSheetRef.current?.close();
  };

  // const onConfirmClick = () => {
  //   bottomSheetRef.current?.close();
  // };

  return (
    <BottomSheet
      backdropComponent={BackdropComponent}
      enablePanDownToClose
      // eslint-disable-next-line react-native/no-inline-styles
      handleIndicatorStyle={{ backgroundColor: '#E0E0E0' }}
      index={-1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <View style={styles.Container}>
        <SplitRow height={24} />
        <Text presets={['subhead', 'bold']} style={styles.Title}>
          저장목록을 삭제할까요?
        </Text>
        <SplitRow height={16} />
        <Text presets={['body2', 'medium']} style={styles.SubTitle}>
          {'삭제한 글은 되돌릴 수 없으니\n신중히 생각해주세요!'}
        </Text>
        <SplitRow height={32} />
        <View style={styles.ButtonWrap}>
          <Button onPress={onCancelClick} style={styles.Button} appearance="terdary">
            취소
          </Button>
          <SplitColumn width={8} />
          <Button onPress={onConfirmClick} style={styles.Button}>
            확인
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      flex: 1,
      alignItems: 'center',
    },
    Title: {
      color: 'black',
    },
    SubTitle: {
      color: '#4D4D4D',
      width: 200,
      textAlign: 'center',
    },
    ButtonWrap: {
      flexDirection: 'row',
      marginLeft: 20,
      marginRight: 20,
    },
    Button: {
      flex: 1,
    },
  })
);
