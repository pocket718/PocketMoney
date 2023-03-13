import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Check(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.333 4l-7.334 7.333L2.666 8"
        stroke="#359DB6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Check;
