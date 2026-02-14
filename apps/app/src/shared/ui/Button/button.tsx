import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { Colors, Spacing } from "src/shared/token";

interface ButtonProps {
  label: string;
  loading?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  type?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const ButtonApp: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = true,
  type = "primary",
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    type === "secondary" && styles.secondary,
    disabled
      ? {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "#999999",
        }
      : { backgroundColor: Colors.primary },
    style,
  ];

  const textStyles = [
    styles.text,
    textStyle,
    { color: disabled ? "#999999" : "#fff" },
  ];

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
        style={buttonStyle}
      >
        <Text style={textStyles}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonApp;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 102,
    backgroundColor: "#262E3D",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    paddingHorizontal: Spacing.horizontal,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    height: 56,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.horizontal,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});
