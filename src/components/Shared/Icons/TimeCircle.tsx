import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const TimeCircle: React.FC<SvgProps> = props => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.4293 8.99998C15.4293 12.5506 12.5513 15.4286 9.00068 15.4286C5.45003 15.4286 2.57211 12.5506 2.57211 8.99998C2.57211 5.44933 5.45003 2.57141 9.00068 2.57141C12.5513 2.57141 15.4293 5.44933 15.4293 8.99998Z"
      stroke="#9E9E9E"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M11.5721 11.5714L9.00067 9.94141V6.42853"
      stroke="#9E9E9E"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
