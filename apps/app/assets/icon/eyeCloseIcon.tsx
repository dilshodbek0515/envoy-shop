import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

interface EyeCloseIconProps extends SvgProps {
  color?: string;
  size?: number;
}

const EyeCloseIcon: React.FC<EyeCloseIconProps> = ({
  color = "#fff",
  size = 24,
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_1_15)">
        <Path
          d="M3.05 9.31a1 1 0 111.914-.577c2.086 6.986 11.982 6.987 14.07.004a1 1 0 111.918.57 9.508 9.508 0 01-1.813 3.417L20.414 14A1 1 0 0119 15.414l-1.311-1.311a9.116 9.116 0 01-2.32 1.269l.357 1.335a1 1 0 11-1.931.518l-.364-1.357c-.947.14-1.915.14-2.862 0l-.364 1.357a1 1 0 11-1.931-.518l.357-1.335a9.118 9.118 0 01-2.32-1.27l-1.31 1.312A1 1 0 113.585 14l1.275-1.275c-.784-.936-1.41-2.074-1.812-3.414l.002-.001z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_15">
          <Path fill={color} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EyeCloseIcon;
