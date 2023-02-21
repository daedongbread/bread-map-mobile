import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';

type Props = {
  flagData: any;
  buttonType: number;
  setButtonType: Dispatch<SetStateAction<number>>;
};

export function ListButtonWrap({ flagData, buttonType, setButtonType }: Props) {
  const onButtonClick = (index: number) => {
    setButtonType(index);
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        onPress={() => onButtonClick(0)}
        style={[styles.Button, buttonType === 0 && styles.ButtonBottomColor]}
      >
        <Text style={styles.ListText} presets={['bold', 'body2']}>
          저장목록
        </Text>
        <SplitColumn width={5} />
        <Text presets={['bold', 'body2']} style={{ color: theme.color.primary500 }}>
          {flagData?.length}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onButtonClick(1)}
        style={[styles.Button, buttonType === 1 && styles.ButtonBottomColor]}
      >
        <Text style={styles.ListText} presets={['bold', 'body2']}>
          리뷰
        </Text>
        <SplitColumn width={5} />
        <Text presets={['bold', 'body2']} style={{ color: theme.color.primary500 }}>
          {0}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(
  resizePixels({
    Container: {
      height: 48,
      borderBottomWidth: 1,
      borderBottomColor: theme.color.gray200,
      paddingHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
    },
    Button: {
      width: 160,
      height: 48,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ButtonBottomColor: {
      borderBottomWidth: 2,
      borderBottomColor: theme.color.primary500,
    },
    ListText: {
      color: theme.color.gray900,
    },
  })
);
