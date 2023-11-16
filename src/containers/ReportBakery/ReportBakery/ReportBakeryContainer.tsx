import React, { useCallback, useRef, useState } from 'react';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { usePostImages } from '@/apis/image';
import { usePostReportBakery } from '@/apis/report/usePostReportBakery';
import { ReportBakeryComponent } from '@/components/ReportBakery';
import { useAppDispatch } from '@/hooks/redux';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { showToast } from '@/slices/toast';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation } from '@react-navigation/native';

export type ReportBakeryForm = {
  name: string;
  location: string;
  content: string;
  images: Asset[];
};

const initailForm: ReportBakeryForm = {
  name: '',
  location: '',
  content: '',
  images: [],
};

const initialFormValid: ReportBakeryValidFormData = {
  isValidName: true,
  isValidLocation: true,
};

export type ReportBakeryValidFormData = {
  isValidName: boolean;
  isValidLocation: boolean;
};

const PHOTO_LIMIT = 10;

export const ReportBaekryContainer: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ReportBakeryStackScreenProps<'ReportBakery'>['navigation']>();
  const { mutateAsync: postImages, isLoading: isImageSaving } = usePostImages();
  const { mutateAsync: reportBakery, isLoading: isBakerySaving } = usePostReportBakery();

  const isLoading = isBakerySaving || isImageSaving;

  const reportSuccessBottomSheetRef = useRef<BottomSheet>(null);

  const [form, setForm] = useState(initailForm);
  const [formValid, setFormValid] = useState(initialFormValid);

  const onChange = useCallback(
    (key: string, value: string) => {
      setForm(prev => {
        return { ...prev, [key]: value };
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
      if (assets.some(asset => asset.fileSize! > 10000000)) {
        dispatch(
          showToast({
            text: '10mb 이하만 업로드 가능합니다',
            duration: 5 * 1000,
          })
        );
      } else {
        setForm(prev => {
          return { ...prev, images: [...prev.images, ...assets] };
        });
      }
    }
  };

  const deSelectPhoto = (uri?: string) => {
    setForm(prev => {
      const newImages = prev.images.filter(image => image.uri !== uri);
      return { ...prev, images: newImages };
    });
  };

  const validate = useCallback(() => {
    let _formValid: ReportBakeryValidFormData = initialFormValid;

    if (form.name.trim().length === 0) {
      _formValid = { ..._formValid, isValidName: false };
    }
    if (form.location.trim().length === 0) {
      _formValid = { ..._formValid, isValidLocation: false };
    }

    setFormValid(_formValid);

    return _formValid.isValidName && _formValid.isValidLocation;
  }, [form.location, form.name]);

  const onPressConfirm = async () => {
    if (!validate() || isLoading) {
      return;
    }

    const imagePaths =
      form.images.length > 0
        ? await postImages({
            images: form.images,
            width: 360,
            height: 200,
          })
        : [];

    await reportBakery(
      {
        name: form.name,
        location: form.location,
        content: form.content,
        images: imagePaths,
      },
      {
        onSuccess: () => {
          reportSuccessBottomSheetRef.current?.expand();
        },
      }
    );
  };

  const closePage = () => {
    navigation.getParent()?.goBack();
  };

  return (
    <ReportBakeryComponent
      form={form}
      formValid={formValid}
      reportSuccessBottomSheetRef={reportSuccessBottomSheetRef}
      isLoading={isLoading}
      onChange={onChange}
      onSelectPhotos={onSelectPhotos}
      deSelectPhoto={deSelectPhoto}
      onPressConfirm={onPressConfirm}
      closePage={closePage}
    />
  );
};
