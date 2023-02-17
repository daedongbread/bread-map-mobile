import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { Text } from '../Text';

export type FollowType = 'follow' | 'unFollow';

type Props = {
  isFollow: boolean;
  onPress: (type: FollowType) => void;
};

export const FollowButton = ({ isFollow, onPress }: Props) => {
  const type: FollowType = isFollow ? 'unFollow' : 'follow';
  const containerStyle = isFollow ? styles.followingContainer : styles.followContainer;
  const text = isFollow ? (
    <Text presets={['caption2', 'bold']} style={styles.followingText}>
      팔로잉
    </Text>
  ) : (
    <Text presets={['caption2', 'bold']} style={styles.followText}>
      팔로우
    </Text>
  );

  return (
    <TouchableOpacity style={containerStyle} onPress={() => onPress(type)}>
      {text}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    followContainer: {
      backgroundColor: theme.color.primary100,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 4,
    },
    followingContainer: {
      backgroundColor: theme.color.white,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderColor: theme.color.gray300,
      borderWidth: 1,
    },
    followText: {
      color: theme.color.primary500,
    },
    followingText: {
      color: theme.color.gray600,
    },
  })
);
