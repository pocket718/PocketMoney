import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CalenderIcon(props) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1.547 4.703h8.912M8.22 6.658h.004M6.003 6.658h.004M3.78 6.658h.005M8.22 8.6h.004M6.003 8.6h.004M3.78 8.6h.005M8.02 1v1.645M3.984 1v1.645"
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M8.12 1.791H3.884c-1.468 0-2.385.818-2.385 2.322v4.524c0 1.527.917 2.364 2.385 2.364h4.23c1.472 0 2.385-.822 2.385-2.326V4.113c.005-1.504-.908-2.322-2.38-2.322z"
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CalenderIcon;
