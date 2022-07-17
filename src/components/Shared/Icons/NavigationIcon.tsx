import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const NavigationIcon: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21 3L2 12L10 14L12 22L21 3Z"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
