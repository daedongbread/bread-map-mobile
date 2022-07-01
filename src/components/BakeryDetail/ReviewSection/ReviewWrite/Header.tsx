import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/styles/theme';

interface Props {
  bakeryCount: number;
}

export const Header: React.FC<Props> = ({ bakeryCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>메뉴선택</Text>
      <Text style={styles.countText}>{bakeryCount}개</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  titleText: {
    color: '#424242',
    fontSize: 14,
    fontWeight: '700',
  },
  countText: {
    color: theme.color.gray600,
    fontSize: 12,
    fontWeight: '400',
  },
});
