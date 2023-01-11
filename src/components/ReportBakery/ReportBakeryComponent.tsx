import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UsePostReportRequest } from '@/apis/report/usePostReport';
import { ReportBakeryValidFormData } from '@/containers/ReportBakery/ReportBakery';
import { theme } from '@/styles/theme';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { Button } from '../Shared/Button/Button';
import { Header } from '../Shared/Header';
import { Label } from '../Shared/Label';
import { SplitRow } from '../Shared/SplitSpace';
import { ValidateErrorText } from '../Shared/Text';
import { CancelBottomSheet } from './CancelBottomSheet';
import { ReportSuccessBottomSheet } from './ReportSuccessBottomSheet';

type Props = {
  form: UsePostReportRequest;
  formValid: ReportBakeryValidFormData;
  reportSuccessBottomSheetRef: React.ForwardedRef<BottomSheet>;
  onChange: (key: string, value: string) => void;
  onPressConfirm: () => void;
  closePage: () => void;
};

export const ReportBakeryComponent: React.FC<Props> = ({
  form,
  formValid,
  reportSuccessBottomSheetRef,
  onChange,
  onPressConfirm,
  closePage,
}) => {
  const cancleBottomSheetRef = useRef<BottomSheet>(null);

  const isValidName = form.name.trim().length > 0;
  const isValidLocation = form.location.trim().length > 0;

  const onPressClose = () => {
    cancleBottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPressClose={onPressClose} isPrevButtonShown isCloseButtonShown />
      <KeyboardAwareScrollView style={styles.fullScreen}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            <Text style={styles.titleHighlightText}>빵집 정보</Text>를{'\n'}알려주시겠어요?
          </Text>
        </View>
        <SplitRow height={40} />
        <View style={styles.formContainer}>
          <Label isRequire>빵집이름</Label>
          <TextInput
            style={styles.input}
            placeholder="빵집이름을 입력해주세요"
            onChangeText={text => onChange('name', text)}
          />
          <SplitRow height={6} />
          <ValidateErrorText isValid={formValid.isValidName || isValidName}>빵집이름을 입력해주세요</ValidateErrorText>
          <SplitRow height={18} />
          <Label isRequire>위치</Label>
          <TextInput
            style={styles.input}
            placeholder="예시) 서울시 강남구 역삼동"
            onChangeText={text => onChange('location', text)}
          />
          <SplitRow height={6} />
          <ValidateErrorText isValid={formValid.isValidLocation || isValidLocation}>
            위치를 입력해주세요
          </ValidateErrorText>
          <SplitRow height={18} />
          <Label>추천이유(선택)</Label>
          <TextInput
            multiline
            style={[styles.input, styles.reasonInput]}
            placeholder="이 빵집을 추천하는 이유는 무엇인가요!"
            onChangeText={text => onChange('content', text)}
          />
        </View>
        <SplitRow height={40} />
      </KeyboardAwareScrollView>
      <Button style={styles.bottomButton} onPress={onPressConfirm}>
        확인
      </Button>
      <ReportSuccessBottomSheet bottomSheetRef={reportSuccessBottomSheetRef} title="제보" onPress={closePage} />
      <CancelBottomSheet bottomSheetRef={cancleBottomSheetRef} onPressClose={closePage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 18,
  },
  fullScreen: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    paddingTop: 12,
  },
  titleText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  titleHighlightText: {
    color: theme.color.primary500,
  },
  formContainer: {},
  input: {
    fontSize: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  reasonInput: {
    textAlignVertical: 'top',
    paddingTop: 12,
    height: 200,
  },
  bottomButton: {
    marginHorizontal: 20,
  },
});
