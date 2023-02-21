import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CameraIcon } from '@/components/Shared/Icons/Camera';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { PHOTO_LIMIT } from '@/containers/Review/ReviewRatingContainer';
import { theme } from '@/styles/theme';

const { width } = Dimensions.get('window');

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
        <Text presets={['caption2', 'medium']} style={selectCount > 0 ? styles.selectText : styles.text}>
          {selectCount}
        </Text>
        /{PHOTO_LIMIT}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: theme.color.gray100,
    borderRadius: 8,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectText: {
    color: theme.color.gray800,
  },
  text: {
    color: theme.color.gray500,
  },
});
