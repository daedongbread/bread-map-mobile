import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CloseIcon: React.FC<SvgProps> = props => (
  <Svg width={24} height={24} strokeWidth={1.5} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M19.5 4.5L4.5 19.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M4.5 4.5L19.5 19.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);

export { CloseIcon };
