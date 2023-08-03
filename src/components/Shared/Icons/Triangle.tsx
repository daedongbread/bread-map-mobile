import React, { ComponentProps, FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Triangle: FC<ComponentProps<typeof Svg>> = props => (
  <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" {...props}>
    <Path
      d="M0.500183 8.86603C-0.166484 8.48113 -0.166484 7.51888 0.500182 7.13397L12.5002 0.20577C13.1668 -0.179131 14.0002 0.301994 14.0002 1.07179L14.0002 14.9282C14.0002 15.698 13.1669 16.1791 12.5002 15.7942L0.500183 8.86603Z"
      fill="#F5F5F5"
    />
  </Svg>
);
