import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const LocationMarker: React.FC<SvgProps> = props => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
    <Path
      d="M6 11.5C6 11.5 10.5 8.5 10.5 5C10.5 3.80653 10.0259 2.66193 9.18198 1.81802C8.33807 0.974106 7.19347 0.5 6 0.5C4.80653 0.5 3.66193 0.974106 2.81802 1.81802C1.97411 2.66193 1.5 3.80653 1.5 5C1.5 8.5 6 11.5 6 11.5Z"
      stroke="#424242"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z"
      stroke="#424242"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export { LocationMarker };
