import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


interface ArrowIconProps extends SvgProps {
    size?: number
    color?: string,
    direction?: "left",
}
    

const ArrowIcons: React.FC<ArrowIconProps> = ({
  size = 24,
  color = "#999999",
  direction = 'right',
  ...props
}) => (
    <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={[
      
      {
        transform:
          direction === "right"
            ? [{ rotate: "180deg" }]
            : [],
      },
    ]}
    {...props}
    
>
    <Path  stroke={color} strokeWidth={2} d="m9 6 6 6-6 6"  />
  </Svg>
)
export default ArrowIcons
