import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, TextInput as OriginTextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BakeryTagRow } from '@/components/Community/PostWrite';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { Loading } from '@/components/Shared/Loading';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { TextInput } from '@/components/Shared/TextInput';
import { RatedBread, UpdateSeletedBreadRating } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import { PhotoSelect } from './PhotoSelect';
import { RatingList } from './RatingList';
import { SubTitle } from './SubTitle';
import { Title } from './Title';

const { height } = Dimensions.get('screen');

type Props = {
  selectedBreads: RatedBread[];
  detailReview: string;
  images: Asset[];
  isLoading: boolean;
  onUpdateBreadRating: ({ id, rating, type }: UpdateSeletedBreadRating) => void;
  onChangeDetailReviewText: (text: string) => void;
  onPressUploadButton: () => void;
  deSelectPhoto: (uri?: string) => void;
  saveReview: () => void;
};

export const ReviewRatingComponent: React.FC<Props> = ({
  selectedBreads,
  detailReview,
  images,
  isLoading,
  onUpdateBreadRating,
  onChangeDetailReviewText,
  onPressUploadButton,
  deSelectPhoto,
  saveReview,
}) => {
  const insets = useSafeAreaInsets();

  const contentInputRef = useRef<OriginTextInput>(null);

  const onPressSave = () => {
    if (detailReview.length < 10) {
      setIsShowErrorMessage(true);
      contentInputRef.current?.focus();
    } else {
      setIsShowErrorMessage(false);
      saveReview();
    }
  };

  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentsContainer}>
        <Header isPrevButtonShown />

        <BakeryTagRow bakeryName="아우어 베이커리 논현점" />
        <SplitRow height={24} />

        <Title />

        <SplitRow height={28} />
        <View style={styles.formContainer}>
          <SubTitle isRequire>빵 평점</SubTitle>
          <RatingList selectedBreads={selectedBreads} onUpdateBreadRating={onUpdateBreadRating} />

          <SubTitle isRequire>상세한 후기</SubTitle>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.detailReviewTextInput]}
              placeholder="자세한 후기는 다른 빵순이, 빵돌이들에게 많은 도움이 됩니다."
              value={detailReview}
              multiline
              isAlert
              hint={`${detailReview.length}자 / 최소 10자`}
              error={isShowErrorMessage && detailReview.trim().length < 10 ? '10자이상 입력해주세요' : ''}
              maxLength={200}
              onChangeText={onChangeDetailReviewText}
            />
          </View>

          <SplitRow height={32} />

          <View>
            <SubTitle isRequire={false}>사진 업로드</SubTitle>

            <View style={styles.photoContainer}>
              <PhotoSelect images={images} onSelectPhotos={onPressUploadButton} deSelectPhoto={deSelectPhoto} />
            </View>
          </View>

          <SplitRow height={16} />
        </View>
      </ScrollView>
      <Button style={styles.confirmBtn} onPress={onPressSave}>
        {'확인'}
      </Button>
      {insets.bottom === 0 && <SplitRow height={16} />}

      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 6,
  },
  detailReviewTextInput: {
    color: theme.color.gray800,
    height: height * 0.15,
    borderRadius: 8,
    backgroundColor: theme.color.gray50,
    textAlignVertical: 'top',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  photoContainer: {
    marginHorizontal: -20,
  },
  confirmBtn: {
    paddingHorizontal: 20,
  },
});
