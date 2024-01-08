import React from 'react';
import { Text } from '@/components/Shared/Text';
import { theme } from '@/styles/theme';

type Props = {
  title: string;
};

export const SubHeader = ({ title }: Props) => (
  <Text color={theme.color.gray900} presets={['subhead', 'bold']}>
    {title}
  </Text>
);
