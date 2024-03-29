import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { SplitColumn } from '../SplitSpace';
import { Text } from '../Text';

type Props = {
  icon: React.FC<SvgProps>;
  count: number;
  defaultText: string;
  isActive?: boolean;
  onPress: () => void;
};

export const InteractionButton = ({ icon, count, defaultText, isActive, onPress }: Props) => {
  const item = { icon };
  const iconColor = isActive ? theme.color.primary500 : theme.color.gray400;
  const textColor = isActive ? theme.color.primary500 : '#666666';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <item.icon fill={iconColor} />
      <SplitColumn width={2} />
      {count > 0 ? (
        <Text presets={['caption1', 'medium']} style={[styles.count, { color: textColor }]}>
          {count}
        </Text>
      ) : (
        <Text presets={['caption2', 'medium']} style={[styles.defaultText]}>
          {defaultText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    count: {
      color: theme.color.gray700,
    },
    defaultText: {
      color: theme.color.gray700,
    },
  })
);
