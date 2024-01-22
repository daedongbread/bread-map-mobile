import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Shared/Header';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { TextInput } from '@/components/Shared/TextInput';
import { theme } from '@/styles/theme';
import { SubTitle } from '../ReviewRating';
import { AddButton } from '../ReviewSelect/AddButton';

type Props = {};

export const BakeryManualWriteComponent = ({}: Props) => {
  return (
    <SafeAreaView>
      <Header title="빵집 직접 입력" isPrevButtonShown />

      <SplitRow height={24} />

      <View style={styles.container}>
        <Text color={theme.color.black} presets={['heading2', 'bold']}>
          찾으시는 빵집이 없군요😢{'\n'}
          추가하고 싶은 빵집을 알려주세요
        </Text>

        <SplitRow height={32} />

        <SubTitle isRequire>빵집명</SubTitle>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="빵집을 입력해주세요"
            value={''}
            maxLength={20}
            // onChangeText={text => onChange('name', text)}
          />
        </View>

        <SubTitle isRequire>위치 (선택)</SubTitle>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="서울시 강남구 역삼동"
            value={''}
            maxLength={100}
            // onChangeText={text => onChange('name', text)}
          />
        </View>

        <SubTitle isRequire>빵 이름 (선택)</SubTitle>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="먹은 빵의 이름을 알려주세요"
            value={''}
            maxLength={100}
            // onChangeText={text => onChange('name', text)}
          />
        </View>

        <AddButton buttonText="먹은 빵이 더 있나요?" onPress={() => null} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
});
