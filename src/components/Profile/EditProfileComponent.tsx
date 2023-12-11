import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { TextInput } from '@/components/Shared/TextInput';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { Button } from '../Shared/Button/Button';
import { Loading } from '../Shared/Loading';
import { Text } from '../Shared/Text';
import { EditProfileImage } from './EditProfileImage';
import { Header } from './Header';

type Props = {
  name: string;
  isSaving: boolean;
  isSavable: boolean;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  onCameraClick: () => void;
  curImage: string;
  onConfirmClick: () => void;
  errorMsg: string;
};

export function EditProfileComponent({
  name,
  isSaving,
  isSavable,
  onChange,
  onCameraClick,
  curImage,
  onConfirmClick,
  errorMsg,
}: Props) {
  const insets = useSafeAreaInsets();
  const handleChange = useCallback(
    ({ label, value }: { label: string; value: string }) => {
      onChange({ name: label, value });
    },
    [onChange]
  );

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Header type="DETAIL" title="프로필 수정" isMe={false} name="" />
      <SplitRow height={20} />

      <View style={styles.mainContainer}>
        <View style={styles.Container}>
          <EditProfileImage onCameraClick={onCameraClick} curImage={curImage} />
          <SplitRow height={40} />
          <Text style={styles.Title} presets={['body2', 'bold']}>
            닉네임
          </Text>
        </View>
        <TextInput
          label={'name'}
          value={name}
          onChange={handleChange}
          placeholder={'빵순이'}
          hint={`${name?.length}자 / 최대 10자`}
          isAlert
          error={errorMsg + ''}
          maxLength={10}
          autoCorrect={false}
          style={[styles.TextInput, { borderColor: errorMsg ? theme.color.red : theme.color.gray200 }]}
        />
      </View>

      <Button style={styles.Button} onPress={onConfirmClick} disabled={!isSavable}>
        {'확인'}
      </Button>

      {insets.bottom === 0 && <SplitRow height={16} />}
      {isSaving && <Loading />}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create(
  resizePixels({
    SafeAreaView: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
    },
    Container: {
      marginHorizontal: 21,
    },
    Title: {
      color: theme.color.gray800,
    },
    TextInput: {
      height: 48,
      borderRadius: 8,
      backgroundColor: theme.color.gray50,
      paddingHorizontal: 16,
      fontSize: 14,
      color: theme.color.gray800,
      borderWidth: 1,
    },
    Button: {
      marginHorizontal: 21,
    },
  })
);
