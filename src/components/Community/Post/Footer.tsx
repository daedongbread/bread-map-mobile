import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommentIcon, IcLike, ViewMoreIcon } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  date: string;
  onPressLike: () => void;
  onPressMenu: () => void;
};

export const Footer = ({ isLiked, likeCount, commentCount, date, onPressLike, onPressMenu }: Props) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <TouchableOpacity style={styles.row} onPress={onPressLike}>
        <IcLike fill={isLiked ? '#F66131' : '#BDBDBD'} />
        <SplitColumn width={2} />
        <Text color={theme.color.gray800} presets={['caption1', 'medium']}>
          {likeCount ? likeCount : '좋아요'}
        </Text>
      </TouchableOpacity>

      <SplitColumn width={10} />

      <View style={styles.row}>
        <CommentIcon />
        <SplitColumn width={2} />
        <Text color={theme.color.gray800} presets={['caption1', 'medium']}>
          {commentCount ? commentCount : '댓글'}
        </Text>
      </View>
    </View>

    <View style={styles.row}>
      <Text color={theme.color.gray500} presets={['caption1', 'medium']}>
        {date}
      </Text>
      <SplitColumn width={12} />

      <TouchableOpacity onPress={onPressMenu}>
        <ViewMoreIcon />
      </TouchableOpacity>
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
