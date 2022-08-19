import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/styles/theme';

interface Props {
  title: string;
  bakeryCount: number;
}

export const ContentsHeader: React.FC<Props> = ({ title, bakeryCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
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
    paddingHorizontal: 20,
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
