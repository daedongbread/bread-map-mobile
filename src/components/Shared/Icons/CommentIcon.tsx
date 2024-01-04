import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CommentIcon: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21.5 5.5C21.5 4.94771 21.0523 4.5 20.5 4.5H12H3.5C2.94772 4.5 2.5 4.94772 2.5 5.5V16.2145C2.5 16.7611 2.93885 17.2064 3.48537 17.2144L10.7632 17.3209C10.8803 17.3226 10.9931 17.3653 11.0819 17.4417L13.8129 19.7898C14.1371 20.0686 14.6389 19.8382 14.6389 19.4107V17.7C14.6389 17.4239 14.8627 17.2 15.1389 17.2H20.5C21.0523 17.2 21.5 16.7523 21.5 16.2V5.5Z"
      stroke="#9E9E9E"
      strokeWidth={1.5}
      stroke-linejoin="round"
    />
  </Svg>
);

export { CommentIcon };
