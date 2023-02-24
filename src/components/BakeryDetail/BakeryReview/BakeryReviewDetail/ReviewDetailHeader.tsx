import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BakeryInfo } from '@/apis/bakery/types';
import { LocationMarker } from '@/components/Shared/Icons';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { resizePixels } from '@/utils';

const tempImage = 'https://cdn.paris.spl.li/wp-content/uploads/까방베르-치즈-후레쉬번_썸네일1-1280x1280.png';

type Props = {
  bakery: BakeryInfo;
};

export const ReviewDetailHeader = ({ bakery }: Props) => {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.bakeryImage} source={{ uri: review.bakeryInfo.bkaeryImage }} /> */}
      <Image style={styles.image} source={{ uri: tempImage }} />
      <SplitColumn width={8} />
      <View>
        <Text presets={['body1', 'bold']} style={styles.nameText}>
          {bakery.bakeryName}
        </Text>
        <SplitRow height={2} />
        <View style={styles.addressContainer}>
          <LocationMarker />
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
    addressText: {
      color: '#424242',
      fontSize: 12,
      fontWeight: '400',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
