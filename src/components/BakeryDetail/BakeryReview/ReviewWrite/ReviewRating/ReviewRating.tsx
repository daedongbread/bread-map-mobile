import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { ValidateErrorText } from '@/components/Shared/Text';
import { RatedBread, UpdateSeletedBreadRating } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import { PhotoSelect } from './PhotoSelect';
import { QuestionPopup } from './QuestionPopup';
import { RatingList } from './RatingList';
import { SuccessPopup } from './SuccessPopup';
import { Title } from './Title';

type Props = {
  selectedBreads: RatedBread[];
  detailReview: string;
  images: Asset[];
  onUpdateBreadRating: ({ id, rating, type }: UpdateSeletedBreadRating) => void;
  onChangeDetailReviewText: (text: string) => void;
  onSelectPhotos: () => void;
  deSelectPhoto: (uri?: string) => void;
  saveReview: () => void;
  closePage: () => void;
};

export const ReviewRating: React.FC<Props> = ({
  selectedBreads,
  detailReview,
  images,
  onUpdateBreadRating,
  onChangeDetailReviewText,
  onSelectPhotos,
  deSelectPhoto,
  saveReview,
  closePage,
}) => {
  const [isShowQuestionPopup, setIsShowQuestionPopup] = useState(false);
  const [isShowSuccessPopup, setIsShowSuccessPopup] = useState(false);

  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title={'리뷰작성'}
          onPressClose={() => setIsShowQuestionPopup(true)}
          isPrevButtonShown
          isCloseButtonShown
        />
        <ScrollView style={styles.contentsContainer}>
          <Title />
          <RatingList selectedBreads={selectedBreads} onUpdateBreadRating={onUpdateBreadRating} />
          <View style={styles.detailReviewContainer}>
            <Text style={styles.title}>상세한 후기</Text>
            <TextInput
              multiline
              onChangeText={onChangeDetailReviewText}
              defaultValue={detailReview}
              style={styles.detailReviewTextInput}
              placeholder="자세한 후기는 다른 빵순이, 빵돌이들에게 많은 도움이 됩니다."
            />
            <View style={styles.textContainer}>
              <ValidateErrorText isValid={!isShowErrorMessage || detailReview.trim().length >= 10}>
                10자이상 입력해주세요
              </ValidateErrorText>
              <Text style={styles.wordCount}>{detailReview.length}자 / 최소 10자</Text>
            </View>
          </View>
          <View style={styles.photoContainer}>
            <Text style={styles.photoTitleText}>사진 업로드</Text>
            <PhotoSelect images={images} onSelectPhotos={onSelectPhotos} deSelectPhoto={deSelectPhoto} />
          </View>
        </ScrollView>
        <Button
          style={styles.confirmBtn}
          // layer popup 전역, 공통화 필요 (추후 layer popup 공통화 branch에서 작업 예정)
          onPress={() => {
            if (detailReview.length < 10) {
              setIsShowErrorMessage(true);
              return;
            } else {
              setIsShowErrorMessage(false);
            }
            saveReview();
            setIsShowSuccessPopup(true);
          }}
        >
          {'확인'}
        </Button>
      </SafeAreaView>
      {isShowQuestionPopup && <QuestionPopup closePopup={() => setIsShowQuestionPopup(false)} closePage={closePage} />}
      {isShowSuccessPopup && <SuccessPopup closePage={closePage} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  detailReviewContainer: {
    paddingTop: 28,
    paddingLeft: 20,
  },
  detailReviewTextInput: {
    marginRight: 20,
    marginTop: 12,
    height: 100,
    borderRadius: 8,
    backgroundColor: theme.color.gray100,
    textAlignVertical: 'top',
    paddingTop: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#9E9E9E',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  errTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordCountErr: {
    color: '#F3213B',
    paddingLeft: 4,
    fontSize: 12,
  },
  wordCount: {
    paddingRight: 20,
    color: '#9E9E9E',
    fontSize: 12,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  photoContainer: {
    paddingTop: 36,
    paddingLeft: 20,
    marginBottom: 16,
  },
  photoTitleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  confirmBtn: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
