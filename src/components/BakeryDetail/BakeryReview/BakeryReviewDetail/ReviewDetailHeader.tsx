import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BakeryInfo } from '@/apis/bakery/types';
import { LocationMarker } from '@/components/Shared/Icons';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { resizePixels } from '@/utils';

type Props = {
  bakery: BakeryInfo;
};

const { width } = Dimensions.get('screen');

export const ReviewDetailHeader = ({ bakery }: Props) => {
  return (
    <View style={styles.container}>
      <FastImage style={styles.image} resizeMode="cover" source={{ uri: bakery.bakeryImage }} />
      <SplitColumn width={8} />
      <View>
        <Text presets={['body1', 'bold']} style={styles.nameText}>
          {bakery.bakeryName}
        </Text>
        <SplitRow height={4} />
        <View style={styles.addressContainer}>
          <LocationMarker style={styles.marker} />
          <SplitColumn width={2} />
          <Text presets={['caption2', 'medium']} style={styles.addressText}>
            {bakery.bakeryAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    image: {
      width: 48,
      height: 48,
      borderRadius: 4,
    },
    nameText: {
      color: '#222222',
      fontSize: 16,
      fontWeight: '700',
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    marker: {
      alignSelf: 'flex-start',
    },
    addressText: {
      maxWidth: width * 0.65,
      color: '#424242',
      lineHeight: 13,
    },
  })
);
