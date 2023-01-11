import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, TextInput as OriginTextInput, TextInputProps, View } from 'react-native';
import { theme } from '@/styles/theme';
import { XCircle } from '@shared/Icons/XCircle';
import { Text } from '@shared/Text';
import { AlertIcon } from '../Icons/AlertIcon';

type Props = Omit<TextInputProps, 'value' | 'onChange'> & {
  value: string;
  label?: string;
  onChange?: ({ label, value }: { label: string; value: string }) => void;
  hint?: string;
  error?: string;
  backgroundColor?: string;
  isAlert?: boolean;
};

export const TextInput: React.FC<Props> = ({
  onChangeText,
  onChange,
  label = '',
  error,
  hint,
  backgroundColor,
  isAlert,
  ...props
}) => {
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

  const inputContainerStyle = useMemo(() => {
    const override = {
      backgroundColor,
    };

    return [styles.inputContainer, override];
  }, [backgroundColor]);

  return (
    <View style={styles.container}>
      <View style={inputContainerStyle}>
        <View style={styles.input}>
          <OriginTextInput placeholderTextColor={theme.color.gray500} onChangeText={handleChangeText} {...props} />
          {value.length && !multiline ? (
            <Pressable style={styles.closeButton} onPress={onClear}>
              <XCircle />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.hintContainer}>
          <View style={styles.errorContainer}>
            {!!error && isAlert && (
              <>
                <AlertIcon />
                <Text> </Text>
              </>
            )}
            {!!error && (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: theme.color.gray100,
  },
  input: {
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
  },
  hintContainer: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: theme.color.red,
    fontSize: 12,
  },
  hintText: {
    color: theme.color.gray500,
    fontSize: 12,
  },
});
