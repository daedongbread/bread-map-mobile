import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const NavReport: React.FC<SvgProps> = props => (
  <Svg width="48" height="52" viewBox="0 0 48 52" fill="none" {...props}>
    <Path
      d="M23 18H16C15.4696 18 14.9609 18.2107 14.5858 18.5858C14.2107 18.9609 14 19.4696 14 20V34C14 34.5304 14.2107 35.0391 14.5858 35.4142C14.9609 35.7893 15.4696 36 16 36H30C30.5304 36 31.0391 35.7893 31.4142 35.4142C31.7893 35.0391 32 34.5304 32 34V27"
      stroke="#222222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M32 16C31.4374 16 30.8978 16.2235 30.5 16.6213L21 26.1213L20 30.1213L24 29.1213L33.5 19.6213C33.8978 19.2235 34.1213 18.6839 34.1213 18.1213C34.1213 17.5587 33.8978 17.0191 33.5 16.6213C33.1022 16.2235 32.5626 16 32 16Z"
      stroke="#222222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export { NavReport };
