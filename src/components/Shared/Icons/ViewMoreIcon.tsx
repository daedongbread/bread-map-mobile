import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const ViewMoreIcon: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx="6.49805" cy="11.998" r="1.5" transform="rotate(-90 6.49805 11.998)" fill="#BDBDBD" />
    <Circle cx="11.998" cy="11.998" r="1.5" transform="rotate(-90 11.998 11.998)" fill="#BDBDBD" />
    <Path
      d="M17.498 10.498C18.3265 10.498 18.998 11.1696 18.998 11.998C18.998 12.8265 18.3265 13.498 17.498 13.498C16.6696 13.498 15.998 12.8265 15.998 11.998C15.998 11.1696 16.6696 10.498 17.498 10.498Z"
      fill="#BDBDBD"
    />
  </Svg>
);
