import CloseIcon from "assets/icon/close";
import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Spacing } from "src/shared/token";

const formatPhone = (value: any) => {
  const v = value.replace(/\D/g, "").slice(0, 9);
  return [v.slice(0, 2), v.slice(2, 5), v.slice(5, 7), v.slice(7, 9)]
    .filter(Boolean)
    .join(" ");
};

const PhoneInput = ({}: any) => {
  const [raw, setRaw] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("UZ");
  const [callingCode, setCallingCode] = useState("998");

  const animated = useRef(new Animated.Value(0)).current;

  const clearInput = () => {
    setRaw("");
    setError("");
  };

  const onFocus = () => {
    setFocused(true);
    Animated.timing(animated, {
      toValue: 1, // SRAZU tepaga
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    setFocused(false);

    if (raw.length !== 9) {
      setError("Telefon raqam 9 ta raqamdan iborat bo‘lishi shart");
    } else {
      setError("");
    }

    if (!raw) {
      Animated.timing(animated, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const onChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 9);
    setRaw(cleaned);
    if (cleaned.length === 9) setError("");
  };

  const labelStyle = {
    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [35, 8],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: error ? "red" : focused ? "#00beff" : "#999",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View>
          <Animated.Text style={[styles.label, labelStyle]}>
            Telefon raqam
          </Animated.Text>

          <View
            style={[
              styles.inputBox,
              {
                borderColor: error ? "red" : focused ? "#00beff" : "#999",
              },
            ]}
          >
            <Text style={styles.prefix}>+{callingCode}</Text>

            <View
              style={{
                borderWidth: 1,
                height: 16,
                borderColor: focused ? "#00beff" : "#999",
                borderRadius: 8,
                marginRight: 6,
              }}
            />

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={formatPhone(raw)}
              onChangeText={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />

            {raw.length > 0 && (
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
