import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const NavNotification: React.FC<SvgProps> = props => (
  <Svg width="48" height="52" viewBox="0 0 48 52" fill="none" {...props}>
    <Path
      d="M24.721 19.003L23.255 19C19.911 18.992 17.008 21.709 16.985 25V28.79C16.985 29.58 16.885 30.351 16.454 31.008L16.167 31.446C15.73 32.11 16.2 33 16.985 33H31.015C31.8 33 32.269 32.11 31.833 31.446L31.546 31.008C31.116 30.351 31.015 29.579 31.015 28.789V25.001C30.975 21.709 28.065 19.011 24.721 19.003V19.003Z"
      stroke="#222222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27 33C27 33.7956 26.6839 34.5587 26.1213 35.1213C25.5587 35.6839 24.7956 36 24 36C23.2044 36 22.4413 35.6839 21.8787 35.1213C21.3161 34.5587 21 33.7956 21 33"
      stroke="#222222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24 16C24.5304 16 25.0391 16.2107 25.4142 16.5858C25.7893 16.9609 26 17.4696 26 18V19H22V18C22 17.4696 22.2107 16.9609 22.5858 16.5858C22.9609 16.2107 23.4696 16 24 16Z"
      stroke="#222222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export { NavNotification };