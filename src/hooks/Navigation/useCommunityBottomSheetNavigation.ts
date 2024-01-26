import { PostTopic, ReportType } from '@/apis/community/types';
import { CommunityStackScreenProps } from '@/pages/MainStack/Community';
import { useNavigation } from '@react-navigation/native';

type GoNavEditProps = {
  targetPostId: number;
  targetPostTopic: PostTopic;
};

type GoNavAccuseProps = {
  targetPostId: number;
  targetPostTopic: ReportType;
};

type GoNavDeleteBottomSheetProps = {
  onPressLeftButton?: () => void;
};

type GoNavBlockUserBottomSheetProps = {
  onPressRightButton?: () => void;
};

type GoNavSuccessBottomSheetProps = {
  content: string;
  onConfirmCallback?: () => void;
};

type Navigation = CommunityStackScreenProps<'Community'>['navigation'];

export const useCommunityBottomSheetNavigation = () => {
  const navigation = useNavigation<Navigation>();

  const goNavEdit = ({ targetPostId, targetPostTopic }: GoNavEditProps) => {
    navigation.navigate('PostWriteStack', {
      screen: 'PostWrite',
      params: {
        postId: targetPostId,
        postTopic: targetPostTopic,
      },
    });
  };

  const goNavAccuse = ({ targetPostId, targetPostTopic }: GoNavAccuseProps) => {
    navigation.navigate('ModalStack', {
      screen: 'AccuseComment',
      params: {
        type: targetPostTopic,
        targetId: targetPostId,
      },
    });
  };

  const goNavSuccessBottomSheet = ({ content, onConfirmCallback }: GoNavSuccessBottomSheetProps) => {
    navigation.navigate('SuccessBottomSheet', {
      content,
      onPressConfirmButton: onConfirmCallback ? () => onConfirmCallback() : undefined,
    });
  };

  const goNavDeleteBottomSheet = ({ onPressLeftButton }: GoNavDeleteBottomSheetProps) => {
    navigation.navigate('QuestionBottomSheet', {
      title: '정말 글을 삭제할까요?',
      subTitle: '삭제한 글은 되돌릴 수 없으니\n신중하게 생각해주세요!',
      leftButtonText: '삭제',
      rightButtonText: '취소',
      onPressLeftButton: onPressLeftButton ? () => onPressLeftButton() : undefined,
    });
  };

  const goNavBlockUserBottomSheet = ({ onPressRightButton }: GoNavBlockUserBottomSheetProps) => {
    navigation.navigate('QuestionBottomSheet', {
      title: '이 사용자를 차단하시겠어요?',
      subTitle: '더이상 사용자의 게시물을 볼 수 없으며,\n상대방에게 회원님의 차단 정보는 알리지 않습니다.',
      leftButtonText: '아니오',
      rightButtonText: '네',
      onPressRightButton: onPressRightButton ? () => onPressRightButton() : undefined,
    });
  };

  return {
    goNavBlockUserBottomSheet,
    goNavDeleteBottomSheet,
    goNavAccuse,
    goNavEdit,
    goNavSuccessBottomSheet,
  };
};
