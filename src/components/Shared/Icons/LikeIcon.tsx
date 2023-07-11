import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const LikeIcon: React.FC<SvgProps> = props => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.19143 9.3347C1.38668 6.8222 2.32793 3.69845 4.96568 2.84945C6.35318 2.4017 8.06543 2.7752 9.03818 4.11695C9.95543 2.7257 11.7172 2.4047 13.1032 2.84945C15.7402 3.69845 16.6867 6.8222 15.8827 9.3347C14.6302 13.3172 10.2599 15.3917 9.03818 15.3917C7.81718 15.3917 3.48593 13.3637 2.19143 9.3347Z"
      fill="#BDBDBD"
    />
  </Svg>
);

export { LikeIcon };
