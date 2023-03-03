import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CopyButton } from '@/components/Shared/Button/CopyButton';
import { SplitColumn, SplitRow } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { showToast } from '@/slices/toast';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = {
  icon: React.ReactNode;
  text: string;
  isCopyable?: boolean;
};

const { width } = Dimensions.get('screen');

export const RowInfo: React.FC<Props> = ({ icon, text, isCopyable = false }) => {
  const dispatch = useDispatch();
  const onPress = () => {
    Clipboard.setString(text);
    dispatch(showToast({ text: '복사가 완료되었습니다' }));
  };

  return (
    <View style={[styles.row, !isCopyable && styles.alignCenter]}>
      <View>
        <SplitRow height={2} />
        {icon}
      </View>
      <Text color={theme.color.gray600} presets={['caption2', 'medium']} style={styles.text}>
        {text}
      </Text>
      <SplitColumn width={12} />
      {isCopyable && <CopyButton onPress={onPress} />}
    </View>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    row: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    alignCenter: {
      alignItems: 'center',
    },
    text: {
      maxWidth: width * 0.65,
      marginLeft: 8,
    },
  })
);
