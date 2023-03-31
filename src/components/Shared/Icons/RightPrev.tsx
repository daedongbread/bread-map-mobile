import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const RightPrev: React.FC<SvgProps> = props => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path d="M6 12L10 8L6 4" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
