import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import BannerLogo from '@shared/Icons/BannerLogo.svg';

export const BottomBanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text color="#A7ABBF" presets={['caption1', 'medium']}>
          대빵팀에게 하고싶은 말이 있다면?
        </Text>
        <Text color={theme.color.white} presets={['subhead', 'bold']}>
          의견 남기러 가기
        </Text>
      </View>

      <BannerLogo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#34353C',
    paddingVertical: 13,
    paddingHorizontal: 30,
  },
  textContainer: {
    justifyContent: 'center',
  },
});
