import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CameraIcon: React.FC<SvgProps> = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M22.4142 20.4142C22.7893 20.0391 23 19.5304 23 19V8C23 7.46957 22.7893 6.96086 22.4142 6.58579C22.0391 6.21071 21.5304 6 21 6H17L15 3H9L7 6H3C2.46957 6 1.96086 6.21071 1.58579 6.58579C1.21071 6.96086 1 7.46957 1 8V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H21C21.5304 21 22.0391 20.7893 22.4142 20.4142Z"
      stroke="#616161"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
      stroke="#616161"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export { CameraIcon };
