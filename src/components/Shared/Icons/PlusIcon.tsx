import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const PlusIcon: React.FC<SvgProps> = React.memo(props => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.89957 2.60935C8.89957 2.11229 8.49663 1.70935 7.99957 1.70935C7.50251 1.70935 7.09957 2.11229 7.09957 2.60935V7.09994H2.60898C2.11193 7.09994 1.70898 7.50288 1.70898 7.99994C1.70898 8.49699 2.11193 8.89994 2.60898 8.89994H7.09957V13.3905C7.09957 13.8876 7.50251 14.2905 7.99957 14.2905C8.49663 14.2905 8.89957 13.8876 8.89957 13.3905V8.89994H13.3902C13.8872 8.89994 14.2902 8.49699 14.2902 7.99994C14.2902 7.50288 13.8872 7.09994 13.3902 7.09994H8.89957V2.60935Z"
      fill={props.fill ? props.fill : '#9E9E9E'}
      stroke-width="3"
      strokeWidth="3"
    />
  </Svg>
));
