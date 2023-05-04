import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const IcUnchecked: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M15.8889 9.22228L10.3334 14.7778L8.11114 12.5556M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
      stroke="#BDBDBD"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export { IcUnchecked };
