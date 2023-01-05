import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { Button } from '../Shared/Button/Button';
import { Label } from '../Shared/Label';
import { SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';
import { TextInput } from '../Shared/TextInput';
import { CancelBottomSheet } from './CancelBottomSheet';
import { EditDoneBottomSheet } from './EditDoneBottomSheet';
import { Header } from './Header';

type Props = {
  name: string;
  location: string;
  edit: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
};

export function EditDetailComponent({ name, location, edit, onChange }: Props) {
  const editDoneBottomSheetRef = useRef<BottomSheet>(null);
  const cancelBottomSheetRef = useRef<BottomSheet>(null);

  const handleChange = useCallback(
    ({ label, value }: { label: string; value: string }) => {
      onChange({ name: label, value });
    },
    [onChange]
  );
  const onClickRight = () => {
    cancelBottomSheetRef.current?.expand();
  };

  const onConfirmClick = () => {
    editDoneBottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Header onClickLeft onClickRight={onClickRight} />
        <SplitRow height={12} />
        <View style={styles.TitleWrap}>
          <Text presets={['subtitle1', 'bold']} style={styles.Text}>
            <Text style={styles.Primary}>어떤 정보</Text>를
          </Text>
          <Text presets={['subtitle1', 'bold']} style={styles.Text}>
            수정 요청 하시나요?
          </Text>
        </View>
        <SplitRow height={40} />
        <View style={styles.Label}>
          <Label isRequire>빵집이름</Label>
        </View>
        <TextInput
          label={'name'}
          value={name}
          onChange={handleChange}
          placeholder={'빵집 이름을 입력해주세요'}
          isAlert
          error={'빵집 이름을 입력해주세요'}
          // maxLength={10}
          autoCorrect={false}
          style={styles.TextInput}
        />
        <SplitRow height={18} />
        <View style={styles.Label}>
          <Label isRequire>위치</Label>
        </View>
        <TextInput
          label={'location'}
          value={location}
          onChange={handleChange}
          placeholder={'예시) 서울시 강남구 역삼동'}
          isAlert
          error={'위치를 입력해주세요'}
          // maxLength={10}
          autoCorrect={false}
          style={styles.TextInput}
        />
        <SplitRow height={18} />
        <View style={styles.Label}>
          <Label>수정 사항</Label>
        </View>
        <TextInput
          label={'edit'}
          value={edit}
          onChange={handleChange}
          placeholder={'이 빵집의 어떤 정보를 수정할까요?!'}
          // maxLength={10}
          autoCorrect={false}
          style={[styles.TextInput, styles.MultiText]}
          multiline
        />
        <SplitRow height={38} />
        <Button onPress={onConfirmClick} style={styles.Button}>
          확인
        </Button>
        <SplitRow height={18} />
      </ScrollView>
      <EditDoneBottomSheet bottomSheetRef={editDoneBottomSheetRef} title="수정" />
      <CancelBottomSheet bottomSheetRef={cancelBottomSheetRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    SafeAreaView: {
      flex: 1,
    },
    TitleWrap: {
      height: 64,
      marginLeft: 20,
    },
    Text: {
      color: 'black',
    },
    Primary: {
      color: theme.color.primary500,
    },
    Label: {
      marginLeft: 20,
    },
    TextInput: {
      width: '100%',
      height: 48,
      borderRadius: 8,
      backgroundColor: theme.color.gray100,
      paddingHorizontal: 16,
      fontSize: 14,
      color: theme.color.gray800,
    },
    MultiText: {
      height: 202,
      textAlignVertical: 'top',
    },
    Button: {
      marginHorizontal: 20,
    },
  })
);
