import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface EyeIconProps extends SvgProps {
  size?: number;
  color?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({
  size = 24,
  color = "#fff",
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={(size * 16) / 24} // prop size bo'yicha height moslashadi
      viewBox="0 0 24 16"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 13.6c-4.315 0-7.952-2.205-10.246-5.6C4.048 4.605 7.684 2.4 12 2.4c4.315 0 7.952 2.205 10.246 5.6-2.294 3.395-5.93 5.6-10.246 5.6zM12 .8C6.893.8 2.65 3.53.122 7.576a.8.8 0 000 .848C2.65 12.47 6.892 15.2 12 15.2c5.107 0 9.35-2.73 11.878-6.776a.8.8 0 000-.848C21.35 3.53 17.108.8 12 .8zm0 10.4a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z"
        fill={color}
      />
    </Svg>
  );
};

export default EyeIcon;
