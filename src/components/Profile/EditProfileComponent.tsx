import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { TextInput } from '@/components/Shared/TextInput';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import { Button } from '../Shared/Button/Button';
import { Text } from '../Shared/Text';
import { EditProfileImage } from './EditProfileImage';
import { Header } from './Header';

type Props = {
  name: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  onCameraClick: () => void;
  curImage: string;
};

export function EditProfileComponent({ name, onChange, onCameraClick, curImage }: Props) {
  const handleChange = useCallback(
    ({ label, value }: { label: string; value: string }) => {
      onChange({ name: label, value });
    },
    [onChange]
  );
  return (
    <>
      <Header type="DETAIL" title="프로필 수정" />
      <SplitRow height={20} />
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
        hint={`${name.length}자 / 최대 10자`}
        isAlert
        error={'이미 존재하는 닉네임입니다'}
        maxLength={10}
        autoCorrect={false}
        style={styles.TextInput}
      />
      <View style={styles.Button}>
        <Button>확인</Button>
      </View>
    </>
  );
}
const styles = StyleSheet.create(
  resizePixels({
    Container: {
      marginHorizontal: 21,
    },
    Title: {
      color: theme.color.gray800,
    },
    TextInput: {
      height: 48,
      borderRadius: 8,
      backgroundColor: theme.color.gray100,
      paddingHorizontal: 16,
      fontSize: 14,
      color: theme.color.gray800,
      borderWidth: 1,
      borderColor: theme.color.gray300,
    },
    Button: {
      marginHorizontal: 21,
      marginTop: 'auto',
      marginBottom: 16,
    },
  })
);