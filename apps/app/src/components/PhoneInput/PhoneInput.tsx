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
    flexDirection: "row",
    marginTop: Spacing.horizontal,
  },

  input: {
    flex: 1,
    color: "#fff",
  },

  prefixBox: {
    position: "absolute",
    left: Spacing.horizontal,
    bottom: 0,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.horizontal,
  },

  prefixText: {
    color: "#fff",
  },

  separator: {
    width: 1,
    height: "60%",
  },

  label: {
    position: "absolute",
    top: "50%",
    left: Spacing.horizontal,
    backgroundColor: LABEL_BG,
    borderRadius: 100,
    transform: [{ translateY: -12 }],
  },

  inputRightBox: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  clearButton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
