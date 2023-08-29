import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Comment as CommentType } from '@/apis/community/types';
import { CommentParentInfo } from '@/containers/Comment/CommentContainer';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';
import { Comment } from './Comment';
import { Input } from './Input';
import { NoComments } from './NoComments';

type Props = {
  comments: CommentType[];
  comment: string;
  parentInfo: CommentParentInfo;
  onPressProfile: (userId: number) => void;
  onChangeComment: (text: string) => void;
  onPressMenu: (commentId: number, ownerId: number) => void;
  onPressLike: (commentId: number) => void;
  onPressReply: (parentId: number, targetCommentUserId: number, targetCommentUserName: string) => void;
  onPressCommentSubmit: () => void;
};

export const CommentComponent = ({
  comments,
  comment,
  parentInfo,
  onPressProfile,
  onChangeComment,
  onPressMenu,
  onPressLike,
  onPressReply,
  onPressCommentSubmit,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {comments && comments.length > 0 ? (
          comments.map(_comment => {
            if (_comment.status === 'ACTIVE') {
              return (
                <Comment
                  key={_comment.id}
                  comment={_comment}
                  isReply={!_comment.isFirstDepth}
                  onPressProfile={onPressProfile}
                  onPressLike={onPressLike}
                  onPressMenu={onPressMenu}
                  onPressReply={onPressReply}
                />
              );
            } else {
              return (
                <Text
                  key={_comment.id}
                  color="#616161"
                  presets={['caption2', 'medium']}
                  style={_comment.isFirstDepth ? styles.disabledComment : styles.disabledReply}
                >
                  {_comment.content}
                </Text>
              );
            }
          })
        ) : (
          <>
            <SplitRow height={55} />
            <NoComments />
            <SplitRow height={55} />
          </>
        )}
      </View>

      <SplitRow height={20} />

      <Input
        comment={comment}
        parentInfo={parentInfo}
        onChangeComment={onChangeComment}
        onPressCommentSubmit={onPressCommentSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  disabledComment: {
    paddingVertical: 18,
    paddingHorizontal: 40,
  },
  disabledReply: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
