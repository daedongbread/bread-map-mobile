import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/Shared/Button/Button';

import { resizePixels } from '@/utils';

type Props = {
  onClose: () => void;
  onSave: () => void;
};

//TODO: Button Component 수정
export const Footer: React.FC<Props> = memo(({ onClose, onSave }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button appearance={'terdary'} onPress={onClose}>
          취소하기
        </Button>
      </View>
      <View style={styles.gap} />
      <View style={styles.button}>
        <Button onPress={onSave}>선택완료</Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create(
  resizePixels({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: 'row',
    },
    gap: {
      width: 8,
    },
    button: {
      flex: 1,
    },
  })
);
