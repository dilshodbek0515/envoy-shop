import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface CloseIconProps extends SvgProps {
  color?: string;
  size?: number;
}

const CloseIcon: React.FC<CloseIconProps> = ({
  color = "#fff",
  size = 18,
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloseIcon;
