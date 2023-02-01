import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { resizePixels } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { BackdropComponent } from '../Profile';
import { Button } from '../Shared/Button/Button';
import { SplitColumn, SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

export function CancelBottomSheet({ bottomSheetRef }: any) {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();
  const snapPoints = useMemo(() => [228], []);

  const onKeepClick = () => {
    bottomSheetRef.current?.close();
  };

  const onCancelClick = () => {
    navigation.pop();
  };

  return (
    <BottomSheet
      backdropComponent={props => <BackdropComponent {...props} behavior="none" />}
      // eslint-disable-next-line react-native/no-inline-styles
      handleIndicatorStyle={{ backgroundColor: '#E0E0E0' }}
      index={-1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <View style={styles.Container}>
        <SplitRow height={24} />
        <Text presets={['subhead', 'bold']} style={styles.Title}>
          삭제 요청을 그만할까요?
        </Text>
        <SplitRow height={16} />
        <Text presets={['body2', 'medium']} style={styles.SubTitle}>
          삭제한 글은 되돌릴 수 없으니 신중히 생각해주세요!
        </Text>
        <SplitRow height={32} />
        <View style={styles.ButtonWrap}>
          <Button onPress={onKeepClick} style={styles.Button} appearance="terdary">
            계속 쓸래요
          </Button>
          <SplitColumn width={8} />
          <Button onPress={onCancelClick} style={styles.Button}>
            그만할게요
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
      width: 170,
      textAlign: 'center',
    },
    ButtonWrap: {
      flexDirection: 'row',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 'auto',
      marginBottom: 16,
    },
    Button: {
      flex: 1,
    },
  })
);
