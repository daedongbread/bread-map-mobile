import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const IcLikeHeart: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M2.0001 9.08997C1.9918 10.574 2.5 12 4 13.5L8 17L11.3571 19.5467C11.7113 19.8153 12.2002 19.818 12.5572 19.5532L16 17L20 13.5C21.5 12 22.0082 10.574 21.9999 9.08997C21.9916 7.67809 21.4358 6.38654 20.4239 5.45598C17.7842 3.03035 14.4001 3.90135 12.0453 6.12181C9.69041 3.90135 6.21576 3.03035 3.57614 5.45598C2.56416 6.38654 2.00839 7.67809 2.0001 9.08997Z"
      fill={props.fill ? props.fill : '#F3213B'}
    />
  </Svg>
);

export { IcLikeHeart };
