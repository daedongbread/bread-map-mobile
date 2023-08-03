import React, { ComponentProps, FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Call: FC<ComponentProps<typeof Svg>> = props => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.65497 9.34807C11.5943 12.2866 12.2611 8.88705 14.1326 10.7572C15.9368 12.561 16.9738 12.9224 14.6879 15.2077C14.4015 15.4378 12.5822 18.2063 6.18865 11.8145C-0.205721 5.42189 2.56117 3.60075 2.79135 3.31449C5.08285 1.02283 5.438 2.06586 7.24226 3.86961C9.11374 5.74058 5.71564 6.40957 8.65497 9.34807Z"
      stroke="#9E9E9E"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
