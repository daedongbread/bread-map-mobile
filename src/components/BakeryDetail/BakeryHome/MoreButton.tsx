import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@/components/Shared/Button/Button';
import { Text } from '@/components/Shared/Text';
import { resizePixels } from '@/utils';

type Props = {
  text: string;
  onPress: () => void;
};

export const MoreButton = ({ text, onPress }: Props) => {
  return (
    <Button size="large" onPress={onPress} appearance="terdary" style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Button>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    button: {
      marginHorizontal: 20,
      marginBottom: 30,
    },
    text: {
      fontSize: 14,
      fontWeight: '700',
    },
  })
);
