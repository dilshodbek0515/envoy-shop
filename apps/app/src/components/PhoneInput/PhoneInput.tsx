import CloseIcon from "assets/icon/close";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Screens, Spacing } from "src/shared/token";

const ACTIVE_COLOR = "#00beff";
const INACTIVE_COLOR = "#808080";
const LABEL_BG = "#171c26";

const PhoneInput = ({
  label = "Telefon raqam",
  ...props
}: MaskedTextInputProps & { label?: string, error?: string }) => {
  const [active, setActive] = useState(false);
  const length = (props.value ?? "").length;

  /* prefix (+998) animation */
  const prefixAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(active || length > 0 ? 0 : 55, {
          duration: 300,
        }),
      },
    ],
    opacity: withTiming(active || length > 0 ? 1 : 0, {
      duration: active ? 300 : 100,
    }),
  }));

  /* floating label animation */
  const labelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(active || length > 0 ? -28 : -8, {
          duration: 180,
        }),
      },
      {
        translateX: withTiming(active || length > 0 ? -5 : 0, {
          duration: 180,
        }),
      },
    ],
    fontSize: withTiming(active || length > 0 ? 12 : 16, {
      duration: 180,
    }),
    paddingHorizontal: withTiming(active || length > 0 ? 6 : 0, {
      duration: 180,
    }),
  }));

  /* right clear button slide */
  const rightBoxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(length > 0 ? 0 : 55, {
          duration: 300,
        }),
      },
    ],
  }));

  /* close icon fade */
  const closeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(length > 0 ? 1 : 0, {
      duration: 200,
    }),
  }));

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <View
      style={[
        styles.inputBox,
        { borderColor: active ? ACTIVE_COLOR : INACTIVE_COLOR },
      ]}
    >
      {/* PREFIX */}
      <Animated.View style={[styles.prefixBox, prefixAnimatedStyle]}>
        <Text style={styles.prefixText}>+998</Text>
        <View
          style={[
            styles.separator,
            { backgroundColor: active ? ACTIVE_COLOR : INACTIVE_COLOR },
          ]}
        />
      </Animated.View>

      {/* INPUT */}
      <MaskedTextInput
        {...props}
        style={styles.input}
        mask="99 999-99-99"
        keyboardType="phone-pad"
        placeholderTextColor="#fff"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />

      {/* LABEL */}
      <Animated.Text
        onPress={() => setActive(true)}
        style={[
          styles.label,
          { color: active ? ACTIVE_COLOR : "#999" },
          labelAnimatedStyle,
        ]}
      >
        {label}
      </Animated.Text>

      {/* CLEAR BUTTON */}
      <Animated.View style={[styles.inputRightBox, rightBoxAnimatedStyle]}>
        <AnimatedPressable
          onPress={() => props.onChangeText?.("", "")}
          style={[styles.clearButton, closeAnimatedStyle]}
        >
          <CloseIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  inputBox: {
    height: 55,
    borderRadius: 20,
    borderWidth: 1.5,
    paddingLeft: Screens.width * 0.21,
    borderColor: "#808080",
    flexDirection: "row",
    gap: Spacing.horizontal,
    marginTop: Spacing.horizontal,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  prefixBox: {
    paddingLeft: Spacing.horizontal,
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.horizontal,
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 55,
    // backgroundColor: "red",
  },
  prefix: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    position: "absolute",
    top: "50%",
    left: Spacing.horizontal,
    backgroundColor: "#171c26",
    fontSize: 16,
    borderRadius: 100,
    transform: [{ translateY: "-50%" }],
  },
  inputRightBox: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 53,
    width: 55,
    flexDirection: "row",
    overflow: "hidden",
  },
  eyeButton: {
    width: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  prefixText: {
    color: "#fff",
  },
  separator: {
    width: 1,
    height: "60%",
  },
  clearButton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
