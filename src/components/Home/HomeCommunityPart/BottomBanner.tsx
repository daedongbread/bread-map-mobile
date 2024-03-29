import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import BannerLogo from '@shared/Icons/BannerLogo.svg';

const URL = 'https://forms.gle/vMNv84pZL38gY8vC8';

export const BottomBanner = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(URL)}>
      <View style={styles.textContainer}>
        <Text color="#A7ABBF" presets={['caption1', 'medium']}>
          대빵팀에게 하고싶은 말이 있다면?
        </Text>
        <Text color={theme.color.white} presets={['subhead', 'bold']}>
          의견 남기러 가기
        </Text>
      </View>

      <BannerLogo />
    </TouchableOpacity>
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
