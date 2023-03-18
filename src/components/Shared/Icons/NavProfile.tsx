import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const NavProfile: React.FC<SvgProps> = props => (
  <Svg width="48" height="52" viewBox="0 0 48 52" fill="none" {...props}>
    <Path
      d="M32 35V33C32 31.9391 31.5786 30.9217 30.8284 30.1716C30.0783 29.4214 29.0609 29 28 29H20C18.9391 29 17.9217 29.4214 17.1716 30.1716C16.4214 30.9217 16 31.9391 16 33V35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24 25C26.2091 25 28 23.2091 28 21C28 18.7909 26.2091 17 24 17C21.7909 17 20 18.7909 20 21C20 23.2091 21.7909 25 24 25Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export { NavProfile };
