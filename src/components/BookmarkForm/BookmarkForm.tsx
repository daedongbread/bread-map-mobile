import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorInput } from '@/components/BookmarkForm/ColorInput';
import { flagColors } from '@/containers/Bookmark';
import { theme } from '@/styles/theme';
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
        <Label style={[styles.paddingLeft, styles.labelText]} defaultContainerStyleEnabeld={false} isRequire>
          리스트명
        </Label>
        <TextInput
          style={styles.nameInput}
          label={'name'}
          value={name}
          onChange={handleChange}
          placeholder={'새 리스트명을 입력해주세요'}
          placeholderTextColor={theme.color.gray500}
          hint={`${name.length}자 / 최대 10자`}
          maxLength={10}
          autoCorrect={false}
        />
      </View>
      <View style={styles.paddingLeft}>
        <Label isRequire style={styles.labelText}>
          색상선택
        </Label>
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
    marginVertical: 20,
  },
  paddingLeft: {
    paddingLeft: 20,
  },
  nameInputContainer: {
    marginBottom: 32,
  },
  nameInput: {
    backgroundColor: theme.color.gray50,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: theme.color.gray900,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorInput: {
    marginRight: 14,
    marginBottom: 8,
  },
  labelText: {
    color: theme.color.gray800,
  },
});
