import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const EditIcon: React.FC<SvgProps> = props => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.777 6.068a3.645 3.645 0 1 1 5.155 5.155l-1.348 1.348a1.222 1.222 0 0 1-1.729 0L19.43 9.145a1.222 1.222 0 0 1 0-1.729l1.348-1.348ZM17.7 10.873a1.222 1.222 0 0 0-1.728 0l-8.514 8.514a6.11 6.11 0 0 0-1.608 2.84l-.813 3.254a1.222 1.222 0 0 0 1.482 1.482l3.255-.813a6.112 6.112 0 0 0 2.839-1.608l8.514-8.514a1.222 1.222 0 0 0 0-1.728L17.7 10.873ZM16 25.778c0-.675.547-1.222 1.222-1.222h8.556a1.222 1.222 0 0 1 0 2.444h-8.556A1.222 1.222 0 0 1 16 25.778Z"
      fill="#757575"
    />
  </Svg>
);
