import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CopyButton } from '@/components/Shared/Button/CopyButton';
import { SplitColumn } from '@/components/Shared/SplitSpace';
import { Text } from '@/components/Shared/Text';
import { TextPresets } from '@/components/Shared/Text/presets';
import { showToast } from '@/slices/toast';
import { theme } from '@/styles/theme';
import { resizePixels } from '@/utils';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
  isCopyable?: boolean;
  isUnderLine?: boolean;
  presets?: TextPresets | Array<TextPresets>;
  onPressText?: () => void;
  splitColumn?: number;
};

const { width } = Dimensions.get('screen');

export const RowInfo: React.FC<Props> = ({
  icon,
  text,
  textColor,
  presets,
  isCopyable = false,
  isUnderLine = false,
  onPressText,
  splitColumn,
}) => {
  const dispatch = useDispatch();
  const onPress = () => {
    Clipboard.setString(text);
    dispatch(showToast({ text: '복사가 완료되었습니다' }));
  };

  return (
    <TouchableOpacity disabled={!onPressText} onPress={onPressText} style={[styles.row]}>
      <View>{icon}</View>
      <SplitColumn width={splitColumn ?? 12} />
      <View style={[styles.textWrapper, isUnderLine && styles.underLine]}>
        <Text color={textColor ?? theme.color.gray500} presets={presets ?? ['body2', 'medium']} style={[styles.text]}>
          {text.trim()}
        </Text>
      </View>

      <SplitColumn width={splitColumn ?? 12} />
      {isCopyable && <CopyButton onPress={onPress} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
  resizePixels({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    textWrapper: {},
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
