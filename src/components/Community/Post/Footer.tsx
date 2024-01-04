import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommentIcon, IcLike, IcUnLike } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  date: string;
  onPressLike: () => void;
};

export const Footer = ({ isLiked, likeCount, commentCount, date, onPressLike }: Props) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <TouchableOpacity style={styles.row} onPress={onPressLike}>
        {isLiked ? <IcLike /> : <IcUnLike />}
        <SplitColumn width={4} />
        <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
          {likeCount ? likeCount : '좋아요'}
        </Text>
      </TouchableOpacity>

      <SplitColumn width={10} />

      <View style={styles.row}>
        <CommentIcon />
        <SplitColumn width={4} />
        <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
          {commentCount ? commentCount : '댓글'}
        </Text>
      </View>
    </View>

    <View style={styles.row}>
      <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
        {date}
      </Text>
      <SplitColumn width={12} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
