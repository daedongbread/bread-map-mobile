import React, { useEffect, useRef, useState } from 'react';
import { LogBox } from 'react-native';
import { useDeleteComment } from '@/apis/community';
import { CommentMenuBottomSheetComonent } from '@/components/Community';
import { useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation, useRoute } from '@react-navigation/native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export type CommentBottomSheetButtonType = {
  text: string;
  onClick: () => void;
};

type Navigation = MainStackScreenProps<'CommentMenuBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'CommentMenuBottomSheet'>['route'];

export const CommentMenuBottomSheetContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const { userId: userId } = useAppSelector(selector => selector.auth);

  const { commentId, ownerId, postTopic, postId } = route.params;
  const { mutateAsync: deleteCommentApi } = useDeleteComment(postId);

  const ref = useRef<BottomSheet>(null);

  const myPostButtonList = [{ text: '댓글 삭제하기', onClick: () => onPressDeleteComment() }];

  const [buttonList, setButtonList] = useState<CommentBottomSheetButtonType[]>([
    { text: '댓글 신고하기', onClick: () => onPressReportCommentButton() },
  ]);

  useEffect(() => {
    // 게시글이 본인 게시글일 경우
    if (userId === ownerId) {
      setButtonList(myPostButtonList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressDeleteComment = () => {
    onClose();
    navigation.navigate('QuestionBottomSheet', {
      title: '댓글을 삭제하시겠어요?',
      subTitle: '한 번 삭제된 댓글은 복구할 수 없으니,\n신중하게 생각해주세요.',
      leftButtonText: '아니오',
      rightButtonText: '네',
      onPressRightButton: () => deleteComment(),
    });
  };

  const deleteComment = async () => {
    await deleteCommentApi(commentId, {
      onSuccess: () => {
        navigation.navigate('SuccessBottomSheet', {
          content: '요청 주신 댓글 삭제가\n완료되었어요!',
        });
      },
    });
  };

  const onPressReportCommentButton = () => {
    onClose();
    navigation.navigate('ModalStack', {
      screen: 'AccuseComment',
      params: {
        type: 'COMMENT',
        postTopic,
        targetId: commentId,
      },
    });
  };

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <CommentMenuBottomSheetComonent
      ref={ref}
      buttonList={buttonList}
      onClose={onClose}
      closeBottomSheet={onPressCloseButton}
    />
  );
};
