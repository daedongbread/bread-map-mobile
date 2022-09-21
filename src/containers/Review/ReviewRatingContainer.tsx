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

export const ReviewRatingContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<MainStackScreenProps<'ReviewWriteStack'>['navigation']>();

  const { selectedBreads, detailReview, images } = useAppSelector(selector => selector.reviewWrite);

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
  // const saveReview = async () => {
  //   // const files = images.map(image => {
  //   //   return {
  //   //     uri: image.uri,
  //   //     name: image.fileName,
  //   //     type: image.type,
  //   //   };
  //   // });

  //   // const files = images.map(image => {
  //   //   return {
  //   //     uri: Platform.OS === 'android' ? image.uri : image.uri?.replace('file://', ''),,
  //   //     name: image.fileName,
  //   //     type: image.type,
  //   //   };
  //   // });

  //   // const files = {
  //   //   uri: images[0].uri,
  //   //   type: images[0].type,
  //   //   name: images[0].fileName,
  //   // };

  //   // const files = {
  //   //   uri: 'file://Users/yeop/Library/Developer/CoreSimulator/Devices/A45B9688-9BFB-47CE-A6BD-D1197BECF7AC/data/Containers/Data/Application/491D05B6-2B30-4839-8D5D-F41AE32474B7/tmp/8AB46A31-BA24-4395-A2AB-C10769626920.jpg',
  //   //   name: 'nameTest1',
  //   //   type: 'image/png',
  //   // };

  //   const breadRatingList = selectedBreads.map(bread => {
  //     return {
  //       breadId: bread.id,
  //       rating: bread.rating,
  //     };
  //   });
  //   const noExistBreadRatingRequestList: any[] = [];

  //   const request = {
  //     breadRatingList,
  //     noExistBreadRatingRequestList,
  //     content: detailReview,
  //   };

  //   const formData = new FormData();

  //   console.log('============file============');
  //   // console.log(files);
  //   formData.append('files', {
  //     uri: images[0].uri,
  //     type: images[0].type,
  //     name: images[0].fileName,
  //   });

  //   console.log('============request============');
  //   console.log(request);

  //   // formData.append('request', JSON.stringify(request));

  //   // formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json', lastModified: 0 }));
  //   formData.append('request', request);
  //   // formData.append('test', 'react test');
  //   // formData.append('request', );
  //   // formData.append(
  //   //   'request',
  //   //   '{"breadRatingList": [{"breadId": 5, "rating": 5}], "content": "Test", "noExistBreadRatingRequestList": []}'
  //   // );

  //   console.log(JSON.stringify(formData));

  //   await fetcher
  //     .post(`http://localhost:8080/review/${bakeryId}`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //       transformRequest: data => {
  //         return data;
  //       },
  //     })
  //     .then(() => console.log('succeess'))
  //     .catch((e: AxiosError) => {
  //       console.log(e.response.data);
  //     });

  //   // console.log('saved!');
  //   // let res = await fetch(`http://localhost:8080/review/${bakeryId}`, {
  //   //   method: 'post',
  //   //   body: formData,
  //   //   headers: {
  //   //     'Content-Type': 'multipart/form-data;',
  //   //     Authorization:
  //   //       'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJHT09HTEVfMTA1MTUwODQxNTMwNTI2OTQwMjk2Iiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2NjMyNTg3MzMsImV4cCI6MTY2MzI2MjMzM30.R4pBHM3zSmsZrtUog-VNQp_tYssEkx0WLVTbFwb5G28',
  //   //   },
  //   // });

  //   // let resp = await res.json();
  //   // console.log(resp);
  // };

  const saveReview = () => {};

  //react-navigation 에서 현재 stack 자체를 pop 할 수 없는 방법이 없어 동적으로 .pop(number)에 값을 줘서 해결
  const closePage = () => {
    navigation.pop(2);
  };

  return (
    <ReviewRating
      selectedBreads={selectedBreads}
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
