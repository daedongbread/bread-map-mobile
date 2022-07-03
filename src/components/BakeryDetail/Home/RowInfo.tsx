import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  icon: React.ReactNode;
  text: string;
};

export const RowInfo: React.FC<Props> = ({ icon, text }) => (
  <View style={styles.row}>
    {icon}
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create(
  resizePixels({
    row: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    text: {
      marginLeft: 8,
      color: theme.color.gray600,
      fontSize: 12,
    },
  })
);
