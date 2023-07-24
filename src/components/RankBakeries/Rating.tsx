import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import IcReport from '@shared/Icons/IcReport.svg';
import IcStart from '@shared/Icons/IcStar.svg';
import { Text } from '@shared/Text';

export const Rating = (props: { flagNum: number; rating: number }) => {
  return (
    <View style={[styles.row]}>
      <View style={[styles.row, styles.alignCenter, styles.reportIconWrapper]}>
        <View style={styles.icon}>
          <IcReport style={styles.primaryColor} />
        </View>
        <Text presets={['caption1']} style={styles.shortAddress} color={'gray900'}>
          {props.flagNum}
        </Text>
      </View>
      <View style={[styles.row, styles.alignCenter]}>
        <View style={styles.icon}>
          <IcStart style={styles.primaryColor} />
        </View>
        <Text presets={['caption1']} style={styles.shortAddress} color={'gray900'}>
          {props.rating}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  reportIconWrapper: {
    marginRight: 8,
  },
  shortAddressWrapper: {
    alignItems: 'center',
    marginBottom: 13,
  },
  icon: {
    width: 16,
    height: 16,
  },
  icLocation: {
    width: 15,
    height: 15,
  },
  primaryColor: {
    color: theme.color.primary600,
  },
  shortAddress: {
    lineHeight: 13,
  },
});
