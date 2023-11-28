import React, { useState } from 'react';
import { theme } from '@/styles/theme';
import { TextPresets } from './presets';
import { Text } from './Text';

type Props = {
  color?: string;
  presets?: TextPresets | Array<TextPresets>;
  text: string;
  linesToTruncate: number;
};

export const MoreLineText = ({ color, presets, text, linesToTruncate }: Props) => {
  const [clippedText, setClippedText] = useState('');
  const [lineLength, setLineLength] = useState(0);

  return clippedText && lineLength > linesToTruncate ? (
    <Text color={color} presets={presets}>
      {`${clippedText}`}
      <Text color={theme.color.gray500}>{' ...더 보기'}</Text>
    </Text>
  ) : (
    <Text
      color={color}
      presets={presets}
      onTextLayout={event => {
        const { lines } = event.nativeEvent;
        setLineLength(lines.length);
        const lineText = lines
          .splice(0, linesToTruncate)
          .map(line => line.text)
          .join('');

        setClippedText(lineText.substring(0, lineText.length - 7));
      }}
    >
      {text}
    </Text>
  );
};
