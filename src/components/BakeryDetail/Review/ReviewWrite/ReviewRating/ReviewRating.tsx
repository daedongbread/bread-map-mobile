import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Shared/Button/Button';
import { AlertIcon } from '@/components/Shared/Icons/AlertIcon';
import { RatedBread, UpdateSeletedBreadRating } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';

import { TopHeader } from '../ReviewSelect/TopHeader';
import { PhotoSelect } from './PhotoSelect';
import { QuestionPopup } from './QuestionPopup';
import { RatingList } from './RatingList';
import { SuccessPopup } from './SuccessPopup';
import { Title } from './Title';

type Props = {
  selectedBreads: RatedBread[];
  detailReview: string;
  images: Asset[];
  onUpdateBreadRating: ({ id, rating }: UpdateSeletedBreadRating) => void;
  onChangeDetailReviewText: (text: string) => void;
  onSelectPhotos: () => void;
  deSelectPhoto: (uri?: string) => void;
  saveReview: () => void;
};

const ErrText = () => {
  return (
    <View style={styles.errTextContainer}>
      <AlertIcon />
      <Text style={styles.wordCountErr}>10자이상 입력해주세요</Text>
    </View>
  );
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
}) => {
  const [isShowQuestionPopup, setIsShowQuestionPopup] = useState(false);
  const [isShowSuccessPopup, setIsShowSuccessPopup] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TopHeader title={'리뷰작성'} closePopup={() => setIsShowQuestionPopup(true)} />
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
              {detailReview.length < 10 ? <ErrText /> : <View />}
              <Text style={styles.wordCount}>{detailReview.length}자 / 최소 10자</Text>
            </View>
          </View>
          <PhotoSelect images={images} onSelectPhotos={onSelectPhotos} deSelectPhoto={deSelectPhoto} />
        </ScrollView>
        <Button onPress={() => saveReview()} style={styles.confirmBtn}>
          {'확인'}
        </Button>
      </SafeAreaView>
      {isShowQuestionPopup && <QuestionPopup closePopup={() => setIsShowQuestionPopup(false)} />}
      {isShowSuccessPopup && <SuccessPopup closePopup={() => setIsShowSuccessPopup(false)} />}
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
  confirmBtn: {
    paddingHorizontal: 20,
  },
});
