import { format } from 'date-fns';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Comment as CommentType } from '@/apis/community/types';
import { IcLike, ViewMoreIcon } from '@/components/Shared/Icons';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';
import Ellipse from '@shared/Icons/Ellipse.svg';

type Props = {
  comment: CommentType;
  isReply?: boolean;
  onPressProfile: (userId: number) => void;
  onPressLike: (commentId: number) => void;
  onPressMenu: (commentId: number, ownerId: number) => void;
  onPressReply: (parentId: number, targetCommentUserId: number, targetCommentUserName: string) => void;
};

export const Comment = ({
  comment,
  isReply = false,
  onPressProfile,
  onPressLike,
  onPressMenu,
  onPressReply,
}: Props) => {
  return (
    <Row style={isReply ? styles.replyContainer : styles.container}>
      <TouchableWithoutFeedback onPress={() => onPressProfile(comment.userId)}>
        <Image style={styles.profileImage} source={{ uri: comment.profileImage }} />
      </TouchableWithoutFeedback>

      <SplitColumn width={8} />

      <View style={styles.commentContainer}>
        <TouchableWithoutFeedback onPress={() => onPressProfile(comment.userId)}>
          <Row style={styles.commentHeader}>
            <Text color="#000000" presets={['body2', 'semibold']}>
              {comment.nickname}
            </Text>

            <Row style={styles.commentHeaderRightContainer}>
              <Text color="#9E9E9E" presets={['caption2', 'medium']}>
                {format(new Date(comment.createdDate), 'yyyy.MM.dd')}
              </Text>

              <SplitColumn width={2} />

              <TouchableOpacity onPress={() => onPressMenu(comment.id, comment.userId)}>
                <ViewMoreIcon />
              </TouchableOpacity>
            </Row>
          </Row>
        </TouchableWithoutFeedback>

        <SplitRow height={2} />

        <Text color="#616161" presets={['caption2', 'medium']}>
          {comment.targetCommentUserNickname && (
            <Text color={theme.color.primary500}>@{comment.targetCommentUserNickname} </Text>
          )}
          {comment.content}
        </Text>

        <SplitRow height={8} />

        <Row style={styles.commentFooter}>
          <TouchableOpacity onPress={() => onPressLike(comment.id)}>
            <Row style={styles.footerLeftContainer}>
              <IcLike width={16} height={16} fill={comment.isUserLiked ? '#F66131' : '#BDBDBD'} />
              <SplitColumn width={2} />
              <Text color="#9E9E9E" presets={['caption2', 'medium']}>
                {comment.likeCount}
              </Text>
            </Row>
          </TouchableOpacity>

          <SplitColumn width={4} />
          <Ellipse />
          <SplitColumn width={4} />

          <TouchableOpacity onPress={() => onPressReply(comment.id, comment.userId, comment.nickname)}>
            <Text color="#9E9E9E" presets={['caption2', 'medium']}>
              댓글달기
            </Text>
          </TouchableOpacity>
        </Row>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 16,
    marginHorizontal: 20,
  },
  replyContainer: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: 20,
    marginBottom: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  commentContainer: {
    flex: 1,
  },
  commentHeader: {
    justifyContent: 'space-between',
  },
  commentHeaderRightContainer: {
    alignItems: 'center',
  },
  commentFooter: {
    alignItems: 'center',
  },
  footerLeftContainer: {
    alignItems: 'center',
  },
});
