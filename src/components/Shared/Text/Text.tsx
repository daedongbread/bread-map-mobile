import React, { memo, useCallback } from 'react';
import { TextProps, Text as ReactNativeText, StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';
import { presets as textPresets, TextPresets } from '@shared/Text/presets';

type Props = TextProps & {
  presets?: TextPresets | Array<TextPresets>;
  color?: string | keyof typeof theme['color'];
};

export const Text: React.FC<Props> = memo(({ presets, style: styleOverride, color, ...rest }) => {
  const parsingPresets = useCallback(() => {
    if (!presets) {
      return [{}];
    }

    if (typeof presets === 'object') {
      return presets.map(item => textPresets[item]);
    }

    return [textPresets[presets]];
  }, [presets]);

  const styles = StyleSheet.create({
    color: {
      color: color && color in theme.color ? theme.color[color as keyof typeof theme.color] : color,
    },
  });

  const style = [...parsingPresets(), styles.color, styleOverride];

  return <ReactNativeText style={style} {...rest} />;
});
