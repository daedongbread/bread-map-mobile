import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const IcUnLikeHeart: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M2.75009 9.45372C2.74242 10.7523 3.2125 12 4.6 13.3125L8.3 16.375L11.3817 18.5863C11.7269 18.8341 12.1911 18.8366 12.539 18.5925L15.7 16.375L19.4 13.3125C20.7875 12 21.2576 10.7523 21.2499 9.45372C21.2422 8.21833 20.7282 7.08822 19.7921 6.27398C17.3504 4.15156 14.2201 4.91368 12.0419 6.85659C9.86363 4.91368 6.64958 4.15156 4.20793 6.27398C3.27184 7.08822 2.75777 8.21833 2.75009 9.45372Z"
      stroke="#9E9E9E"
      strokeWidth={1.5}
      stroke-linejoin="round"
    />
  </Svg>
);

export { IcUnLikeHeart };
