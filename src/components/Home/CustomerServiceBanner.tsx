import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import BannerLogo from '@shared/Icons/BannerLogo.svg';
import { SplitRow } from '../Shared/SplitSpace';

const URL = 'https://forms.gle/vMNv84pZL38gY8vC8';

export const CustomerServiceBanner = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(URL)}>
      <View style={styles.textContainer}>
        <Text color="#34353B" presets={['caption2', 'medium']}>
          대빵팀에게 하고싶은 말이 있다면?
        </Text>
        <SplitRow height={2} />
        <Text color={theme.color.gray900} presets={['subhead', 'bold']}>
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
    alignItems: 'center',
    backgroundColor: '#E2E3ED',
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  textContainer: {
    justifyContent: 'center',
  },
});
