import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/core';
import ReportBannerFlag from '@shared/Icons/ReportBannerFlag.svg';
import { Text } from '@shared/Text';
import { SplitRow } from '../Shared/SplitSpace';
import { Row } from '../Shared/View';

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
    <Pressable style={styles.container} onPress={onPressBanner}>
      <Row style={styles.layout}>
        <View>
          <Text presets={['caption2', 'medium']} color={'#175747'}>
            내 최애 빵집이 없다니!
          </Text>
          <SplitRow height={2} />
          <Text presets={['subhead', 'bold']} color={theme.color.gray900}>
            제보하고 빵집 개척자 되기
          </Text>
        </View>

        <View style={styles.iconWrapper}>
          <ReportBannerFlag />
        </View>
      </Row>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  layout: {
    paddingTop: 22,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#D7EFE9',
    borderRadius: 8,
  },
  iconWrapper: {
    position: 'relative',
  },
});
