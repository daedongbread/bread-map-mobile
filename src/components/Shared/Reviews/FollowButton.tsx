import React, { useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFollow, useUnFollow } from '@/apis/auth/useFollow';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { Text } from '../Text';

export type FollowType = 'follow' | 'unFollow';

type Props = {
  style?: StyleProp<ViewStyle>;
  isFollow: boolean;
  targetUserId: number;
};

export const FollowButton = ({ style, isFollow, targetUserId }: Props) => {
  const { mutateAsync: follow } = useFollow({});
  const { mutateAsync: unFollow } = useUnFollow();

  const [isFollowing, setIsFollowing] = useState(isFollow);

  const onPress = async () => {
    try {
      if (isFollowing) {
        setIsFollowing(false);
        await unFollow({ userId: targetUserId });
      } else {
        setIsFollowing(true);
        await follow({ userId: targetUserId });
      }
    } catch (e: unknown) {
      setIsFollowing(isFollowing);
    }
  };

  const containerStyle = isFollowing ? styles.followingContainer : styles.followContainer;
  const text = isFollowing ? (
    <Text color={theme.color.gray600} presets={['caption2', 'bold']}>
      팔로잉
    </Text>
  ) : (
    <Text color={theme.color.primary600} presets={['caption2', 'bold']}>
      팔로우
    </Text>
  );

  return (
    <TouchableOpacity style={[styles.container, containerStyle, style]} onPress={() => onPress()}>
      {text}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    container: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderWidth: 1,
    },
    followContainer: {
      backgroundColor: theme.color.primary100,
      borderColor: 'transparent',
    },
    followingContainer: {
      backgroundColor: theme.color.white,
      borderColor: theme.color.gray300,
    },
  })
);
