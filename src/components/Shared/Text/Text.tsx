import React, { memo, useCallback } from 'react';
import { TextProps, Text as ReactNativeText } from 'react-native';
import { presets as textPresets, TextPresets } from '@shared/Text/presets';

type Props = TextProps & {
  presets?: TextPresets | Array<TextPresets>;
};

export const Text: React.FC<Props> = memo(({ presets = 'body1', style: styleOverride, ...rest }) => {
  const parsingPresets = useCallback(() => {
    if (typeof presets === 'object') {
      return presets.map(item => textPresets[item]);
    }

    return [textPresets[presets]];
  }, [presets]);

  const styles = [...parsingPresets(), styleOverride];

  return <ReactNativeText style={styles} {...rest} />;
});
