import React, { useCallback, useState } from 'react';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { usePostPost } from '@/apis/community';
import { PostTopic } from '@/apis/community/types';
import { usePostImages } from '@/apis/image';
import { PostWriteComponent } from '@/components/Community';
import { useAppDispatch } from '@/hooks/redux';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import { showToast } from '@/slices/toast';
import { useNavigation } from '@react-navigation/native';

export const PHOTO_LIMIT = 10;

export type TopicForm = {
  postTopic: PostTopic;
  value: string;
};

const topics: TopicForm[] = [
  {
    postTopic: 'BREAD_STORY',
    value: '빵 이야기',
  },
  {
    postTopic: 'FREE_TALK',
    value: '빵터지는 이야기',
  },
];

export type PostForm = {
  postTopic: PostTopic;
  title: string;
  content: string;
  photos: Asset[];
};

const initialForm: PostForm = {
  postTopic: 'BREAD_STORY',
  title: '',
  content: '',
  photos: [],
};

export type PostValidFormData = {
  isValidTitle: boolean;
  isValidContent: boolean;
};

const initialFormValid: PostValidFormData = {
  isValidTitle: true,
  isValidContent: true,
};

type Navigation = ReviewWriteStackNavigationProps<'ReviewRating'>['navigation'];

export const PostWriteContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();

  const [form, setForm] = useState(initialForm);
  const [formValid, setFormValid] = useState(initialFormValid);

  // const { bakeryId } = route.params;
  const { mutateAsync: postPost, isLoading: isPostSaving } = usePostPost();
  const { mutateAsync: postImages, isLoading: isImageSaving } = usePostImages();
  const isLoading = isPostSaving || isImageSaving;

  const onChange = useCallback(
    (key: keyof PostForm, value: string) => {
      setForm(prev => {
        return { ...prev, [key]: value };
      });
    },
    [setForm]
  );

  const onSelectPhotos = async () => {
    const { assets, didCancel } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: PHOTO_LIMIT - form.photos.length,
    });

    if (!didCancel && assets) {
      if (assets[0].fileSize! > 10485760) {
        dispatch(
          showToast({
            text: '10mb 이하만 업로드 가능합니다',
            duration: 5 * 1000,
          })
        );
        return;
      }

      setForm(prev => {
        return { ...prev, photos: [...prev.photos, ...assets] };
      });
    }
  };

  const deSelectPhoto = (uri?: string) => {
    setForm(prev => {
      const newImages = prev.photos.filter(photo => photo.uri !== uri);
      return { ...prev, photos: newImages };
    });
  };

  const validate = useCallback(() => {
    let _formValid: PostValidFormData = initialFormValid;

    if (form.title.trim().length < 10) {
      _formValid = { ..._formValid, isValidTitle: false };
    }
    if (form.content.trim().length < 10) {
      _formValid = { ..._formValid, isValidContent: false };
    }

    setFormValid(_formValid);

    return _formValid.isValidTitle && _formValid.isValidContent;
  }, [form.title, form.content]);

  const onPressConfirm = async () => {
    if (!validate() || isLoading) {
      return;
    }

    const imagePaths = form.photos.length > 0 ? await postImages(form.photos) : [];

    await postPost(
      {
        title: form.title,
        content: form.content,
        postTopic: form.postTopic,
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

  return (
    <PostWriteComponent
      form={form}
      formValid={formValid}
      topics={topics}
      isLoading={isLoading}
      onChange={onChange}
      onSelectPhotos={onSelectPhotos}
      deSelectPhoto={deSelectPhoto}
      onPressConfirm={onPressConfirm}
      onPressClose={onPressClose}
    />
  );
};
