import React, { useEffect, useRef, useState } from 'react';
import { LogBox } from 'react-native';
import { useBlockUser } from '@/apis/auth/useBlockUser';
import { useDeletePost } from '@/apis/community';
import { PostMenuBottomSheetComponent } from '@/components/Community/Post';
import { useAppSelector } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation, useRoute } from '@react-navigation/native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export type CommentBottomSheetButtonType = {
  text: string;
  onClick: () => void;
};

type Navigation = MainStackScreenProps<'PostMenuBottomSheet'>['navigation'];
type Route = MainStackScreenProps<'PostMenuBottomSheet'>['route'];

export const PostMenuBottomSheetContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const { userId: storedUserId } = useAppSelector(selector => selector.auth);

  const { mutateAsync: postBlockUser } = useBlockUser();
  const { mutateAsync: deletePostApi } = useDeletePost();

  const { postId, userId, postTopic } = route.params;

  const ref = useRef<BottomSheet>(null);

  const myPostButtonList = [{ text: '게시글 삭제하기', onClick: () => onPressDeletePost() }];

  const [buttonList, setButtonList] = useState([
    { text: '신고하기', onClick: () => onPressAccuse() },
    { text: '이 사용자의 글 보지 않기', onClick: () => onPressBlockUser() },
  ]);

  useEffect(() => {
    // 게시글이 본인 게시글일 경우
    if (storedUserId === userId) {
      setButtonList(myPostButtonList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressAccuse = () => {
    onClose();
    navigation.navigate('ModalStack', {
      screen: 'AccuseComment',
      params: {
        type: postTopic,
        targetId: postId,
      },
    });
  };

  const blockUser = async () => {
    await postBlockUser(userId, {
      onSuccess: () => {
        navigation.navigate('SuccessBottomSheet', {
          content: '요청 주신 댓글 삭제가\n완료되었어요!',
        });
      },
    });
  };

  const onPressBlockUser = () => {
    onClose();
    navigation.navigate('QuestionBottomSheet', {
      title: '이 사용자를 차단하시겠어요?',
      subTitle: '더이상 사용자의 게시물을 볼 수 없으며,\n상대방에게 회원님의 차단 정보는 알리지 않습니다.',
      leftButtonText: '아니오',
      rightButtonText: '네',
      onPressRightButton: () => blockUser(),
    });
  };

  const onPressDeletePost = () => {
    onClose();
    navigation.navigate('QuestionBottomSheet', {
      title: '게시글을 삭제하시겠어요?',
      subTitle: '한 번 삭제된 댓글은 복구할 수 없으니,\n신중하게 생각해주세요.',
      leftButtonText: '아니오',
      rightButtonText: '네',
      onPressRightButton: () => deletePost(),
    });
  };

  const deletePost = async () => {
    await deletePostApi(
      { postId, postTopic },
      {
        onSuccess: () => {
          navigation.navigate('SuccessBottomSheet', {
            content: '요청 주신 게시글 삭제가\n완료되었어요!',
          });
        },
      }
    );
  };

  const onPressCloseButton = () => {
    ref.current?.close();
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <PostMenuBottomSheetComponent
      ref={ref}
      buttonList={buttonList}
      onClose={onClose}
      closeBottomSheet={onPressCloseButton}
    />
  );
};
