import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewProps } from 'react-native';

import { Button } from '@/components/Shared/Button/Button';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

type BackdropComponentProps = {
  onClose: () => void;
};

const BackdropComponent = ({ onClose }: BackdropComponentProps) => (
  <TouchableWithoutFeedback onPress={onClose}>
    <View style={styles.backDropContainer} />
  </TouchableWithoutFeedback>
);

type Props = {
  reviewId: number;
  userId: number;
};

type Navigation = MainStackScreenProps<'ReviewMoreBottomSheet'>['navigation'];

export const ReviewMoreBottomSheetComponent = ({ reviewId, userId }: Props) => {
  const navigation = useNavigation<Navigation>();

  const ref = useRef<BottomSheet>(null);
  const [snapPoints, setSnapPoints] = useState<[number | string]>(['40%']);

  const buttonList = [
    { text: '신고하기', onClick: () => reportReview() },
    { text: '이 사용자의 글 보지 않기', onClick: () => blockUser() },
  ];

  const onLayout: ViewProps['onLayout'] = e => {
    const height = e.nativeEvent.layout.height;
    if (height) {
      setSnapPoints([height + 50]);
    }
  };

  const reportReview = () => {
    onClose();
    navigation.navigate('ModalStack', {
      screen: 'ReportReview',
      params: {
        reviewId,
      },
    });
  };

  const blockUser = () => {
    onClose();
    navigation.navigate('BlockUserBottomSheet', {
      userId,
    });
  };

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  const onClose = () => {
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
        {buttonList.map(item => (
          <TouchableOpacity key={item.text} style={styles.textButtonContainer} onPress={item.onClick}>
            <Text presets={['body1', 'bold']} style={styles.buttonText}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
        <SplitRow height={12} />
        <View style={styles.footer}>
          <Button style={styles.button} appearance={'terdary'} onPress={onPressCloseButton}>
            닫기
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
