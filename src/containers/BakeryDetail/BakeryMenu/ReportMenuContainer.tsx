import React, { useCallback, useState } from 'react';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { usePostReportMenu } from '@/apis/bakery/usePostReportMenu';
import { usePostImages } from '@/apis/image';
import { ReportMenuComponent } from '@/components/BakeryDetail/BakeryMenu';
import { useAppDispatch } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { showToast } from '@/slices/toast';
import { useNavigation, useRoute } from '@react-navigation/native';

export type ReportMenuForm = {
  name: string;
  price: string;
  images: Asset[];
};

const initailForm: ReportMenuForm = {
  name: '',
  price: '',
  images: [],
};

export type ReportMenuValidFormData = {
  isValidName: boolean;
  isValidPrice: boolean;
};

const initialFormValid: ReportMenuValidFormData = {
  isValidName: true,
  isValidPrice: true,
};

type Navigation = MainStackScreenProps<'ReportMenu'>['navigation'];
type Route = MainStackScreenProps<'ReportMenu'>['route'];

const PHOTO_LIMIT = 10;

export const ReportMenuContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { bakeryId } = route.params;
  const { mutateAsync: reportMenu, isLoading: isMenuSaving } = usePostReportMenu();
  const { mutateAsync: postImages, isLoading: isImageSaving } = usePostImages();

  const isLoading = isMenuSaving || isImageSaving;

  const [form, setForm] = useState(initailForm);
  const [formValid, setFormValid] = useState(initialFormValid);

  const onChange = useCallback(
    (key: string, value: string) => {
      let text = value;

      // 가격필드의 경우 앞에 ₩, 공백, 한글, 영어, 콤마 제거
      if (key === 'price') {
        text = text.replace(/\s|₩|,|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]|[a-zA-Z]/g, '');
      }

      setForm(prev => {
        return { ...prev, [key]: text };
      });
    },
    [setForm]
  );

  const onSelectPhotos = async () => {
    const { assets, didCancel } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: PHOTO_LIMIT - form.images.length,
    });

    if (!didCancel && assets) {
      if (assets[0].fileSize! > 10000000) {
        dispatch(
          showToast({
            text: '10mb 이하만 업로드 가능합니다',
            duration: 5 * 1000,
          })
        );
        return;
      }
      setForm(prev => {
        return { ...prev, images: [...prev.images, ...assets] };
      });
    }
  };

  const deSelectPhoto = (uri?: string) => {
    setForm(prev => {
      const newImages = prev.images.filter(image => image.uri !== uri);
      return { ...prev, images: newImages };
    });
  };

  const validate = useCallback(() => {
    let _formValid: ReportMenuValidFormData = initialFormValid;

    if (form.name.trim().length === 0) {
      _formValid = { ..._formValid, isValidName: false };
    }
    if (form.price.trim().length === 0) {
      _formValid = { ..._formValid, isValidPrice: false };
    }

    setFormValid(_formValid);

    return _formValid.isValidName && _formValid.isValidPrice;
  }, [form.name, form.price]);

  const onPressConfirm = async () => {
    if (!validate() || isLoading) {
      return;
    }

    const imagePaths = await postImages(form.images);

    await reportMenu(
      {
        bakeryId,
        request: {
          name: form.name,
          price: form.price,
          images: imagePaths,
        },
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
      title: '제보하기를 그만할까요?',
      subTitle: '삭제한 글은 되돌릴 수 없으니\n신중히 생각해주세요!',
    });
  };

  const goNavSuccessBottomSheet = () => {
    navigation.navigate('SuccessBottomSheet', {
      content: '제보 감사해요!\n심사과정을 거쳐 반영할게요!',
    });
  };

  const closePage = () => {
    navigation.goBack();
  };

  return (
    <ReportMenuComponent
      form={form}
      formValid={formValid}
      isLoading={isLoading}
      onSelectPhotos={onSelectPhotos}
      deSelectPhoto={deSelectPhoto}
      onChange={onChange}
      onPressConfirm={onPressConfirm}
      onPressClose={onPressClose}
      closePage={closePage}
    />
  );
};
