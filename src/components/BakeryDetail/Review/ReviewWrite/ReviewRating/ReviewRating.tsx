import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Shared/Button/Button';
import { ImageCloseIcon } from '@/components/Shared/Icons';
import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { updateSeletedBakeryRating } from '@/slices/review';
import { theme } from '@/styles/theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { TopHeader } from '../ReviewSelect/TopHeader';
import { RatingList } from './RatingList';
import { Title } from './Title';

type Props = {
  selectedBakery: BakeryType[];
  onUpdateBakeryRating: ({ id, rating }: updateSeletedBakeryRating) => void;
};

export const ReviewRating: React.FC<Props> = ({ selectedBakery, onUpdateBakeryRating }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title={'리뷰작성'} />
      <Title />
      <View style={styles.contentsContainer}>
        <RatingList selectedBakery={selectedBakery} onUpdateBakeryRating={onUpdateBakeryRating} />
        <View style={styles.detailReviewContainer}>
          <Text style={styles.title}>상세한 후기</Text>
          <TextInput
            multiline
            style={styles.detailReviewTextInput}
            placeholder="자세한 후기는 다른 빵순이, 빵돌이들에게 많은 도움이 됩니다. "
          />
          <Text style={styles.wordCount}>0자 / 최소 10자</Text>
        </View>
        <View style={styles.uploadContainer}>
          <Text style={styles.title}>사진 업로드</Text>
          <FlatList
            data={[1, 2, 3, 4]}
            contentContainerStyle={styles.uploadImageContainer}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({}) => (
              <>
                <Image style={styles.uploadImage} source={require('@/components/Shared/Images/bread.png')} />
                <TouchableOpacity style={styles.uploadImageCloseButton}>
                  <ImageCloseIcon />
                </TouchableOpacity>
              </>
            )}
          />
        </View>
      </View>
      <Button onPress={() => null} style={styles.confirmBtn}>
        {'확인'}
      </Button>
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
  wordCount: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    paddingTop: 8,
    color: '#9E9E9E',
    fontSize: 12,
  },
  uploadContainer: {
    paddingTop: 36,
    paddingLeft: 20,
  },
  uploadImageContainer: {
    paddingTop: 12,
  },
  uploadImage: {
    width: 88,
    height: 88,
    borderRadius: 8,
    marginRight: 12,
  },
  uploadImageCloseButton: {
    position: 'absolute',
    right: 8,
    top: -4,
  },
  confirmBtn: {
    paddingHorizontal: 20,
  },
});
