import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { UploadIcon } from '@/components/Shared/Icons';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { presets } from '@/components/Shared/Text/presets';
import { Row } from '@/components/Shared/View';
import { theme } from '@/styles/theme';

type Props = {};

export const Input = ({}: Props) => {
  return (
    <Row style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="댓글을 입력하세요" />
      </View>

      <SplitColumn width={10} />

      <UploadIcon style={styles.enterIcon} />
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopColor: '#EFEFEF',
    borderTopWidth: 1,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.color.gray200,
    borderRadius: 21,
  },
  input: {
    height: 42,
    ...presets.body2,
    ...presets.medium,
  },
  enterIcon: {
    width: 40,
    height: 40,
  },
});
