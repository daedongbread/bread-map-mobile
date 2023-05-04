import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { resizePixels } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import happyBread from '@shared/Images/happyBread.png';
import { BackdropComponent } from '../Profile';
import { Button } from '../Shared/Button/Button';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

type Props = {
  bottomSheetRef: any;
  title: string;
  onPress: () => void;
};

export const ReportSuccessBottomSheet: React.FC<Props> = ({ bottomSheetRef, title, onPress }) => {
  const snapPoints = useMemo(() => [274], []);

  const onConfirmClick = () => {
    bottomSheetRef.current?.close();
    onPress();
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
        <SplitRow height={20} />
        <FastImage style={styles.Image} source={happyBread} />
        <SplitRow height={20} />
        <Text presets={['subhead', 'bold']} style={styles.Title}>
          {`${title} 감사해요!`}
        </Text>
        <Text presets={['subhead', 'bold']} style={styles.Title}>
          심사과정을 거쳐 반영할게요!
        </Text>
        <SplitRow height={30} />
        <View style={styles.ButtonWrap}>
          <Button onPress={onConfirmClick} style={styles.Button}>
            확인
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      flex: 1,
      alignItems: 'center',
    },
    Image: {
      width: 92,
      height: 60,
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
      marginTop: 'auto',
      marginBottom: 16,
    },
    Button: {
      flex: 1,
    },
  })
);
