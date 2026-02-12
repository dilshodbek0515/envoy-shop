import CloseIcon from "assets/icon/close";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Screens, Spacing } from "src/shared/token";

const PhoneInput = ({ label = "Telefon Raqam", ...props }: MaskedTextInputProps & { label?: string }) => {
  const [active, setActive] = useState(false);
  const length = (props.value ?? "").length;

  const prefixAnimatedStyle = useAnimatedStyle(() => {
    const translateY = withTiming(active || length > 0 ? 0 : 55, {
      duration: 300,
    });
    const opacity = withTiming(active || length > 0 ? 1 : 0, {
      duration: active ? 1000 : 100,
    });
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const translateY = withTiming(active || length > 0 ? "-240%" : "-50%", {
      duration: 180,
    });
    const translateX = withTiming(active || length > 0 ? 1 : 0, {
      duration: 180,
    });
    const fontSize = withTiming(active || length > 0 ? 12 : 16, {
      duration: 180,
    });
    const paddingHorizontal = withTiming(active || length > 0 ? 5 : 0, {
      duration: 180,
    });
    return {
      transform: [{ translateY }, { translateX }],
      fontSize,
      paddingHorizontal,
    };
  });

  const animatedRightBoxStyle = useAnimatedStyle(() => {
    const translateX = withTiming(length <= 0 ? 55 : 0, { duration: 300 });

    return {
      transform: [{ translateX }],
    };
  });

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const animationCloseStyle = useAnimatedStyle(() => {
    const opacity = withTiming(length <= 0 ? 0 : 1, {
      duration: length <= 0 ? 200 : 1000,
    });
    return {
      opacity
    };
  });

  return (
    <View
      style={[
        styles.inputBox,
        { borderColor : active ? "#00beff" : "#808080" }
      ]}
    >
      <Animated.View style={[styles.prefixBox, prefixAnimatedStyle]}>
        <View style={styles.prefix}>
          <Text style={{
            color: "#fff"
          }}>+998</Text>
        </View>
        <View
          style={{
            width: 1,
            backgroundColor: active ? "#00beff" : "#808080",
            marginVertical: 15,
          }}
        />
      </Animated.View>

      <MaskedTextInput
        style={styles.input}
        mask="99 999-99-99"
        placeholderTextColor="#fff"
        keyboardType="phone-pad"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        {...props}
      />

      <Animated.Text
        onPress={() => setActive(true)}
        style={[
          {
            color: active ? "#00beff" : "#999999",
          },
          styles.label,
          labelAnimatedStyle,
        ]}
      >
        {label}
      </Animated.Text>

      <Animated.View
        style={[styles.inputRightBox, animatedRightBoxStyle]}
      >
        <AnimatedPressable
          onPress={() => {
            props.onChangeText?.("", "");
          }}
          style={[
            styles.eyeButton,
            {
              borderColor: active ? styles.primary : styles.borderColor,
              marginVertical: 10,
            },
            animationCloseStyle,
          ]}
        >
          <CloseIcon size={22} color={active ? "#00beff" : "#808080"} />
        </AnimatedPressable>
      </Animated.View>
    </View>
  )
}
export default PhoneInput;

const styles = StyleSheet.create({
  primary: {
    borderColor: "#00beff",
  },
  borderColor: {
    borderColor: "#00beff",
  },
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
});