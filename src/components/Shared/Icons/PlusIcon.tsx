import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const PlusIcon: React.FC<SvgProps> = React.memo(props => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M13.9996 7.99976H1.99963"
      stroke="#757575"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.99963 1.99976V13.9998"
      stroke="#757575"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));
