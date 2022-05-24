import React, { memo } from 'react';
import { Button, StyleSheet, View } from 'react-native';

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
        <Button title={'취소하기'} onPress={onClose} />
      </View>
      <View style={styles.button}>
        <Button title={'선택완료'} onPress={onSave} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create(
  resizePixels({
    container: {
      flexDirection: 'row',
    },
    button: {
      flex: 1,
    },
  })
);
