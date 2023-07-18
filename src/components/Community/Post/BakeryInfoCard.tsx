import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LocationMarker } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import MoreIcon from '@shared/Icons/MoreIcon.svg';

type Props = {};

export const BakeryInfoCard = ({}: Props) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Image style={styles.bakeryImage} source={{ uri: 'https://picsum.photos/48/48' }} />
      <SplitColumn width={19} />
      <View style={styles.bakeryInfoContainer}>
        <Text color="#222222" presets={['body2', 'bold']}>
          루엘드 파리
        </Text>

        <View style={styles.adressRow}>
          <LocationMarker />
          <SplitColumn width={4} />
          <Text color="#424242" presets={['caption2', 'medium']}>
            서울 서초구
          </Text>
        </View>
      </View>
    </View>

    <View>
      <MoreIcon width={24} height={24} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.color.gray200,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
  },
  bakeryImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  bakeryInfoContainer: {
    justifyContent: 'center',
  },
  adressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
