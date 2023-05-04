import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { BreadCry } from '../Shared/Icons/BreadCry';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

type Props = {
  title: string;
  subTitle: string;
};

export const NoData = ({ title, subTitle }: Props) => (
  <View style={styles.container}>
    <BreadCry />
    <SplitRow height={16} />
    <Text style={styles.text} presets={['body1', 'bold']}>
      {title}
    </Text>
    <SplitRow height={8} />
    <Text style={styles.text} presets={['body2', 'medium']}>
      {subTitle}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: theme.color.gray500,
  },
});
