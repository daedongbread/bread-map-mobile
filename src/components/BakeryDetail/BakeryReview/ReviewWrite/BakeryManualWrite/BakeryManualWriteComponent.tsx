import React from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Shared/Button';

import { Header } from '@/components/Shared/Header';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { presets } from '@/components/Shared/Text/presets';
import { Flex, Row, ScrollView } from '@/components/Shared/View';
import { BakeryManualWriteForm } from '@/containers/Review/BakeryManualWriteContainer';
import { theme } from '@/styles/theme';
import MinusButton from '@shared/Icons/MinusButton.svg';
import { SubTitle } from '../ReviewRating';
import { AddButton } from '../ReviewSelect/AddButton';

type Props = {
  form: BakeryManualWriteForm;
  onChange: (key: keyof BakeryManualWriteForm, value: string, index?: number) => void;
  onPressAddRow: () => void;
  onPressSubtractRow: (index: number) => void;
  onPressSubmit: () => void;
};

export const BakeryManualWriteComponent = ({
  form,
  onChange,
  onPressAddRow,
  onPressSubtractRow,
  onPressSubmit,
}: Props) => {
  const insets = useSafeAreaInsets();
  const isFormValid = form.bakeryName.trim().length > 0;

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.flex}>
          <Header title="빵집 직접 입력" isPrevButtonShown />

          <SplitRow height={24} />

          <View style={styles.container}>
            <Text color={theme.color.black} presets={['heading2', 'bold']}>
              찾으시는 빵집이 없군요😢{'\n'}
              추가하고 싶은 빵집을 알려주세요
            </Text>

            <SplitRow height={32} />

            <SubTitle isRequire>빵집명</SubTitle>

            <SplitRow height={8} />

            <TextInput
              style={styles.input}
              placeholder="빵집을 입력해주세요"
              placeholderTextColor={theme.color.gray500}
              value={form.bakeryName}
              maxLength={20}
              onChangeText={text => onChange('bakeryName', text)}
            />

            <SplitRow height={24} />

            <SubTitle>위치 (선택)</SubTitle>

            <SplitRow height={8} />

            <TextInput
              style={styles.input}
              placeholder="서울시 강남구 역삼동"
              placeholderTextColor={theme.color.gray500}
              value={form.bakeryAddress}
              maxLength={100}
              onChangeText={text => onChange('bakeryAddress', text)}
            />

            <SplitRow height={24} />

            <SubTitle>빵 이름 (선택)</SubTitle>

            <SplitRow height={8} />

            {form.menuNames.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {index === 0 ? (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="먹은 빵의 이름을 알려주세요"
                        placeholderTextColor={theme.color.gray500}
                        value={item}
                        maxLength={100}
                        onChangeText={text => onChange('menuNames', text, index)}
                      />
                    </>
                  ) : (
                    <>
                      <Row style={styles.additionalRow}>
                        <TouchableOpacity onPress={() => onPressSubtractRow(index)}>
                          <MinusButton />
                        </TouchableOpacity>

                        <SplitColumn width={8} />

                        <Flex>
                          <TextInput
                            style={styles.input}
                            placeholder="먹은 빵의 이름을 알려주세요"
                            placeholderTextColor={theme.color.gray500}
                            value={item}
                            maxLength={100}
                            onChangeText={text => onChange('menuNames', text, index)}
                          />
                        </Flex>
                      </Row>
                    </>
                  )}

                  <SplitRow height={8} />
                </React.Fragment>
              );
            })}

            <SplitRow height={15} />

            <AddButton buttonText="먹은 빵이 더 있나요?" onPress={onPressAddRow} />

            <SplitRow height={32} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button
        style={styles.confirmButton}
        appearance={isFormValid ? 'primary' : 'quaternary'}
        disabled={!isFormValid}
        onPress={onPressSubmit}
      >
        이 빵집으로 계속
      </Button>

      {insets.bottom === 0 && <SplitRow height={16} />}
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
  input: {
    backgroundColor: theme.color.gray50,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.gray200,
    color: '#222222',
    ...presets.body2,
    ...presets.medium,
  },
  additionalRow: {
    alignItems: 'center',
  },
  confirmButton: {
    paddingHorizontal: 20,
  },
});
