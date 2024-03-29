import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CopyButton } from '@/components/Shared/Button/CopyButton';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { showToast } from '@/slices/toast';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = {
  icon: React.ReactNode;
  text: string;
  isCopyable?: boolean;
  isUnderLine?: boolean;
  onPressText?: () => void;
};

const { width } = Dimensions.get('screen');

export const RowInfo: React.FC<Props> = ({ icon, text, isCopyable = false, isUnderLine = false, onPressText }) => {
  const dispatch = useDispatch();
  const onPress = () => {
    Clipboard.setString(text);
    dispatch(showToast({ text: '복사가 완료되었습니다' }));
  };

  return (
    <TouchableOpacity disabled={!onPressText} onPress={onPressText} style={[styles.row]}>
      <View>{icon}</View>
      <View style={[styles.textWrapper, isUnderLine && styles.underLine]}>
        <Text color={theme.color.gray600} presets={['caption2', 'medium']} style={[styles.text]}>
          {text.trim()}
        </Text>
      </View>

      <SplitColumn width={12} />

      {isCopyable && <CopyButton onPress={onPress} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    row: {
      flexDirection: 'row',
      marginBottom: 6,
      alignItems: 'flex-start',
    },
    textWrapper: {
      marginLeft: 8,
    },
    text: {
      alignSelf: 'center',
      maxWidth: width * 0.65,
    },
    underLine: {
      borderBottomWidth: 1,
      borderBottomColor: theme.color.gray600,
    },
  })
);
