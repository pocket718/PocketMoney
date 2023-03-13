import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function AddChildButton(props) {
  return (
    <Svg
      width={"70%"}
      height={"70%"}
      viewBox="0 0 153 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={76.1203}
        cy={76.0461}
        r={73.9286}
        stroke="#359DB6"
        strokeWidth={4.07882}
        strokeDasharray="14.28 14.28"
      />
      <Path
        d="M70.838 96.245V81.069H55.542V70.593h15.296V55.417h10.197v15.176H96.37v10.476H81.035v15.176H70.838z"
        fill="#359DB6"
      />
    </Svg>
  )
}

export default AddChildButton
