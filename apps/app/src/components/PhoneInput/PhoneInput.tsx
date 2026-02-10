import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import CloseIcon from "assets/icon/close";
import { Spacing } from "src/shared/token";
import { formatPhone } from "src/utils/phone";

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const PhoneInput = ({ value, onChangeText }: PhoneInputProps) => {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [callingCode] = useState("998");

  const animated = useRef(new Animated.Value(0)).current;

  const clearInput = () => {
    onChangeText("");
    setError("");
  };

  const onFocus = () => {
    setFocused(true);
    Animated.timing(animated, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    setFocused(false);
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length !== 9) {
      setError("Telefon raqam 9 ta raqamdan iborat bo‘lishi shart");
    } else {
      setError("");
    }
    if (!value) {
      Animated.timing(animated, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleChange = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "").slice(0, 9);
    onChangeText(digitsOnly);
    if (digitsOnly.length === 9) setError("");
  };

  const labelStyle = {
    top: animated.interpolate({ inputRange: [0, 1], outputRange: [35, 8] }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: error ? "red" : focused ? "#00beff" : "#999",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Animated.Text style={[styles.label, labelStyle]}>
          Telefon raqam
        </Animated.Text>

        <View
          style={[
            styles.inputBox,
            { borderColor: error ? "red" : focused ? "#00beff" : "#999" },
          ]}
        >
          <Text style={styles.prefix}>+{callingCode}</Text>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={formatPhone(value)}
            onChangeText={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardAppearance="dark"
          />

          {value.length > 0 && (
            <TouchableOpacity onPress={clearInput} style={styles.clearBtn}>
              <CloseIcon
                color={focused ? "#00beff" : "#999"}
                width={24}
                height={24}
              />
            </TouchableOpacity>
          )}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    left: 14,
    backgroundColor: "#171c26",
    paddingHorizontal: 2,
    zIndex: 2,
  },
  inputBox: {
    height: 56,
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.horizontal,
    marginTop: 16,
  },
  prefix: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 6,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 6,
  },
  clearBtn: {
    padding: 6,
  },
});
