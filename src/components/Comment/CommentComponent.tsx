import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SplitRow } from '../Shared/SplitSpace';
import { Comments } from './Comments';
import { Input } from './Input';

type Props = {
  comment: string;
  mentionInfo: string;
  setComment: (text: string) => void;
  onPressReply: (commentId: string, writerNickname: string) => void;
  onPressCommentSubmit: () => void;
};

export const CommentComponent = ({ comment, mentionInfo, setComment, onPressReply, onPressCommentSubmit }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Comments onPressCommentMenu={() => null} onPressReply={onPressReply} />
      </View>

      <SplitRow height={20} />

      <Input
        comment={comment}
        mentionInfo={mentionInfo}
        setComment={setComment}
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
});
