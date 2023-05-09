import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const TopArrow: React.FC<SvgProps> = props => (
  <Svg width="8" height="8" viewBox="0 0 8 8" fill="none" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.646447 5.35355C0.451184 5.15829 0.451184 4.84171 0.646447 4.64645L3.64645 1.64645C3.84171 1.45118 4.15829 1.45118 4.35355 1.64645L7.35355 4.64645C7.54882 4.84171 7.54882 5.15829 7.35355 5.35355C7.15829 5.54882 6.84171 5.54882 6.64645 5.35355L4 2.70711L1.35355 5.35355C1.15829 5.54882 0.841709 5.54882 0.646447 5.35355Z"
      fill="#757575"
    />
  </Svg>
);
