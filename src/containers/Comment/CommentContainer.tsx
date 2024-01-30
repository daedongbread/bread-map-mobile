import React, { useState } from 'react';
import { usePostToggleCommentsLike } from '@/apis/community';
import { Comment, PostTopic } from '@/apis/community/types';
import { usePostComment } from '@/apis/community/usePostComment';
import { CommentComponent } from '@/components/Comment';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
  postId: number;
  postTopic: PostTopic;
  comments: Comment[];
  refetchComments: (pageNum?: number) => void;
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

export const CommentContainer = React.memo(({ postId, postTopic, comments, refetchComments }: Props) => {
  const navigation = useNavigation<Navigation>();

  const [comment, setComment] = useState('');
  const [parentInfo, setParentInfo] = useState<CommentParentInfo>(initialParentInfo);

  const { mutateAsync: postComment } = usePostComment();
  const { mutateAsync: onPressLike } = usePostToggleCommentsLike();

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
      postId,
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

  const refetch = () => {
    // 임시적으로 테스트를 위해 전체 댓글을 refetch 합니다
    refetchComments();
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
      comments={comments}
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
