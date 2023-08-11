import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { TextInput } from '@/components/Shared/TextInput';
import { AccuseForm } from '@/containers/BakeryDetail/BakeryReview/AccuseReviewContainer';
import { theme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../Shared/Loading';
import { AccuesItem } from './AccuesItem';

const { height } = Dimensions.get('screen');

export type ReasonType = {
  key: string;
  value: string;
};

type Props = {
  headerText: string;
  title: string;
  subTitle: string;
  reasonList: ReasonType[];
  form: AccuseForm;
  isLoading: boolean;
  onChange: (key: keyof AccuseForm, value: string) => void;
  onSubmit: () => void;
};

export const AccuseComponent = React.memo(
  ({ headerText, title, subTitle, reasonList, form, isLoading, onChange, onSubmit }: Props) => {
    const navigation = useNavigation();

    const isValid = Boolean(form.reason);

    return (
      <SafeAreaView style={styles.fullScreen}>
        <Header title={headerText} isCloseButtonShown onPressClose={() => navigation.goBack()} />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.titleContainer}>
            <Text presets={['heading1', 'bold']} style={styles.title}>
              {title}
            </Text>
            <SplitRow height={12} />
            <Text presets={['body2', 'semibold']} style={styles.subTitle}>
              {subTitle}
            </Text>
          </View>

          <SplitRow height={30} />

          <View style={styles.contentContainer}>
            {reasonList.map((reason, index) => (
              <AccuesItem
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
        <Button
          appearance={isValid ? 'primary' : 'quinary'}
          style={styles.button}
          onPress={onSubmit}
          disabled={!isValid}
        >
          신고하기
        </Button>

        {isLoading && <Loading />}
      </SafeAreaView>
    );
  }
);

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
