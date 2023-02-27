import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput as OriginTextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from '@/styles/theme';
import { XCircle } from '@shared/Icons/XCircle';
import { Text } from '@shared/Text';
import { AlertIcon } from '../Icons/AlertIcon';
import { presets } from '../Text/presets';

export type TextInputPropsType = Omit<TextInputProps, 'value' | 'onChange'> & {
  value: string;
  label?: string;
  onChange?: ({ label, value }: { label: string; value: string }) => void;
  hint?: string;
  error?: string;
  backgroundColor?: string;
  isAlert?: boolean;
  defaultStyleEnable?: boolean;
};

export const TextInput = React.forwardRef<OriginTextInput, TextInputPropsType>(
  (
    { onChangeText, onChange, label = '', error, hint, backgroundColor, isAlert, defaultStyleEnable = true, ...props },
    ref
  ) => {
    const { value, multiline } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [borderStyle, setBorderStyle] = useState<StyleProp<ViewStyle>>();
    const textInputStyle = defaultStyleEnable ? [borderStyle, styles.inputStyle, props.style] : [props.style];

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

    const onFocus = () => {
      if (!error) {
        setBorderStyle(styles.focusInputStyle);
      }

      setIsFocused(true);
    };

    const onBlur = () => {
      if (!error) {
        setBorderStyle(styles.defaultInputStyle);
      }

      setIsFocused(false);
    };

    const inputContainerStyle = useMemo(() => {
      const override = {
        backgroundColor,
      };

      return [styles.inputContainer, override];
    }, [backgroundColor]);

    useEffect(() => {
      if (error) {
        setBorderStyle(styles.errorInputStyle);
      } else {
        setBorderStyle(isFocused ? styles.focusInputStyle : styles.defaultInputStyle);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
      <View style={styles.container}>
        <View style={inputContainerStyle}>
          <View style={styles.input}>
            <OriginTextInput
              ref={ref}
              placeholderTextColor={theme.color.gray500}
              onChangeText={handleChangeText}
              onFocus={onFocus}
              onBlur={onBlur}
              {...props}
              style={textInputStyle}
            />
            {value.length && !multiline && isFocused ? (
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
                <Text presets={['caption1', 'medium']} style={styles.errorText}>
                  {error}
                </Text>
              )}
            </View>
            <View>
              <Text presets={['caption1', 'medium']} style={styles.hintText}>
                {hint ? hint : ' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: theme.color.red,
  },
  inputContainer: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: theme.color.gray100,
  },
  input: {
    justifyContent: 'center',
  },
  inputStyle: {
    ...presets.body2,
    ...presets.medium,
  },
  defaultInputStyle: {
    borderColor: theme.color.gray200,
    borderWidth: 1,
  },
  focusInputStyle: {
    borderColor: theme.color.gray800,
    borderWidth: 1,
  },
  errorInputStyle: {
    borderColor: theme.color.red,
    borderWidth: 1,
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
  },
  hintText: {
    color: theme.color.gray500,
  },
});
