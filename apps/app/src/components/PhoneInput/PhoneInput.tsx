// import { useState } from "react";
// import { StyleSheet, Text, TextInput, View } from "react-native";
// import { Spacing } from "src/shared/token";

// interface IProps {
//   label?: string;
// }

// const PhoneInput = ({ label, ...props }: IProps) => {
//   const [active, setActive] = useState(false);

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputBox}>
//         <Text style={styles.inputText}>+998</Text>
//         <View
//           style={{
//             height: 20,
//             borderWidth: 1,
//             borderColor: "#fff"
//             // backgroundColor: active
//             //   ? "#00beff"
//             //   : "#fff",
//           }}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone number"
//           placeholderTextColor={"#FFF"}
//         />
//       </View>
//     </View>
//   );
// };
// export default PhoneInput;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: Spacing.horizontal,
//   },
//   inputBox: {
//     alignItems: "center",
//     flexDirection: "row",
//     height: 55,
//     paddingLeft: 12,
//     borderWidth: 1,
//     borderColor: "#fff",
//     borderRadius: 18,
//     gap: Spacing.horizontal,
//   },
//   input: {
//     fontSize: 18,
//     color: "#fff",
//   },
//   inputText: {
//     fontSize: 16,
//     color: "#fff",
//   },
// });

// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Animated,
// } from "react-native";
// import { Spacing } from "src/shared/token";

// const PhoneInput = ({ label }: { label: string }) => {
//   const [value, setValue] = useState("");
//   const [focused, setFocused] = useState(false);

//   const animatedLabel = new Animated.Value(value ? 1 : 0);

//   const handleFocus = () => {
//     setFocused(true);
//     Animated.timing(animatedLabel, {
//       toValue: 1,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleBlur = () => {
//     setFocused(false);
//     if (!value) {
//       Animated.timing(animatedLabel, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: false,
//       }).start();
//     }
//   };

//   const labelStyle = {
//     top: animatedLabel.interpolate({
//       inputRange: [0, 1],
//       outputRange: [18, -8],
//     }),
//     fontSize: animatedLabel.interpolate({
//       inputRange: [0, 1],
//       outputRange: [16, 12],
//     }),
//     color: focused ? "#00beff" : "#fff",
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.Text style={[styles.label, labelStyle]}>
//         {label}
//       </Animated.Text>

//       <TextInput
//         value={value}
//         onChangeText={setValue}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         style={[
//           styles.input,
//           { borderColor: focused ? "#00beff" : "#fff" },
//         ]}
//       />
//     </View>
//   );
// };

// export default PhoneInput;

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 16,
//     paddingHorizontal: Spacing.horizontal
//   },
//   label: {
//     position: "absolute",
//     left: 22,
//     backgroundColor: "#171c26", // agar background qoraroq bo‘lsa
//     paddingHorizontal: 4,
//     zIndex: 1,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     color: "#fff",
//   },
// });

// import { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Animated,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";

// const PhoneInput = ({ label = "Telefon raqam" }) => {
//   const [value, setValue] = useState("");
//   const [focused, setFocused] = useState(false);

//   const animated = useRef(new Animated.Value(0)).current;

//   const onFocus = () => {
//     setFocused(true);
//     Animated.timing(animated, {
//       toValue: 1,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   };

//   const onBlur = () => {
//     setFocused(false);
//     if (!value) {
//       Animated.timing(animated, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: false,
//       }).start();
//     }
//   };

//   const handleChange = (text: string) => {
//     // faqat raqam
//     const cleaned = text.replace(/[^0-9]/g, "");
//     setValue(cleaned);

//     if (cleaned.length > 0) {
//       Animated.timing(animated, {
//         toValue: 1,
//         duration: 200,
//         useNativeDriver: false,
//       }).start();
//     }
//   };

//   const labelStyle = {
//     top: animated.interpolate({
//       inputRange: [0, 1],
//       outputRange: [18, -8],
//     }),
//     fontSize: animated.interpolate({
//       inputRange: [0, 1],
//       outputRange: [16, 12],
//     }),
//     color: focused ? "#00beff" : "#999",
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.wrapper}>
//         <Animated.Text style={[styles.label, labelStyle]}>
//           {label}
//         </Animated.Text>

//         <View
//           style={[
//             styles.inputContainer,
//             { borderColor: focused ? "#00beff" : "#fff" },
//           ]}
//         >
//           <Text style={styles.prefix}>+998</Text>

//           <TextInput
//             style={styles.input}
//             keyboardType="number-pad"
//             value={value}
//             onChangeText={handleChange}
//             onFocus={onFocus}
//             onBlur={onBlur}
//             maxLength={9}
//             placeholder="901234567"
//             placeholderTextColor="#666"
//           />
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default PhoneInput;

// const styles = StyleSheet.create({
//   wrapper: {
//     marginVertical: 20,
//   },
//   label: {
//     position: "absolute",
//     left: 14,
//     backgroundColor: "#000",
//     paddingHorizontal: 6,
//     zIndex: 2,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: 52,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//   },
//   prefix: {
//     color: "#fff",
//     fontSize: 16,
//     marginRight: 6,
//   },
//   input: {
//     flex: 1,
//     color: "#fff",
//     fontSize: 16,
//   },
// });

import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const formatPhone = (value: any) => {
  const v = value.replace(/\D/g, "").slice(0, 9);
  return [
    v.slice(0, 2),
    v.slice(2, 5),
    v.slice(5, 7),
    v.slice(7, 9),
  ]
    .filter(Boolean)
    .join(" ");
};

const PhoneInput = () => {
  const [raw, setRaw] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("UZ");
  const [callingCode, setCallingCode] = useState("998");

  const animated = useRef(new Animated.Value(0)).current;

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
      outputRange: [18, -8],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: error ? "red" : focused ? "#00beff" : "#fff",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{
        flex: 1,
      }}>
        <View style={styles.wrapper}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Telefon raqam
          </Animated.Text>

          <View
            style={[
              styles.inputBox,
              {
                borderColor: error
                  ? "red"
                  : focused
                  ? "#00beff"
                  : "#fff",
              },
            ]}
          >

            <Text style={styles.prefix}>+{callingCode}</Text>

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={formatPhone(raw)}
              onChangeText={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    position: "absolute",
    left: 14,
    backgroundColor: "#171c26",
    paddingHorizontal: 6,
    zIndex: 2,
  },
  inputBox: {
    height: 54,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
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
});
