import CloseIcon from "assets/icon/close";
import EyeCloseIcon from "assets/icon/eyeCloseIcon";
import EyeIcon from "assets/icon/eyeIcon";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Spacing } from "src/shared/token";

const PasswordInput = ({ label, value = "", onChangeText }: any) => {
  const [focused, setFocused] = useState(false);
  const [password, setPassword] = useState(true);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;
  const clearAnim = useRef(
    new Animated.Value(focused && value ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: focused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(clearAnim, {
      toValue: focused && value && value.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focused, value]);

  const labelStyle: Animated.AnimatedProps<TextStyle> = {
    position: "absolute",
    zIndex: 2,
    elevation: 2,
    backgroundColor: "#171C26",
    paddingHorizontal: 4,
    borderRadius: 5,
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 13],
    }),
    left: 12,
    top: 18,
    transform: [
      {
        translateY: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25],
        }),
      },
    ],
  };

  const INPUT_HEIGHT = 56;
  const CLEAR_SIZE = 24;

  const clearStyle: Animated.AnimatedProps<ViewStyle> = {
    position: "absolute",
    right: Spacing.horizontal,
    top: (INPUT_HEIGHT - CLEAR_SIZE) / 2,
    transform: [
      {
        translateX: clearAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
    ],
    opacity: clearAnim,
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[labelStyle, { color: focused ? "#00beff" : "#999999" }]}
      >
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { borderColor: focused ? "#00beff" : "#999999" }]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardAppearance="dark"
        secureTextEntry={password}
      />
      <Animated.View
        style={clearStyle}
        pointerEvents={focused && value && value.length > 0 ? "auto" : "none"}
      >
        <View style={styles.parolButtonView}>
          <Pressable onPress={() => setPassword(!password)}>
            {password ? (
              <EyeCloseIcon color="#00beff" size={24} />
            ) : (
              <EyeIcon color="#00beff" size={24} />
            )}
          </Pressable>

          <View
            style={{
              width: 2,
              height: 25,
              backgroundColor: "#00beff",
              borderRadius: 5,
            }}
          />
          <TouchableOpacity onPress={() => onChangeText("")}>
            <CloseIcon color="#00beff" size={24} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 16,
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: Spacing.horizontal,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  parolButtonView: {
    flexDirection: "row",
    gap: 8,
  },
});
