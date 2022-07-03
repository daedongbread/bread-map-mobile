import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const NavHome: React.FC<SvgProps> = props => (
  <Svg width="48" height="52" viewBox="0 0 48 52" fill="none" {...props}>
    <Path
      d="M24 16L15 23V34C15 34.5304 15.2107 35.0391 15.5858 35.4142C15.9609 35.7893 16.4696 36 17 36H31C31.5304 36 32.0391 35.7893 32.4142 35.4142C32.7893 35.0391 33 34.5304 33 34V23L24 16Z"
      stroke="#FF6E40"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M21 36V26H27V36" stroke="#FF6E40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);

export { NavHome };
