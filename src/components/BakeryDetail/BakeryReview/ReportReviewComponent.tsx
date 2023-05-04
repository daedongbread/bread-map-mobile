import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components/Shared/Button/Button';
import { CustomCheckBox } from '@/components/Shared/Chcekbox/CustomCheckBox';
import { Header } from '@/components/Shared/Header';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { TextInput } from '@/components/Shared/TextInput';
import { ReportReviewForm } from '@/containers/BakeryDetail/BakeryReview/ReportReviewContainer';
import { ModalStackScreenProps } from '@/pages/Modal/Stack';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

type ListType = {
  isChecked: boolean;
  reasonKey: string;
  reasonvalue: string;
  isEnd: boolean;
  onChange: (key: keyof ReportReviewForm, value: string) => void;
};

const ReasonItem = ({ isChecked, reasonKey, reasonvalue, isEnd, onChange }: ListType) => {
  const onValueChange = (value: boolean) => {
    let newReason = value ? reasonKey : '';

    onChange('reason', newReason);
  };

  return (
    <>
      <View style={styles.reasonContainer}>
        <CustomCheckBox strokeWidth={2} value={isChecked} onValueChange={onValueChange} />
        <SplitColumn width={6} />
        <Text presets={['body2', 'semibold']} style={styles.reasonText}>
          {reasonvalue}
        </Text>
      </View>
      {!isEnd && <SplitRow height={20} />}
    </>
  );
};

const reasonList = [
  { key: 'IRRELEVANT_CONTENT', value: '리뷰와 관련없는 내용' },
  { key: 'INAPPROPRIATE_CONTENT', value: '음란성, 욕설 등 부적절한 내용' },
  { key: 'IRRELEVANT_IMAGE', value: '리뷰와 관련없는 사진 게시' },
  { key: 'UNFIT_CONTENT', value: '리뷰 작성 취지에 맞지 않는 내용(복사글 등)' },
  { key: 'COPYRIGHT_THEFT', value: '저작권 도용 의심(사진 등)' },
  { key: 'ETC', value: '기타(하단 내용 작성)' },
];

type Props = {
  form: ReportReviewForm;
  onChange: (key: keyof ReportReviewForm, value: string) => void;
  onSubmit: () => void;
};

export const ReportReviewComponent = React.memo(({ form, onChange, onSubmit }: Props) => {
  const navigation = useNavigation<ModalStackScreenProps<'ReportReview'>['navigation']>();

  const isValid = Boolean(form.reason);

  return (
    <SafeAreaView style={styles.fullScreen}>
      <Header title="리뷰 신고하기" isCloseButtonShown onPressClose={() => navigation.goBack()} />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text presets={['heading1', 'bold']} style={styles.title}>
            리뷰를 신고하는{'\n'}이유를 알려주세요!
          </Text>
          <SplitRow height={12} />
          <Text presets={['body2', 'semibold']} style={styles.subTitle}>
            타당한 근거 없이 신고된 내용은 관리자 확인 후{'\n'}반영되지 않을 수 있습니다.
          </Text>
        </View>

        <SplitRow height={30} />

        <View style={styles.contentContainer}>
          {reasonList.map((reason, index) => (
            <ReasonItem
              key={index}
              isChecked={form.reason === reason.key}
              reasonKey={reason.key}
              reasonvalue={reason.value}
              isEnd={index === reasonList.length - 1}
              onChange={onChange}
            />
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChange('content', text)}
            placeholder="신고 내용을 입력해주세요."
            maxLength={500}
            multiline
            value={form.content}
          />
        </View>
      </KeyboardAwareScrollView>
      <Button appearance={isValid ? 'primary' : 'quinary'} style={styles.button} onPress={onSubmit} disabled={!isValid}>
        신고하기
      </Button>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingBottom: 16,
  },
  container: {
    paddingVertical: 12,
  },
  title: {
    color: '#000000',
  },
  subTitle: {
    color: '#616161',
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonText: {
    color: '#424242',
  },
  textInput: {
    height: height * 0.15,
    backgroundColor: theme.color.gray100,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  titleContainer: {
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 6,
  },
  button: {
    marginHorizontal: 20,
  },
});
