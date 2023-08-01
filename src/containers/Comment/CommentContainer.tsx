import React, { useState } from 'react';
import { CommentComponent } from '@/components/Comment';

export const CommentContainer = () => {
  const [comment, setComment] = useState('이 빵 정말 맛있어요!');
  const [mentionInfo, setMentionInfo] = useState('@빵또라이');

  const onPressReply = (commentId: string, writerNickname: string) => {
    console.log('111');
  };

  const onPressCommentSubmit = () => {};

  return (
    <CommentComponent
      comment={comment}
      mentionInfo={mentionInfo}
      setComment={setComment}
      onPressReply={onPressReply}
      onPressCommentSubmit={onPressCommentSubmit}
    />
  );
};
