import React, { useEffect, useRef, useState } from 'react';
import { LogBox } from 'react-native';
import { CommentMenuBottomSheetComonent } from '@/components/Community/Comments/CommentMenuBottomSheetComonent';
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

  /**
   * type 정의
   * 0 : 삭제하기 버튼만 보여줌
   * 1 : 신고 버튼만 보여줌
   * 2 : 모든 버튼을 다 보여줌
   */
  const { commentId, type } = route.params;

  const ref = useRef<BottomSheet>(null);

  const [buttonList, setButtonList] = useState<CommentBottomSheetButtonType[]>([
    { text: '댓글 삭제하기', onClick: () => onPressDeleteCommentButton() },
    { text: '댓글 신고하기', onClick: () => onPressReportCommentButton() },
  ]);

  useEffect(() => {
    if (type !== 2) {
      const newButtonList = [buttonList[type]];
      setButtonList(newButtonList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const onPressDeleteCommentButton = () => {
    onClose();
    navigation.navigate('QuestionBottomSheet', {
      title: '댓글을 삭제하시겠어요?',
      subTitle: '한 번 삭제된 댓글은 복구할 수 없으니,\n신중하게 생각해주세요.',
      leftButtonText: '아니오',
      rightButtonText: '네',
      onPressRightButton: () => deleteComment(),
    });
  };

  const deleteComment = () => {
    navigation.navigate('SuccessBottomSheet', {
      content: '요청 주신 댓글 삭제가\n완료되었어요!',
    });
  };

  const onPressReportCommentButton = () => {
    onClose();
    navigation.navigate('ModalStack', {
      screen: 'AccuseComment',
      params: {
        commentId,
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
