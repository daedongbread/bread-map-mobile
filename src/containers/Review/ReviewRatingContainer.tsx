import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { ReviewRating } from '@/components/BakeryDetail/Review/ReviewWrite/ReviewRating';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import {
  updateDetailReview,
  updateImages,
  updateSeletedBreadRating,
  UpdateSeletedBreadRating,
} from '@/slices/reviewWrite';
import { useNavigation } from '@react-navigation/native';

export const PHOTO_LIMIT = 10;

const bakeryId = 30300001400004;

export const ReviewRatingContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<MainStackScreenProps<'ReviewWriteStack'>['navigation']>();

  const { selectedBreads, manualSelectedBreads, detailReview, images } = useAppSelector(
    selector => selector.reviewWrite
  );

  const onUpdateBakeryRating = ({ id, rating }: UpdateSeletedBreadRating) => {
    dispatch(updateSeletedBreadRating({ id, rating }));
  };
  const onChangeDetailReviewText = (text: string) => {
    dispatch(updateDetailReview({ detailReview: text }));
  };
  const onSelectPhotos = async () => {
    const { assets, didCancel } = await launchImageLibrary({ mediaType: 'photo', selectionLimit: PHOTO_LIMIT });

    if (!didCancel && assets) {
      // 이미지 중복 제거 방안이 필요해 보임
      dispatch(updateImages([...images, ...assets]));
    }
  };
  const deSelectPhoto = (uri?: string) => {
    dispatch(updateImages(images.filter(image => image.uri !== uri)));
  };

  const saveReview = async () => {
    // await fetcher.post(`/review/${bakeryId}/info`);
    // await fetcher.post(`/review/${bakeryId}/photo`);
  };

  //react-navigation 에서 현재 stack 자체를 pop 할 수 없는 방법이 없어 동적으로 .pop(number)에 값을 줘서 해결
  const closePage = () => {
    navigation.pop(2);
  };

  return (
    <ReviewRating
      selectedBreads={[...selectedBreads, ...manualSelectedBreads]}
      detailReview={detailReview}
      images={images}
      onUpdateBreadRating={onUpdateBakeryRating}
      onChangeDetailReviewText={onChangeDetailReviewText}
      onSelectPhotos={onSelectPhotos}
      deSelectPhoto={deSelectPhoto}
      saveReview={saveReview}
      closePage={closePage}
    />
  );
};
