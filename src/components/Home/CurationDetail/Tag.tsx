import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  text: string;
};

export const Tag: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text presets={['body2']} color={theme.color.primary600}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      backgroundColor: theme.color.primary100,
      paddingVertical: 5,
      paddingHorizontal: 6,
      borderRadius: 2,
      marginRight: 8,
      marginBottom: 5,
    },
  })
);
