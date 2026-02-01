import Svg, { Path } from "react-native-svg";

const ArrowIcon = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.14645 9.14645C5.34171 8.95118 5.65829 8.95118 5.85355 9.14645L11.5 14.7929L17.1464 9.14645C17.3417 8.95118 17.6583 8.95118 17.8536 9.14645C18.0488 9.34171 18.0488 9.65829 17.8536 9.85355L11.8536 15.8536C11.6583 16.0488 11.3417 16.0488 11.1464 15.8536L5.14645 9.85355C4.95118 9.65829 4.95118 9.34171 5.14645 9.14645Z"
        fill="#999999"
      />
    </Svg>
  );
};

export default ArrowIcon;
