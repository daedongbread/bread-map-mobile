import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/styles/theme';
import { Text } from '../Shared/Text';

type Props = {
  title: string;
  isSeleted: boolean;
};

export const MenuTab = React.memo(({ title, isSeleted }: Props) => {
  return (
    <View style={[styles.container, isSeleted && styles.activeContainer]}>
      <Text
        color={isSeleted ? theme.color.gray900 : theme.color.gray600}
        presets={['body1', isSeleted ? 'bold' : 'medium']}
      >
        {title}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: 7,
  },
  activeContainer: {
    borderBottomColor: theme.color.primary600,
    borderBottomWidth: 2,
  },
});
