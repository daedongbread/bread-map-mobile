import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/core';
import ReportBannerFlag from '@shared/Icons/ReportBannerFlag.svg';
import { Text } from '@shared/Text';

export const ReportBanner = () => {
  const navigation = useNavigation<MainStackScreenProps<'MainTab'>['navigation']>();

  const onPressBanner = () => {
    navigation.navigate('MainStack', {
      screen: 'ReportBakeryStack',
      params: {
        screen: 'ReportBakeryOnboard',
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPressBanner}>
      <View style={[styles.layout, styles.row]}>
        <View style={styles.gap}>
          <Text presets={['caption1', 'semibold']} color={'#175747'}>
            내 최애 빵집이 없다니!
          </Text>
          <Text presets={['subhead', 'bold']} color={'white'}>
            제보하고 빵집 개척자 되기
          </Text>
        </View>
        <View style={styles.iconWrapper}>
          <ReportBannerFlag />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  layout: {
    paddingVertical: 22,
    paddingHorizontal: 21,
    backgroundColor: '#62C0A9',
    overflow: 'hidden',
    borderRadius: 8,
    height: 86,
  },
  gap: {
    marginRight: 18,
  },
  iconWrapper: {
    position: 'relative',
  },
});
