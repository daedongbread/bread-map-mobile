import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import styled from '@emotion/native';
import { Label } from '../Label';
import { TextInput, TextInputPropsType } from './TextInput';

type TextInputWithLabelPropsType = TextInputPropsType & {
  label: string;
  isRequire: boolean;
};

export const TextInputWithLabel = ({ label, isRequire, ...inputProps }: TextInputWithLabelPropsType) => {
  return (
    <Base>
      <LabelWrapper>
        <Label style={styles.label} isRequire={isRequire}>
          {label}
        </Label>
      </LabelWrapper>
      <TextInput label={label} {...inputProps} style={styles.input} />
    </Base>
  );
};
const styles = StyleSheet.create(
  resizePixels({
    label: {
      marginBottom: 0,
    },
    input: {
      height: 48,
      borderRadius: 8,
      backgroundColor: theme.color.gray100,
      paddingHorizontal: 16,
      fontSize: 14,
      color: theme.color.gray800,
      borderWidth: 1,
      borderColor: theme.color.gray300,
    },
  })
);

const Base = styled.View`
  width: 100%;
  margin-top: 18px;
`;

const LabelWrapper = styled.View`
  margin-left: 20px;
`;
