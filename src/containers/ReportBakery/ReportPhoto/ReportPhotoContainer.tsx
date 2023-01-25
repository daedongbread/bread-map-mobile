import React, { useRef, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Asset } from 'react-native-image-picker';
import { ReportPhotoComponent } from '@/components/ReportBakery/ReportPhoto';
import { ReportBakeryStackScreenProps } from '@/pages/MainStack/ReportBakeryStack/Stack';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation, useRoute } from '@react-navigation/native';

const PHOTO_LIMIT = 10;

export const ReportPhotoContainer = () => {
  const route = useRoute<ReportBakeryStackScreenProps<'ReportPhoto'>['route']>();
  const nvaigation = useNavigation<ReportBakeryStackScreenProps<'ReportPhoto'>['navigation']>();

  const reportSuccessBottomSheetRef = useRef<BottomSheet>(null);
  const [photos, setPhotos] = useState<Asset[]>(route.params.photos);

  const onPressPhotoSelectButton = async () => {
    const { assets, didCancel } = await launchImageLibrary({ mediaType: 'photo', selectionLimit: PHOTO_LIMIT });

    if (!didCancel && assets) {
      setPhotos(assets);
    }
  };

  const onPressPhotoDeleteButton = (uri?: string) => {
    setPhotos(_photos => _photos.filter(_photo => _photo.uri !== uri));
  };

  const onPressReportButton = () => {
    // TO DO : 사진 서버에 저장하는 로직 필요 (현재 api 찾는중!)
    reportSuccessBottomSheetRef.current?.expand();
  };

  const closeSuccessPopup = () => {
    nvaigation.pop();
  };

  return (
    <ReportPhotoComponent
      bakeryName={route.params.bakeryName}
      photos={photos}
      reportSuccessBottomSheetRef={reportSuccessBottomSheetRef}
      onPressPhotoSelectButton={onPressPhotoSelectButton}
      onPressPhotoDeleteButton={onPressPhotoDeleteButton}
      onPressReportButton={onPressReportButton}
      closeSuccessPopup={closeSuccessPopup}
    />
  );
};
