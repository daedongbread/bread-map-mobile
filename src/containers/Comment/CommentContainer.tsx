import React, { useState } from 'react';
import { useGetComments, usePostToggleCommentsLike } from '@/apis/community';
import { PostTopic } from '@/apis/community/types';
import { usePostComment } from '@/apis/community/usePostComment';
import { CommentComponent } from '@/components/Comment';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
  postId: number;
  postTopic: PostTopic;
};

export type CommentParentInfo = {
  parentId: number;
  targetCommentUserId: number;
  targetCommentUserName: string;
};

const initialParentInfo = {
  parentId: 0,
  targetCommentUserId: 0,
  targetCommentUserName: '',
};

type Navigation = MainStackScreenProps<'CommentMenuBottomSheet'>['navigation'];

export const CommentContainer = React.memo(({ postId, postTopic }: Props) => {
  const navigation = useNavigation<Navigation>();

  const [comment, setComment] = useState('');
  const [parentInfo, setParentInfo] = useState<CommentParentInfo>(initialParentInfo);

  const { comments = [], refetch } = useGetComments({ postId, postTopic, page: 0 });

  const { mutateAsync: postComment } = usePostComment();
  const { mutateAsync: postLike } = usePostToggleCommentsLike();

  const onPressProfile = (userId: number) => {
    navigation.navigate('ProfileStack', {
      screen: 'Profile',
      params: {
        userId,
      },
    });
  };

  const onPressMenu = (commentId: number, ownerId: number) => {
    navigation.navigate('CommentMenuBottomSheet', {
      commentId,
      ownerId,
      postTopic,
      postId,
    });
  };

  const onPressLike = async (commentId: number) => {
    await postLike(commentId, {
      onSuccess: () => refetch(),
    });
  };

  const onPressReply = (parentId: number, targetCommentUserId: number, targetCommentUserName: string) => {
    setParentInfo({
      parentId,
      targetCommentUserId,
      targetCommentUserName,
    });
  };

  const onChangeComment = (text: string) => {
    let newComment = text;

    if (parentInfo.parentId !== 0) {
      const mention = `@${parentInfo.targetCommentUserName}`;
      newComment = text.slice(mention.length + 1);
    }

    setComment(newComment);
  };

  const onPressCommentSubmit = async () => {
    await postComment(
      {
        postId,
        postTopic,
        content: comment,
        isFirstDepth: parentInfo.parentId === 0,
        parentId: parentInfo.parentId,
        targetCommentUserId: parentInfo.targetCommentUserId,
      },
      {
        onSuccess: () => {
          refetch();
          setComment('');
          setParentInfo({ ...initialParentInfo });
        },
      }
    );
  };

  return (
    <CommentComponent
      comments={comments.contents}
      comment={comment}
      parentInfo={parentInfo}
      onPressProfile={onPressProfile}
      onChangeComment={onChangeComment}
      onPressMenu={onPressMenu}
      onPressLike={onPressLike}
      onPressReply={onPressReply}
      onPressCommentSubmit={onPressCommentSubmit}
    />
  );
});
