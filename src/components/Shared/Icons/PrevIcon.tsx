import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

type PrevIconProps = {
  fillColor?: string;
};

export const PrevIcon: React.FC<SvgProps & PrevIconProps> = props => (
  <Svg width="10" height="18" viewBox="0 0 10 18" fill="none" {...props}>
    <Path
      d="M8.675 17.475C8.375 17.475 8.075 17.375 7.875 17.075L0.375 9.575C-0.125 9.075 -0.125 8.375 0.375 7.875L7.875 0.375C8.375 -0.125 9.075 -0.125 9.575 0.375C10.075 0.875 10.075 1.575 9.575 2.075L2.775 8.775L9.475 15.475C9.975 15.975 9.975 16.675 9.475 17.175C9.275 17.375 8.975 17.475 8.675 17.475V17.475Z"
      fill={props.fillColor ?? '#222222'}
    />
  </Svg>
);
