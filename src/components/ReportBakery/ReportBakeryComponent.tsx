import React, { useRef } from 'react';
import { Dimensions, Keyboard, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReportBakeryForm, ReportBakeryValidFormData } from '@/containers/ReportBakery/ReportBakery';
import { theme } from '@/styles/theme';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { Button } from '@shared/Button/Button';
import { Header } from '@shared/Header';
import { SplitRow } from '@shared/SplitSpace';
import { Text } from '@shared/Text';
import { TextInput } from '@shared/TextInput';
import { SubTitle } from '../BakeryDetail/BakeryReview/ReviewWrite/ReviewRating';
import { PhotoSelect } from '../BakeryDetail/BakeryReview/ReviewWrite/ReviewRating/PhotoSelect';
import { Loading } from '../Shared/Loading';
import { CancelBottomSheet } from './CancelBottomSheet';
import { ReportSuccessBottomSheet } from './ReportSuccessBottomSheet';

const { height } = Dimensions.get('screen');

type Props = {
  form: ReportBakeryForm;
  formValid: ReportBakeryValidFormData;
  reportSuccessBottomSheetRef: React.ForwardedRef<BottomSheet>;
  isLoading: boolean;
  onChange: (key: string, value: string) => void;
  onSelectPhotos: () => void;
  deSelectPhoto: (uri?: string) => void;
  onPressConfirm: () => void;
  closePage: () => void;
};

export const ReportBakeryComponent: React.FC<Props> = ({
  form,
  formValid,
  reportSuccessBottomSheetRef,
  isLoading,
  onChange,
  onSelectPhotos,
  deSelectPhoto,
  onPressConfirm,
  closePage,
}) => {
  const insets = useSafeAreaInsets();

  const cancleBottomSheetRef = useRef<BottomSheet>(null);

  const isValidName = form.name.trim().length > 0;
  const isValidLocation = form.location.trim().length > 0;

  const onPressClose = () => {
    Keyboard.dismiss();
    cancleBottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPressClose={onPressClose} isPrevButtonShown isCloseButtonShown />
      <KeyboardAwareScrollView style={styles.fullScreen} keyboardShouldPersistTaps="handled">
        <SplitRow height={12} />
        <View style={styles.paddingHorizontal}>
          <Text presets={['heading1', 'bold']} style={styles.titleText}>
            <Text style={styles.titleHighlightText}>빵집 정보</Text>를{'\n'}알려주시겠어요?
          </Text>
        </View>

        <SplitRow height={40} />

        <View style={styles.paddingHorizontal}>
          <SubTitle isRequire>빵집이름</SubTitle>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="빵집이름을 입력해주세요"
              value={form.name}
              isAlert
              error={!formValid.isValidName && !isValidName ? '빵집이름을 입력해주세요' : ''}
              maxLength={20}
              onChangeText={text => onChange('name', text)}
            />
          </View>

          <SubTitle isRequire>위치</SubTitle>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예시) 서울시 강남구 역삼동"
              value={form.location}
              isAlert
              error={!formValid.isValidLocation && !isValidLocation ? '위치를 입력해주세요' : ''}
              maxLength={100}
              onChangeText={text => onChange('location', text)}
            />
          </View>

          <SubTitle>추천이유</SubTitle>
          <View style={styles.inputContainer}>
            <TextInput
              multiline
              style={[styles.input, styles.reasonInput]}
              placeholder="이 빵집을 추천하는 이유는 무엇인가요!"
              value={form.content}
              maxLength={500}
              onChangeText={text => onChange('content', text)}
            />
          </View>
        </View>

        <View style={styles.paddingHorizontal}>
          <SubTitle>사진 업로드</SubTitle>
        </View>

        <PhotoSelect images={form.images} onSelectPhotos={onSelectPhotos} deSelectPhoto={deSelectPhoto} />

        <SplitRow height={40} />
      </KeyboardAwareScrollView>
      <Button style={styles.bottomButton} onPress={onPressConfirm}>
        확인
      </Button>

      <ReportSuccessBottomSheet bottomSheetRef={reportSuccessBottomSheetRef} title="제보" onPress={closePage} />
      <CancelBottomSheet bottomSheetRef={cancleBottomSheetRef} onPressClose={closePage} />

      {isLoading && <Loading />}
      {insets.bottom === 0 && <SplitRow height={16} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  titleText: {
    color: theme.color.gray900,
  },
  titleHighlightText: {
    color: theme.color.primary500,
  },
  inputContainer: {
    marginHorizontal: -14,
  },
  input: {
    backgroundColor: theme.color.gray50,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: '#222222',
  },
  reasonInput: {
    textAlignVertical: 'top',
    height: height * 0.15,
    paddingTop: 14,
  },
  bottomButton: {
    marginHorizontal: 20,
  },
});
