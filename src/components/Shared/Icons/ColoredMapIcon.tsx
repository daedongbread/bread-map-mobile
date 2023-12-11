import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ColoredMapIcon: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.3 17.4L3 21V6.6L9.3 3M9.3 17.4L15.6 21M9.3 17.4V3M15.6 21L21 17.4V3L15.6 6.6M15.6 21V6.6M15.6 6.6L9.3 3"
      stroke="#F76131"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
