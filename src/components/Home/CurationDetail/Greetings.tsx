import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DonutHoldingFlag } from '@/components/Shared/Icons/DonutHoldingFlag';
import { Triangle } from '@/components/Shared/Icons/Triangle';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  text: string;
};

export const Greetings: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.row}>
      <DonutHoldingFlag />
      <SplitColumn width={15} />
      <View style={styles.row}>
        <Triangle />
        <View style={styles.speechBubbleContainer}>
          <View style={styles.speechBubble}>
            <Text presets={['caption2']} color={theme.color.gray900}>
              {text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    speechBubbleContainer: {
      paddingHorizontal: 14,
      paddingVertical: 12,
      backgroundColor: theme.color.gray100,
      borderRadius: 4,
    },
    speechBubble: {
      width: 165,
    },
  })
);
