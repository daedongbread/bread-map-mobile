import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AccuseForm } from '@/containers/BakeryDetail/BakeryReview/AccuseReviewContainer';
import { CustomCheckBox } from '../Shared/Chcekbox/CustomCheckBox';
import { SplitColumn, SplitRow } from '../Shared/SplitSpace';
import { Text } from '../Shared/Text';

type Props = {
  isChecked: boolean;
  reasonKey: string;
  reasonvalue: string;
  isEnd: boolean;
  onChange: (key: keyof AccuseForm, value: string) => void;
};

export const AccuesItem = ({ isChecked, reasonKey, reasonvalue, isEnd, onChange }: Props) => {
  const onValueChange = (value: boolean) => {
    let newReason = value ? reasonKey : '';

    onChange('reason', newReason);
  };

  return (
    <>
      <View style={styles.reasonContainer}>
        <CustomCheckBox strokeWidth={2} value={isChecked} onValueChange={onValueChange} />
        <SplitColumn width={6} />
        <Text presets={['body2', 'semibold']} style={styles.reasonText}>
          {reasonvalue}
        </Text>
      </View>
      {!isEnd && <SplitRow height={20} />}
    </>
  );
};

const styles = StyleSheet.create({
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonText: {
    color: '#424242',
  },
});
