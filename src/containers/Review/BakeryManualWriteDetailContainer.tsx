import React, { useState } from 'react';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BakeryManualWriteDetailComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/BakeryManualWrite';
import { CameraIcon } from '@/components/Shared/Icons/Camera';
import { useAppDispatch } from '@/hooks/redux';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import { showToast } from '@/slices/toast';
import { useNavigation, useRoute } from '@react-navigation/native';
import AlbumIcon from '@shared/Icons/AlbumIcon.svg';
import { ImageItemBttomSheetButtonType } from '../Modal/ImageItemBottomSheetContainer';

type Navigation = ReviewWriteStackNavigationProps<'BakeryManualWriteDetail'>['navigation'];
type Route = ReviewWriteStackNavigationProps<'BakeryManualWriteDetail'>['route'];

const PHOTO_LIMIT = 10;

export const BakeryManualWriteDetailContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { bakeryInfoForm } = route.params;

  const [detailReview, setDetailReview] = useState('');
  const [images, setImages] = useState<Asset[]>([]);

  const isLoading = false;

  const onChange = (text: string) => {
    setDetailReview(text);
  };

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
      // dispatch(updateImages([...images, ...assets]));
      setImages([...images, ...assets]);
    }

    navigation.navigate('BakeryManualWriteDetail', {
      bakeryInfoForm,
    });
  };

  const deSelectPhoto = (uri?: string) => {
    setImages(images.filter(image => image.uri !== uri));
  };

  const onSelectPhotos = async () => {
    const { assets, didCancel } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: PHOTO_LIMIT - images.length,
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

      setImages([...images, ...assets]);
    }

    navigation.navigate('BakeryManualWriteDetail', {
      bakeryInfoForm,
    });
  };

  const goNavSuccessBottomSheet = () => {
    navigation.navigate('SuccessBottomSheet', {
      content: '리뷰 등록이\n완료 되었어요!',
    });
  };

  const closePage = () => {
    navigation.getParent()?.goBack();
  };

  const saveReview = () => {
    console.log({
      detailReview,
      images: images,
      form: bakeryInfoForm,
    });
    closePage();
    goNavSuccessBottomSheet();
  };

  return (
    <BakeryManualWriteDetailComponent
      detailReview={detailReview}
      images={images}
      isLoading={isLoading}
      onChange={onChange}
      onPressUploadButton={onPressUploadButton}
      deSelectPhoto={deSelectPhoto}
      saveReview={saveReview}
      closePage={closePage}
    />
  );
};
