import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Shared/Button';
import { Header } from '@/components/Shared/Header';
import { Loading } from '@/components/Shared/Loading';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { TextInput } from '@/components/Shared/TextInput';
import { theme } from '@/styles/theme';
import { SubTitle } from '../ReviewRating';
import { PhotoSelect } from '../ReviewRating/PhotoSelect';

const { height } = Dimensions.get('screen');

type Props = {
  bakeryName: string;
  detailReview: string;
  images: Asset[];
  isLoading: boolean;
  onChange: (text: string) => void;
  onPressUploadButton: () => void;
  deSelectPhoto: (uri?: string) => void;
  saveReview: () => void;
  closePage: () => void;
};

export const BakeryManualWriteDetailComponent = ({
  bakeryName,
  detailReview,
  images,
  isLoading,
  onChange,
  onPressUploadButton,
  deSelectPhoto,
  saveReview,
  closePage,
}: Props) => {
  const insets = useSafeAreaInsets();

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
    <SafeAreaView style={styles.flex}>
      <Header isPrevButtonShown isCloseButtonShown onPressClose={closePage} />

      <ScrollView style={[styles.flex, styles.container]}>
        <Text color={theme.color.black} presets={['subTitle1', 'bold']}>
          <Text color={theme.color.primary500}>{bakeryName}</Text> 에 대해{'\n'}이야기 해주세요.
        </Text>

        <SplitRow height={40} />

        <SubTitle isRequire>상세한 후기</SubTitle>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.detailReviewTextInput}
            placeholder="자세한 후기는 다른 빵순이, 빵돌이들에게 많은 도움이 됩니다."
            value={detailReview}
            multiline
            isAlert
            hint={`${detailReview.length}자 / 최소 10자`}
            error={isShowErrorMessage && detailReview.trim().length < 10 ? '10자이상 입력해주세요' : ''}
            maxLength={200}
            onChangeText={onChange}
          />
        </View>

        <SplitRow height={32} />

        <SubTitle>사진 업로드</SubTitle>
        <View style={styles.photoContainer}>
          <PhotoSelect images={images} onSelectPhotos={onPressUploadButton} deSelectPhoto={deSelectPhoto} />
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
  flex: {
    flex: 1,
  },
  container: {
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
  photoContainer: {
    marginHorizontal: -20,
  },
  confirmBtn: {
    paddingHorizontal: 20,
  },
});
