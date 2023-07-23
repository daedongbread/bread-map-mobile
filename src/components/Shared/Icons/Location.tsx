import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const Location: React.FC<SvgProps> = props => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.875 7.87538C10.875 6.83943 10.0356 6 9.00038 6C7.96443 6 7.125 6.83943 7.125 7.87538C7.125 8.91057 7.96443 9.75 9.00038 9.75C10.0356 9.75 10.875 8.91057 10.875 7.87538Z"
      stroke="#9E9E9E"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.99963 15.75C8.10078 15.75 3.375 11.9238 3.375 7.92247C3.375 4.78998 5.89283 2.25 8.99963 2.25C12.1064 2.25 14.625 4.78998 14.625 7.92247C14.625 11.9238 9.89849 15.75 8.99963 15.75Z"
      stroke="#9E9E9E"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
