import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  icon: React.ReactNode;
  text: string;
};

export const ReviewSummary: React.FC<Props> = ({ icon, text }) => (
  <View style={styles.container}>
    {icon}
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
    },
    text: {
      marginLeft: 4,
      color: theme.color.gray600,
      fontSize: 12,
    },
  })
);
