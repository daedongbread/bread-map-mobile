import React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

const IcLike: React.FC<SvgProps> = props => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
    <G opacity={props.opacity}>
      <Path
        d="M6.59338 13.3265V6.55315C6.59338 6.28649 6.67338 6.02649 6.82005 5.80649L8.64005 3.09982C8.92672 2.66649 9.64005 2.35982 10.2467 2.58649C10.9 2.80649 11.3334 3.53982 11.1934 4.19315L10.8467 6.37315C10.8201 6.57315 10.8734 6.75315 10.9867 6.89315C11.1 7.01982 11.2667 7.09982 11.4467 7.09982H14.1867C14.7134 7.09982 15.1667 7.31315 15.4334 7.68649C15.6867 8.04649 15.7334 8.51315 15.5667 8.98649L13.9267 13.9798C13.72 14.8065 12.82 15.4798 11.9267 15.4798H9.32672C8.88005 15.4798 8.25338 15.3265 7.96672 15.0398L7.11338 14.3798C6.78672 14.1332 6.59338 13.7398 6.59338 13.3265Z"
        fill={props.fill}
      />
      <Path
        d="M4.47337 5.25391H3.78671C2.75337 5.25391 2.33337 5.65391 2.33337 6.64057V13.3472C2.33337 14.3339 2.75337 14.7339 3.78671 14.7339H4.47337C5.50671 14.7339 5.92671 14.3339 5.92671 13.3472V6.64057C5.92671 5.65391 5.50671 5.25391 4.47337 5.25391Z"
        fill={props.fill}
      />
    </G>
  </Svg>
);

export { IcLike };
