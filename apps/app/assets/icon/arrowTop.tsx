import Svg, { Path } from "react-native-svg";

const ArrowTopIcon = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 15L12 9L6 15"
        stroke="#00beff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowTopIcon;
