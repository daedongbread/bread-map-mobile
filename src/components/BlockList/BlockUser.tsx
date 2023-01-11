import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BlockListEntry } from '@/apis/auth/useBlockList';
import { theme } from '@/styles/theme';
import { Button } from '@shared/Button/Button';
import { Text } from '@shared/Text';

interface Props extends BlockListEntry {
  handlePressUnblock: (userId: number) => void;
}
export const BlockUser = ({ userId, userImage, nickName, reviewNum, followerNum, handlePressUnblock }: Props) => {
  const onPressUnblock = () => {
    handlePressUnblock(userId);
  };

  return (
    <View style={styles.wrapper}>
      <View>
        {userImage ? <Image source={{ uri: userImage }} style={styles.avatar} /> : <View style={styles.avatar} />}
      </View>

      <View style={styles.flex}>
        <Text numberOfLines={1} style={styles.nickName}>
          {nickName}
        </Text>
        <Text style={styles.hint}>{`리뷰 ${reviewNum} | 팔로워 ${followerNum}`}</Text>
      </View>

      <View>
        <Button appearance={'terdary'} onPress={onPressUnblock}>
          차단해제
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.color.gray400,
    marginRight: 8,
  },
  nickName: {
    color: 'black',
    fontWeight: '500',
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '500',
    color: theme.color.gray400,
  },
});
