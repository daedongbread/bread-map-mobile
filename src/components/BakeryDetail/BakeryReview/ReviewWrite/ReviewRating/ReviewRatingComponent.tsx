import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text, ValidateErrorText } from '@/components/Shared/Text';
import { ReviewWriteStackNavigationProps } from '@/pages/ReviewWriteStack/Stack';
import { RatedBread, UpdateSeletedBreadRating } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { PhotoSelect } from './PhotoSelect';
import { RatingList } from './RatingList';
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
};

type Navigation = ReviewWriteStackNavigationProps<'ReviewRating'>['navigation'];

export const ReviewRatingComponent: React.FC<Props> = ({
  selectedBreads,
  detailReview,
  images,
  onUpdateBreadRating,
  onChangeDetailReviewText,
  onSelectPhotos,
  deSelectPhoto,
  saveReview,
}) => {
  const navigation = useNavigation<Navigation>();

  const onPressClose = () => {
    navigation.navigate('QuestionBottomSheet');
  };

  const onPressSave = () => {
    if (detailReview.length < 10) {
      setIsShowErrorMessage(true);
    } else {
      setIsShowErrorMessage(false);
      saveReview();
    }
  };

  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header title={'리뷰작성'} onPressClose={onPressClose} isPrevButtonShown isCloseButtonShown />
        <ScrollView style={styles.contentsContainer}>
          <SplitRow height={12} />
          <Title />
          <SplitRow height={28} />
          <RatingList selectedBreads={selectedBreads} onUpdateBreadRating={onUpdateBreadRating} />
          <View style={styles.detailReviewContainer}>
            <Text presets={['body2', 'bold']} style={styles.title}>
              상세한 후기
            </Text>
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
            <Text presets={['body2', 'bold']} style={styles.photoTitleText}>
              사진 업로드
            </Text>
            <PhotoSelect images={images} onSelectPhotos={onSelectPhotos} deSelectPhoto={deSelectPhoto} />
          </View>
        </ScrollView>
        <Button style={styles.confirmBtn} onPress={onPressSave}>
          {'확인'}
        </Button>
      </SafeAreaView>
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
    color: theme.color.gray800,
  },
  detailReviewContainer: {
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
    color: theme.color.gray900,
  },
  confirmBtn: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
