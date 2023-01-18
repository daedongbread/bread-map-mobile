import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import ImageBread from '@shared/Icons/ImageBread.svg';
import { Text } from '@shared/Text';

export const BlockListEmpty = memo(() => {
  return (
    <View style={[styles.container]}>
      <View style={styles.gap}>
        <ImageBread />
      </View>
      <View style={styles.gap}>
        <Text presets={['body1', 'bold']} style={[styles.textColor]}>
          차단한 사용자가 없어요
        </Text>
      </View>
      <View style={[styles.gap, styles.center]}>
        <Text presets={['number2']} style={styles.textColor}>
          불편한 사용자가 있다면 신고를 통해
        </Text>
        <Text presets={['number2']} style={styles.textColor}>
          더 편안 대동빵지도를 즐기세요!
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  gap: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  textColor: {
    color: theme.color.gray500,
  },
});
