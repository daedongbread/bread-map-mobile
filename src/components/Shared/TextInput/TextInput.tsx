import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, TextInput as OriginTextInput, TextInputProps, View } from 'react-native';
import { theme } from '@/styles/theme';
import { XCircle } from '@shared/Icons/XCircle';
import { Text } from '@shared/Text';

type Props = Omit<TextInputProps, 'value' | 'onChange'> & {
  value: string;
  label?: string;
  onChange?: ({ label, value }: { label: string; value: string }) => void;
  hint?: string;
  error?: string;
};

export const TextInput: React.FC<Props> = memo(({ onChangeText, onChange, label = '', error, hint, ...props }) => {
  const { value, multiline } = props;

  const handleChangeText = useCallback(
    (text: string) => {
      onChange?.({ label, value: text });
      onChangeText?.(text);
    },
    [label, onChange, onChangeText]
  );

  const onClear = useCallback(() => {
    handleChangeText('');
  }, [handleChangeText]);

  return (
    <View>
      <View style={styles.inputContainer}>
        <OriginTextInput placeholderTextColor={theme.color.gray500} onChangeText={handleChangeText} {...props} />
        {value.length && !multiline ? (
          <Pressable style={styles.closeButton} onPress={onClear}>
            <XCircle />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.hintContainer}>
        <View>
          {error && (
            <Text presets={['number2', 'regular']} style={styles.errorText}>
              {error}
            </Text>
          )}
        </View>
        <View>
          {hint && (
            <Text presets={['number2', 'regular']} style={styles.hintText}>
              {hint}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: theme.color.gray100,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
  },
  hintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: theme.color.red,
  },
  hintText: {
    color: theme.color.gray500,
  },
});
