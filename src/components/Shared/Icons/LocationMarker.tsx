import React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

type Props = {
  fillColor: string;
  subFillColor: string;
};

const LocationMarker: React.FC<SvgProps & Props> = props => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M14.5834 7C14.5834 8.83912 13.5944 10.5055 12.279 11.8999C10.971 13.2863 9.41937 14.3185 8.47919 14.8767C8.17968 15.0545 7.82048 15.0545 7.52097 14.8767C6.58079 14.3185 5.02912 13.2863 3.72118 11.8999C2.40573 10.5055 1.41675 8.83912 1.41675 7C1.41675 3.169 4.65364 0.75 8.00008 0.75C11.3465 0.75 14.5834 3.169 14.5834 7Z"
      fill={props.fillColor}
      stroke={props.fillColor}
      stroke-width="1.5"
    />
    <Circle
      cx="8.00008"
      cy="6.99935"
      r="1.58333"
      fill={props.subFillColor}
      stroke={props.subFillColor}
      stroke-width="1.5"
    />
  </Svg>
);

export { LocationMarker };
