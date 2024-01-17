import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { CameraIcon } from '@/components/Shared/Icons/Camera';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  onPress: () => void;
};

export const ShortUploadButton = ({ onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <CameraIcon strokeWidth={1.5} />
      <SplitColumn width={8} />
      <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
        사진 올리기
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.color.gray100,
  },
});
