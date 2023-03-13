import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Cross(props) {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.531 8.5l7 7M8.531 15.5l7-7"
        stroke="#699595"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Cross;
