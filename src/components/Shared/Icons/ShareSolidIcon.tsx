import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ShareSolidIcon: React.FC<SvgProps> = props => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      d="M22.725 13.15a4.275 4.275 0 1 0-4.243-3.748l-7.04 3.52a4.275 4.275 0 1 0 0 6.154l7.04 3.52a4.275 4.275 0 1 0 1.276-2.55l-7.04-3.519c.043-.35.043-.704 0-1.055l7.04-3.52a4.254 4.254 0 0 0 2.967 1.198Z"
      fill="#757575"
    />
  </Svg>
);
