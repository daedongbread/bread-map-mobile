import React, { ComponentProps, FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const ChevronLeftIcon: FC<ComponentProps<typeof Svg>> = props => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path d="M10 12L6 8L10 4" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
