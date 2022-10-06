import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const PrevIcon: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 12 21" fill="none" {...props}>
    <Path
      d="M10.5 19.5L1.5 10.5L10.5 1.5"
      stroke="#222222"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
