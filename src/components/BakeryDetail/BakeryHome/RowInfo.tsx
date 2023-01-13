import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CopyButton } from '@/components/Shared/Button/CopyButton';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { showToast } from '@/slices/toast';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = {
  icon: React.ReactNode;
  text: string;
  isCopyable?: boolean;
};

export const RowInfo: React.FC<Props> = ({ icon, text, isCopyable = false }) => {
  const dispatch = useDispatch();

  const onPress = () => {
    Clipboard.setString(text);
    dispatch(showToast({ text: '복사가 완료되었습니다' }));
  };

  return (
    <>
      <View style={styles.row}>
        {icon}
        <Text style={styles.text}>{text}</Text>
        <SplitColumn width={10} />
        {isCopyable && <CopyButton onPress={onPress} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    row: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    text: {
      marginLeft: 8,
      color: theme.color.gray600,
      fontSize: 12,
    },
  })
);
