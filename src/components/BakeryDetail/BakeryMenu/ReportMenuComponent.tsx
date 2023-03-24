import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { TextInput } from '@/components/Shared/TextInput';
import { ReportMenuForm, ReportMenuValidFormData } from '@/containers/BakeryDetail/BakeryMenu/ReportMenuContainer';
import { theme } from '@/styles/theme';
import { numberFormat } from '@/utils';
import { SubTitle } from '../BakeryReview/ReviewWrite/ReviewRating';
import { PhotoSelect } from '../BakeryReview/ReviewWrite/ReviewRating/PhotoSelect';

const { height } = Dimensions.get('screen');

type Props = {
  form: ReportMenuForm;
  formValid: ReportMenuValidFormData;
  onSelectPhotos: () => void;
  deSelectPhoto: (uri?: string) => void;
  onChange: (key: string, value: string) => void;
  onPressConfirm: () => void;
  onPressClose: () => void;
  closePage: () => void;
};

export const ReportMenuComponent = ({
  form,
  formValid,
  onSelectPhotos,
  deSelectPhoto,
  onChange,
  onPressClose,
  onPressConfirm,
}: Props) => {
  const insets = useSafeAreaInsets();

  const isValidName = form.name.trim().length > 0;
  const isValidPrice = form.price.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header onPressClose={onPressClose} isPrevButtonShown isCloseButtonShown />
      <KeyboardAwareScrollView style={styles.fullScreen}>
        <SplitRow height={12} />
        <View style={styles.paddingHorizontal}>
          <Text presets={['heading1', 'bold']} style={styles.titleText}>
            <Text style={styles.titleHighlightText}>어떤 빵</Text>을{'\n'}제보하시나요?
          </Text>
        </View>
        <SplitRow height={40} />
        <View style={styles.paddingHorizontal}>
          <SubTitle isRequire>메뉴명</SubTitle>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="메뉴명을 입력해주세요"
              value={form.name}
              isAlert
              error={!formValid.isValidName && !isValidName ? '메뉴명을 입력해주세요' : ''}
              onChangeText={text => onChange('name', text)}
            />
          </View>

          <SubTitle isRequire>가격</SubTitle>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="원"
              maxLength={7}
              value={form.price ? numberFormat(Number(form.price)) : ''}
              isAlert
              error={!formValid.isValidPrice && !isValidPrice ? '가격을 입력해주세요' : ''}
              keyboardType={'number-pad'}
              onChangeText={text => onChange('price', text)}
            />
          </View>
        </View>

        <View style={styles.paddingHorizontal}>
          <SubTitle>사진 업로드</SubTitle>
        </View>

        <PhotoSelect images={form.images} onSelectPhotos={onSelectPhotos} deSelectPhoto={deSelectPhoto} />
      </KeyboardAwareScrollView>

      <Button style={styles.bottomButton} onPress={onPressConfirm}>
        확인
      </Button>
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
