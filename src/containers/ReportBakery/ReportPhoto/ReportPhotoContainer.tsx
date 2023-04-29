import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Asset } from 'react-native-image-picker';
import { useReportPhoto } from '@/apis/bakery/useReportPhoto';
import { usePostImages } from '@/apis/image';
import { ReportPhotoComponent } from '@/components/ReportBakery/ReportPhoto';
import { useAppDispatch } from '@/hooks/redux';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { showToast } from '@/slices/toast';
import { useNavigation, useRoute } from '@react-navigation/native';

const PHOTO_LIMIT = 10;

export const ReportPhotoContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ReportBakeryStackScreenProps<'ReportPhoto'>['navigation']>();
  const route = useRoute<ReportBakeryStackScreenProps<'ReportPhoto'>['route']>();

  const { bakeryId, bakeryName, photos: photoList } = route.params;
  const { mutateAsync: reportPhoto, isLoading: isReportSaving } = useReportPhoto();
  const { mutateAsync: postImages, isLoading: isImageSaving } = usePostImages();

  let isLoading = isReportSaving || isImageSaving;

  const [photos, setPhotos] = useState<Asset[]>(photoList);

  const onPressPhotoSelectButton = async () => {
    const { assets, didCancel } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: PHOTO_LIMIT - photos.length,
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
      setPhotos([...photos, ...assets]);
    }
  };

  const onPressPhotoDeleteButton = (uri?: string) => {
    setPhotos(_photos => _photos.filter(_photo => _photo.uri !== uri));
  };

  const onPressReportButton = async () => {
    if (isLoading) {
      return;
    }

    const imagePaths = await postImages(photoList);

    await reportPhoto(
      {
        bakeryId,
        request: {
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

  const goNavSuccessBottomSheet = () => {
    navigation.navigate('MainStack', {
      screen: 'SuccessBottomSheet',
      params: {
        content: '사진 제보 감사해요!\n심사과정을 거쳐 반영할게요!',
      },
    });
  };

  const closePage = () => {
    navigation.goBack();
  };

  return (
    <ReportPhotoComponent
      bakeryName={bakeryName}
      photos={photos}
      isLoading={isLoading}
      onPressPhotoSelectButton={onPressPhotoSelectButton}
      onPressPhotoDeleteButton={onPressPhotoDeleteButton}
      onPressReportButton={onPressReportButton}
    />
  );
};
