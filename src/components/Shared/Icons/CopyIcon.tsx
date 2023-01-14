import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const CopyIcon: React.FC<SvgProps> = props => (
  <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
    <Path d="M11.8125 10.0625V2.1875H3.9375" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round" />
    <Path
      d="M10.0625 3.9375H2.1875V11.8125H10.0625V3.9375Z"
      stroke="#BDBDBD"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
