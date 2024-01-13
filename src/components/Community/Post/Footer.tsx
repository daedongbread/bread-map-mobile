import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommentIcon, IcLike, IcUnLike } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';
import VerticalViewMoreIcon from '@shared/Icons/VerticalViewMoreIcon.svg';

type Props = {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  date?: string;
  onPressLike: () => void;
  onPressMenu?: () => void;
};

export const Footer = ({ isLiked, likeCount, commentCount, date, onPressLike, onPressMenu }: Props) => (
  <Row style={styles.container}>
    <Row style={styles.row}>
      <TouchableOpacity style={styles.row} onPress={onPressLike}>
        <Row style={styles.row}>
          {isLiked ? <IcLike /> : <IcUnLike />}
          <SplitColumn width={4} />
          <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
            {likeCount ? likeCount : '좋아요'}
          </Text>
        </Row>
      </TouchableOpacity>

      <SplitColumn width={10} />

      <Row style={styles.row}>
        <CommentIcon />
        <SplitColumn width={4} />
        <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
          {commentCount ? commentCount : '댓글'}
        </Text>
      </Row>
    </Row>

    {!!onPressMenu && (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onPressMenu()}>
          <VerticalViewMoreIcon />
        </TouchableOpacity>
      </View>
    )}

    {!!date && (
      <Text color={theme.color.gray600} presets={['caption2', 'regular']}>
        {date}
      </Text>
    )}
  </Row>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
  },
});
