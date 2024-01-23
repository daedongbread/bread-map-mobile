import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { usePostPost } from '@/apis/community';
import { PostTopic } from '@/apis/community/types';
import { usePostImages } from '@/apis/image';
import { PostWriteComponent } from '@/components/Community/PostWrite';
import { CameraIcon } from '@/components/Shared/Icons/Camera';
import { ImageItemBttomSheetButtonType } from '@/containers/Modal/ImageItemBottomSheetContainer';
import { PostWriteStackNavigationProps } from '@/pages/MainStack/Community/PostWriteStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import AlbumIcon from '@shared/Icons/AlbumIcon.svg';

export const PHOTO_LIMIT = 10;

export type TopicForm = {
  postTopic: PostTopic;
  value: string;
};

export type TopicData = {
  key: PostTopic;
  title: string;
  contentPlaceholder: string;
};

const topicsData: TopicData[] = [
  {
    key: 'BREAD_STORY',
    title: '빵지순례',
    contentPlaceholder: '함께 빵지순례 할 인원을 모으거나, 빵지순례 후기에 대해 이야기 해주세요.',
  },
  {
    key: 'EATEN_BREAD',
    title: '먹은 빵 자랑',
    contentPlaceholder: '내가 먹은 빵을 자랑해보세요.',
  },
  {
    key: '베이킹',
    title: '베이킹',
    contentPlaceholder: '나의 베이킹 레시피나, 베이킹 후기를 작성해주세요.',
  },
  {
    key: '빵수다',
    title: '빵 수다',
    contentPlaceholder: '알고 계신 빵과 관련된 소식이나 하고 싶은 이야기를 자유롭게 작성해주세요.',
  },
  {
    key: '원데이클래스',
    title: '원데이 클래스',
    contentPlaceholder: '원데이 클래스가 개최될 장소, 시간, 관련 링크 등을 알려주세요.',
  },
  {
    key: '빵공구',
    title: '빵 공구',
    contentPlaceholder: '공구 하고자 하는 빵 이름, 기간, 관련 카톡방 링크 등을 알려주세요.',
  },
];

export type PostForm = {
  title: string;
  content: string;
  photos: Asset[];
};

export type PostValidFormData = {
  isValidTitle: boolean;
  isValidContent: boolean;
};

type Navigation = PostWriteStackNavigationProps<'PostWrite'>['navigation'];
type Route = PostWriteStackNavigationProps<'PostWrite'>['route'];

export const PostWriteContainer = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { postTopic } = route.params;
  const [form, setForm] = useState<PostForm>({
    title: '',
    content: '',
    photos: [],
  });

  const { mutateAsync: postPost, isLoading: isPostSaving } = usePostPost(postTopic);
  const { mutateAsync: postImages, isLoading: isImageSaving } = usePostImages();
  const isLoading = isPostSaving || isImageSaving;

  const onPressBakeryTagRow = () => {
    // navigate tag Bakery View
  };

  const onChange = useCallback(
    (key: keyof PostForm, value: string) => {
      setForm(prev => {
        return { ...prev, [key]: value };
      });
    },
    [setForm]
  );

  const onPressUploadButton = () => {
    const buttonList: ImageItemBttomSheetButtonType[] = [
      {
        // 보류
        image: CameraIcon,
        title: '사진 촬영하기',
        onPress: () => onPressTakePicture(),
      },
      {
        image: AlbumIcon,
        title: '앨범에서 선택하기',
        onPress: () => onSelectPhotos(),
      },
    ];

    navigation.navigate('ImageItemBottomSheet', {
      buttonList,
    });
  };

  const onPressTakePicture = async () => {
    const { assets, didCancel } = await launchCamera({
      mediaType: 'photo',
      quality: 0.9,
    });

    if (!didCancel && assets) {
      setForm(prev => {
        return { ...prev, photos: [...prev.photos, ...assets] };
      });
    }

    navigation.pop();
  };

  const onSelectPhotos = async () => {
    const { assets, didCancel } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: PHOTO_LIMIT - form.photos.length,
    });

    if (!didCancel && assets) {
      setForm(prev => {
        return { ...prev, photos: [...prev.photos, ...assets] };
      });
    }

    navigation.pop();
  };

  const deSelectPhoto = (uri?: string) => {
    setForm(prev => {
      const newImages = prev.photos.filter(photo => photo.uri !== uri);
      return { ...prev, photos: newImages };
    });
  };

  const goNavAlertBottomSheet = useCallback(
    (title: string, subTitle: string) => {
      navigation.navigate('AlertBottomSheet', {
        title,
        subTitle,
      });
    },
    [navigation]
  );

  const validate = useCallback(() => {
    if (form.content.trim().length < 10) {
      goNavAlertBottomSheet(
        '본문 10자 이상 작성해주세요!',
        '본문을 최소 10자 이상 작성해주셔야\n글을 등록할 수 있습니다.'
      );

      return false;
    }

    return true;
  }, [form.content, goNavAlertBottomSheet]);

  const onPressConfirm = async () => {
    if (!validate() || isLoading) {
      return;
    }

    closePage();
    goNavSuccessBottomSheet();
    return;

    const imagePaths =
      form.photos.length > 0
        ? await postImages({
            images: form.photos,
            width: 310,
            height: 310,
          })
        : [];

    await postPost(
      {
        title: form.title,
        content: form.content,
        postTopic: postTopic,
        images: imagePaths,
      },
      {
        onSuccess: () => {
          closePage();
          goNavSuccessBottomSheet();
        },
      }
    );
  };

  const onPressClose = () => {
    navigation.navigate('QuestionBottomSheet', {
      title: '게시글 작성을 그만할까요?',
      subTitle: '삭제한 내용은 되돌릴 수 없으니\n신중히 생각해주세요!',
    });
  };

  const goNavSuccessBottomSheet = () => {
    navigation.navigate('SuccessBottomSheet', {
      content: '게시글 등록이\n완료 되었어요!',
    });
  };

  const closePage = () => {
    navigation.goBack();
  };

  const topicData = topicsData.find(item => item.key === postTopic);

  if (!topicData) {
    Alert.alert('잘못된 접근입니다.', '', [
      {
        text: '확인',
        onPress: () => navigation.pop(),
      },
    ]);
    return null;
  }

  return (
    <PostWriteComponent
      form={form}
      topicData={topicData}
      isLoading={isLoading}
      onChange={onChange}
      onPressBakeryTagRow={onPressBakeryTagRow}
      onPressUploadButton={onPressUploadButton}
      deSelectPhoto={deSelectPhoto}
      onPressConfirm={onPressConfirm}
      onPressClose={onPressClose}
    />
  );
};
