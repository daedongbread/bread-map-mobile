import React from 'react';
import { StyleSheet } from 'react-native';
import { Label } from '@/components/Shared/Label';
import { presets } from '@/components/Shared/Text/presets';
import { theme } from '@/styles/theme';

type Props = {
  isRequire?: boolean;
  children: React.ReactChild;
};

export const SubTitle = ({ isRequire, children }: Props) => (
  <Label style={[presets.body2, presets.bold, styles.title]} isRequire={isRequire} defaultContainerStyleEnabeld={false}>
    {children}
  </Label>
);

const styles = StyleSheet.create({
  title: {
    color: theme.color.gray800,
  },
});
