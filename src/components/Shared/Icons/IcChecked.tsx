import React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

const IcChecked: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Rect x="2" y="2.00049" width="20" height="20" rx="10" fill="#FF6E40" />
    <Path
      d="M15.8889 9.22277L10.3334 14.7783L8.11114 12.5561"
      stroke="white"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export { IcChecked };
