import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { usePostReview } from '@/apis/review';
import { ReviewRatingComponent } from '@/components/BakeryDetail/BakeryReview/ReviewWrite/ReviewRating';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import {
  updateDetailReview,
  updateImages,
  updateManualBreadRating,
  updateSeletedBreadRating,
  UpdateSeletedBreadRating,
} from '@/slices/reviewWrite';
import { useNavigation, useRoute } from '@react-navigation/native';

export const PHOTO_LIMIT = 10;

type Navigation = ReviewWriteStackNavigationProps<'ReviewRating'>['navigation'];
type Route = ReviewWriteStackNavigationProps<'ReviewRating'>['route'];

export const ReviewRatingContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { bakeryId } = route.params;
  const { mutateAsync: postReview } = usePostReview();

  const { selectedBreads, manualSelectedBreads, detailReview, images } = useAppSelector(
    selector => selector.reviewWrite
  );

  const onUpdateBreadRating = (props: UpdateSeletedBreadRating) => {
    if (props.type === 'auto') {
      dispatch(updateSeletedBreadRating(props));
    } else {
      dispatch(updateManualBreadRating(props));
    }
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
    const productRatingList = selectedBreads.map(bread => {
      return { productId: bread.id, rating: bread.rating };
    });
    const noExistProductRatingRequestList = manualSelectedBreads.map(bread => {
      return { productType: 'BREAD', productName: bread.name, rating: bread.rating };
    });

    const request = { productRatingList, noExistProductRatingRequestList, content: detailReview };

    const { data } = await postReview({
      bakeryId,
      images,
      data: request,
    });

    if (data.code === 201) {
      closePage();
      goNavSuccessBottomSheet();
    }
  };

  const goNavSuccessBottomSheet = () => {
    navigation.navigate('SuccessBottomSheet', {
      content: '리뷰 등록이\n완료 되었어요!',
    });
  };

  const closePage = () => {
    navigation.getParent()?.goBack();
  };

  return (
    <ReviewRatingComponent
      selectedBreads={[...selectedBreads, ...manualSelectedBreads]}
      detailReview={detailReview}
      images={images}
      onUpdateBreadRating={onUpdateBreadRating}
      onChangeDetailReviewText={onChangeDetailReviewText}
      onSelectPhotos={onSelectPhotos}
      deSelectPhoto={deSelectPhoto}
      saveReview={saveReview}
    />
  );
};
