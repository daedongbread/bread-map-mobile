import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { usePostImages } from '@/apis/image';
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
import { showToast } from '@/slices/toast';
import { useNavigation, useRoute } from '@react-navigation/native';

export const PHOTO_LIMIT = 10;

type Navigation = ReviewWriteStackNavigationProps<'ReviewRating'>['navigation'];
type Route = ReviewWriteStackNavigationProps<'ReviewRating'>['route'];

export const ReviewRatingContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { bakeryId } = route.params;
  const { mutateAsync: postReview, isLoading: isReviewSaving } = usePostReview();
  const { mutateAsync: postImages, isLoading: isImageSaving } = usePostImages();
  const isLoading = isReviewSaving || isImageSaving;

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
      dispatch(updateImages([...images, ...assets]));
    }
  };

  const deSelectPhoto = (uri?: string) => {
    dispatch(updateImages(images.filter(image => image.uri !== uri)));
  };

  const saveReview = async () => {
    // 선택한 빵이 없다면 빵 선택 화면으로 이동
    if ([...selectedBreads, ...manualSelectedBreads].length === 0) {
      navigation.pop();
      return;
    }
    // 현재 저장 중이면 return;
    if (isLoading) {
      return;
    }

    const productRatingList = selectedBreads.map(bread => {
      return { productId: bread.id, rating: bread.rating };
    });
    const noExistProductRatingRequestList = manualSelectedBreads.map(bread => {
      return { productType: 'BREAD', productName: bread.name, rating: bread.rating };
    });

    const imagePaths =
      images.length > 0
        ? await postImages({
            images,
            width: 310,
            height: 310,
          })
        : [];

    await postReview(
      {
        bakeryId,
        request: {
          productRatingList,
          noExistProductRatingRequestList,
          content: detailReview,
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
      isLoading={isLoading}
      onUpdateBreadRating={onUpdateBreadRating}
      onChangeDetailReviewText={onChangeDetailReviewText}
      onSelectPhotos={onSelectPhotos}
      deSelectPhoto={deSelectPhoto}
      saveReview={saveReview}
    />
  );
};
