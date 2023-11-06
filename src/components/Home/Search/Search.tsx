import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { SearchIcon } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  onPress?: () => void;
};

export const Search = ({ containerStyle, backgroundColor, onPress }: Props) => {
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={() => onPress && onPress()}>
      <View
        style={[
          styles.body,
          {
            backgroundColor: backgroundColor ?? theme.color.gray50,
          },
        ]}
      >
        <SearchIcon />

        <SplitColumn width={8} />

        <Text presets={'body2'} color={theme.color.gray500}>
          {'빵 또는 빵집명을 검색해보세요'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    body: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
);
