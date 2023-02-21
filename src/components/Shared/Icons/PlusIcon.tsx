import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const PlusIcon: React.FC<SvgProps> = React.memo(props => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M13.3902 7.99996H2.60905"
      stroke="#9E9E9E"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M7.99963 2.60938V13.3905"
      stroke="#9E9E9E"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
));
