import React from 'react';
import { View } from 'react-native';
import { Comment } from './Comment';

type Props = {
  onPressCommentMenu: (commentId: number, commentOwnerId: number) => void;
};

export const Comments = ({ onPressCommentMenu }: Props) => {
  return (
    <View>
      <Comment onPressCommentMenu={onPressCommentMenu} />
      <Comment onPressCommentMenu={onPressCommentMenu} isReply />
      <Comment onPressCommentMenu={onPressCommentMenu} />
      <Comment onPressCommentMenu={onPressCommentMenu} isReply />
    </View>
  );
};
