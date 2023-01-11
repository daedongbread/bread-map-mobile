import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorInput } from '@/components/BookmarkForm/ColorInput';
import { flagColors } from '@/containers/Bookmark';
import { Label } from '@shared/Label';
import { TextInput } from '@shared/TextInput';

type Props = {
  name: string;
  color?: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
};

export const BookmarkForm: React.FC<Props> = ({ name, color, onChange }) => {
  const handleChange = useCallback(
    ({ label, value }: { label: string; value: string }) => {
      onChange({ name: label, value });
    },
    [onChange]
  );

  return (
    <View style={styles.container}>
      <View style={styles.nameInputContainer}>
        <Label isRequire>리스트명</Label>
        <TextInput
          label={'name'}
          value={name}
          onChange={handleChange}
          placeholder={'새 리스트명을 입력해주세요'}
          hint={`${name.length}자 / 최대 10자`}
          maxLength={10}
          autoCorrect={false}
        />
      </View>
      <View>
        <Label isRequire>색상선택</Label>
        <View style={styles.colorsContainer}>
          {flagColors.map(item => (
            <ColorInput
              key={item}
              color={item}
              onChange={handleChange}
              isSelected={item === color}
              style={styles.colorInput}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  nameInputContainer: {
    marginBottom: 32,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorInput: {
    marginRight: 16,
    marginBottom: 8,
  },
});
