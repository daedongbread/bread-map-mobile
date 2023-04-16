import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/styles/theme';
import { Button } from '../Shared/Button/Button';
import { Header } from '../Shared/Header';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

type Props = {
  onPressConfirm: () => void;
};

export const WelcomeComponent = ({ onPressConfirm }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header isCloseButtonShown />

      <SplitRow height={45} />

      <View style={styles.contentsContainer}>
        <Image style={styles.image} source={require('@/components/Shared/Images/welcome.png')} />

        <SplitRow height={30} />

        <Text color={theme.color.gray900} presets={['heading1', 'bold']} style={styles.text}>
          대동빵지도에 오신 걸{'\n'}환영해요!
        </Text>

        <SplitRow height={12} />

        <Text color="#9F9F9F" presets={['body1']} style={styles.text}>
          함께 만드는 빵집지도,{'\n'}지금 당장 빵지순례 떠나볼까요?
        </Text>
      </View>

      <Button style={styles.button} onPress={onPressConfirm} appearance={'primary'}>
        시작하기
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 124,
    height: 154,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
  },
});
