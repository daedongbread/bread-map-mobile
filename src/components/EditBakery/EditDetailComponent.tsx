import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  onConfirmClick: () => void;
  editDoneBottomSheetRef: any;
  errorState: {
    name: boolean;
    location: boolean;
    edit: boolean;
  };
  bakeryId: number;
  NavigationKey: string;
};

export function EditDetailComponent({
  name,
  location,
  edit,
  onChange,
  onConfirmClick,
  editDoneBottomSheetRef,
  errorState,
  bakeryId,
  NavigationKey,
}: Props) {
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

  const onClickButton = () => {
    onConfirmClick();
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={40}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Header onClickLeft onClickRight={onClickRight} />
        <SplitRow height={12} />
        <View style={styles.TitleWrap}>
          <Text presets={['subTitle1', 'bold']} style={styles.Text}>
            <Text style={styles.Primary}>어떤 정보</Text>를
          </Text>
          <Text presets={['subTitle1', 'bold']} style={styles.Text}>
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
          error={errorState.name ? '빵집 이름을 입력해주세요' : ''}
          maxLength={20}
          autoCorrect={false}
          style={[styles.TextInput, { borderColor: errorState.name ? theme.color.red : theme.color.gray200 }]}
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
          error={errorState.location ? '위치를 입력해주세요' : ''}
          maxLength={100}
          autoCorrect={false}
          style={[styles.TextInput, { borderColor: errorState.location ? theme.color.red : theme.color.gray200 }]}
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
          error={errorState.edit ? '수정사항을 입력해주세요' : ''}
          isAlert
          maxLength={500}
          autoCorrect={false}
          style={[
            styles.TextInput,
            styles.MultiText,
            { borderColor: errorState.edit ? theme.color.red : theme.color.gray200 },
          ]}
          multiline
        />
        <SplitRow height={38} />
        <Button onPress={onClickButton} style={styles.Button}>
          확인
        </Button>
        <SplitRow height={18} />
      </KeyboardAwareScrollView>
      <EditDoneBottomSheet
        bottomSheetRef={editDoneBottomSheetRef}
        title="수정"
        bakeryId={bakeryId}
        NavigationKey={NavigationKey}
      />
      <CancelBottomSheet bottomSheetRef={cancelBottomSheetRef} />
    </KeyboardAvoidingView>
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
      marginBottom: -12,
    },
    TextInput: {
      height: 48,
      borderRadius: 8,
      backgroundColor: theme.color.gray50,
      paddingHorizontal: 16,
      fontSize: 14,
      color: theme.color.gray800,
      marginLeft: 6,
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
