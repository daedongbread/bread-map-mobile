import React from 'react';
import { View } from 'react-native';
import { Comment } from './Comment';

type Props = {
  onPressCommentMenu: (commentId: number, commentOwnerId: number) => void;
  onPressReply: (commentId: string, writerNickname: string) => void;
};

export const Comments = ({ onPressCommentMenu, onPressReply }: Props) => {
  return (
    <View>
      <Comment onPressCommentMenu={onPressCommentMenu} onPressReply={onPressReply} />
      {/* <Comment onPressCommentMenu={onPressCommentMenu} isReply />
      <Comment onPressCommentMenu={onPressCommentMenu} />
      <Comment onPressCommentMenu={onPressCommentMenu} isReply />
      <Comment onPressCommentMenu={onPressCommentMenu} isReply />
      <Comment onPressCommentMenu={onPressCommentMenu} /> */}
    </View>
  );
};
