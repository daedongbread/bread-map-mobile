import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '@/styles/theme';
import { CameraIcon } from '../Icons/Camera';
import { SplitRow } from '../SplitSpace';
import { Text } from '../Text';

type Props = {
  onPress: () => void;
};

export const UploadButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CameraIcon strokeWidth={1.5} />
      <SplitRow height={5} />
      <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
        사진 올리기
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.gray100,
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 13,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: theme.color.gray300,
    borderWidth: 1,
  },
});
