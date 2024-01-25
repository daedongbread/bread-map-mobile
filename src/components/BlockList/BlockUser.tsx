import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BlockListEntry } from '@/apis/auth/useBlockList';
import { theme } from '@/styles/theme';
import { Text } from '@shared/Text';
import { SplitRow } from '../Shared/SplitSpace';
import { Row } from '../Shared/View';

interface Props extends BlockListEntry {
  isFirst: boolean;
  handlePressUnblock: (userId: number, nickName: string) => void;
}
export const BlockUser = ({
  userId,
  userImage,
  nickName,
  reviewNum,
  followerNum,
  isFirst,
  handlePressUnblock,
}: Props) => (
  <Row style={[styles.container, !isFirst && styles.divider]}>
    <View>
      {userImage ? <Image source={{ uri: userImage }} style={styles.avatar} /> : <View style={styles.avatar} />}
    </View>

    <View style={styles.flex}>
      <Text color={theme.color.black} presets={['body2', 'medium']} numberOfLines={1}>
        {nickName}
      </Text>
      <SplitRow height={4} />
      <Text
        color={theme.color.gray400}
        presets={['caption2', 'medium']}
      >{`리뷰 ${reviewNum} | 팔로워 ${followerNum}`}</Text>
    </View>

    <View>
      <TouchableOpacity style={styles.button} onPress={() => handlePressUnblock(userId, nickName)}>
        <Text color={theme.color.gray600} presets={['caption2', 'bold']}>
          차단해제
        </Text>
      </TouchableOpacity>
    </View>
  </Row>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: theme.color.gray200,
  },
  flex: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.color.gray400,
    marginRight: 8,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.color.gray300,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});
