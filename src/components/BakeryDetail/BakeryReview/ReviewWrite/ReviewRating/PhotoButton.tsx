import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CameraIcon } from '@/components/Shared/Icons/Camera';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { PHOTO_LIMIT } from '@/containers/Review/ReviewRatingContainer';
import { theme } from '@/styles/theme';

type Props = {
  selectCount: number;
  onPress: () => void;
};

export const PhotoButton = ({ selectCount, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} disabled={selectCount === 10}>
    <View style={styles.container}>
      <CameraIcon strokeWidth={2} />
      <SplitRow height={9} />
      <Text style={styles.text}>
        <Text style={selectCount > 0 ? styles.selectText : styles.text}>{selectCount}</Text> /{PHOTO_LIMIT}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 88,
    height: 88,
    backgroundColor: theme.color.gray100,
    marginTop: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: theme.color.gray500,
  },
  selectText: {
    color: theme.color.gray800,
  },
});
