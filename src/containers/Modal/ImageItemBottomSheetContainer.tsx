import React, { useRef } from 'react';
import { LogBox } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ImageItemBottomSheetComponent } from '@/components/Shared/Modal';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation, useRoute } from '@react-navigation/native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export type CommentBottomSheetButtonType = {
  text: string;
  onClick: () => void;
};

export type ImageItemBttomSheetButtonType = {
  image: React.FC<SvgProps>;
  title: string;
  onPress: () => void;
};

type Navigation = MainStackScreenProps<'ImageItemBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'ImageItemBottomSheet'>['route'];

export const ImageItemBottomSheetContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { buttonList } = route.params;

  const ref = useRef<BottomSheet>(null);

  // const myPostButtonList = [{ text: '댓글 삭제하기', onClick: () => onPressDeleteComment() }];

  // const onPressDeleteComment = () => {
  //   onClose();
  //   navigation.navigate('QuestionBottomSheet', {
  //     title: '댓글을 삭제하시겠어요?',
  //     subTitle: '한 번 삭제된 댓글은 복구할 수 없으니,\n신중하게 생각해주세요.',
  //     leftButtonText: '아니오',
  //     rightButtonText: '네',
  //     onPressRightButton: () => deleteComment(),
  //   });
  // };

  // const onPressReportCommentButton = () => {
  //   onClose();
  //   navigation.navigate('ModalStack', {
  //     screen: 'AccuseComment',
  //     params: {
  //       type: 'COMMENT',
  //       targetId: commentId,
  //     },
  //   });
  // };

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <ImageItemBottomSheetComponent
      ref={ref}
      buttonList={buttonList}
      onClose={onClose}
      closeBottomSheet={onPressCloseButton}
    />
  );
};
