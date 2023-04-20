import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Asset } from 'react-native-image-picker';
import { useReportPhoto } from '@/apis/bakery/useReportPhoto';
import { usePostImages } from '@/apis/image';
import { ReportPhotoComponent } from '@/components/ReportBakery/ReportPhoto';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';

const PHOTO_LIMIT = 10;

export const ReportPhotoContainer = () => {
  const navigation = useNavigation<ReportBakeryStackScreenProps<'ReportPhoto'>['navigation']>();
  const route = useRoute<ReportBakeryStackScreenProps<'ReportPhoto'>['route']>();

  const { bakeryId, bakeryName, photos: photoList } = route.params;
  const { mutateAsync: reportPhoto, isLoading: isSaving } = useReportPhoto();
  const { mutateAsync: postImages } = usePostImages();

  const [photos, setPhotos] = useState<Asset[]>(photoList);

  const onPressPhotoSelectButton = async () => {
    const { assets, didCancel } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: PHOTO_LIMIT - photos.length,
    });

    if (!didCancel && assets) {
      setPhotos([...photos, ...assets]);
    }
  };

  const onPressPhotoDeleteButton = (uri?: string) => {
    setPhotos(_photos => _photos.filter(_photo => _photo.uri !== uri));
  };

  const onPressReportButton = async () => {
    if (isSaving) {
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
      isSaving={isSaving}
      onPressPhotoSelectButton={onPressPhotoSelectButton}
      onPressPhotoDeleteButton={onPressPhotoDeleteButton}
      onPressReportButton={onPressReportButton}
    />
  );
};
