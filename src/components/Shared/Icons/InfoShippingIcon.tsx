import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { InfoIconProps } from './InfoDeliveryIcon';

const InfoShippingIcon: React.FC<SvgProps & InfoIconProps> = props => (
  <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.5 16H9V35C9 37.2091 10.7909 39 13 39H35C37.2091 39 39 37.2091 39 35V16H29.5V24.9131C29.5 26.1665 28.1409 26.948 27.0576 26.3175L24 24.538L20.9424 26.3175C19.8591 26.9481 18.5 26.1665 18.5 24.9131V16ZM27.5 16H20.5V24.261L23.1826 22.6997C23.6879 22.4056 24.3121 22.4056 24.8174 22.6997L27.5 24.261V16Z"
      fill={props.strokeColor === 'orange' ? '#FF6E40' : '#BDBDBD'}
    />
    <Path
      d="M12.0078 9.90468C12.3773 9.34017 13.0066 9 13.6812 9H34.3188C34.9934 9 35.6227 9.34017 35.9922 9.90468L39 14.5H9L12.0078 9.90468Z"
      fill={props.strokeColor === 'orange' ? '#FF6E40' : '#BDBDBD'}
    />
  </Svg>
);

export { InfoShippingIcon };
