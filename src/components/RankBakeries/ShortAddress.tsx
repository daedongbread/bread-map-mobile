import React from 'react';
import { StyleSheet, View } from 'react-native';
import IcLocation from '@shared/Icons/IcLocation.svg';
import { Text } from '@shared/Text';

export const ShortAddress = (props: { shortAddress: string }) => {
  return (
    <View style={[styles.row, styles.shortAddressWrapper]}>
      <View style={styles.icLocation}>
        <IcLocation />
      </View>
      <Text presets={['caption1', 'medium']} color={'gray500'} style={styles.shortAddress}>
        {props.shortAddress}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  shortAddressWrapper: {
    alignItems: 'center',
    marginBottom: 13,
  },
  icLocation: {
    width: 15,
    height: 15,
  },
  shortAddress: {
    lineHeight: 13,
  },
});
