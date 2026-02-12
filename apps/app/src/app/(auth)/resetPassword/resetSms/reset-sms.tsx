import { router, useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PageHeader from "src/components/header/PageHeader";
import { Screens, Spacing } from "src/shared/token";

const ResetSms = () => {
  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState<string>("");
  const navigation = useNavigation();
  const insetBottom = useSafeAreaInsets().bottom;
  const smsCode = "1234";

  const buttons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  useEffect(() => {
    if (timer === 0) return; // Bu bo‘lishi mumkin, lekin interval boshqa joyda bo‘ladi

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []); // dependency [] - faqat component mount qilinganda ishlaydi


  const handleResend = () => {
    setTimer(60);
  }

  const handlePress = (value: string) => {
    if (value === "del") {
      setCode((prev) => prev.slice(0, -1));
      return;
    }
    if (code.length < 4) {
      setCode((prev) => prev + value);
    }
  };

  useEffect(() => {
    if (code.length === 4 && code === smsCode) {
      const timeout = setTimeout(() => {
        router.replace("/resetPassword/changePassword/change-password");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [code, navigation]);

  let borderColor = "transparent";
  if (code.length === 4 && code !== smsCode) borderColor = "red";
  else if (code === smsCode) borderColor = "green";

  return (
    <View style={styles.screen}>
      <PageHeader title="Sms" isEnabledBack />
      <View style={styles.container}>
        <Text style={styles.CallText}>Number isn't, because of api</Text>

        <View
          style={[styles.timerContainer, { bottom: insetBottom + 200 }]}
        >
          <View style={styles.timerBackground}>
            <View style={styles.timerLeft}>
              {timer > 0 && (
                <Text style={styles.timerNumber}>{ timer }</Text>
              )}
            </View>

            <View style={styles.timerCenter}>
                <Pressable
                  onPress={handleResend}
                  style={styles.resendPressable}
                >
                  <Text style={styles.resendText}>
                    Qayta SMS yuboring
                  </Text>
                </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.codeContainer}>
          {[0, 1, 2, 3].map((_, index) => (
            <View
              key={index}
              style={[
                styles.codeBox,
                {
                  borderWidth: borderColor === "transparent" ? 0 : 2,
                  borderColor,
                },
              ]}
            >
              <Text style={styles.codeText}>{code[index] ?? ""}</Text>
            </View>
          ))}
        </View>
        <View style={styles.keyboardContainer}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((btn) => (
                <Pressable
                  key={btn}
                  onPress={() => handlePress(btn.toString())}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{btn}</Text>
                </Pressable>
              ))}
            </View>
          ))}
          <View style={styles.row}>
            <Pressable
              onPress={() => handlePress("0")}
              style={[styles.button, styles.zeroButton]}
            >
              <Text style={styles.buttonText}>0</Text>
            </Pressable>
            <Pressable onPress={() => handlePress("del")} style={styles.button}>
              <Text style={styles.buttonText}>⌫</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ResetSms;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#171C26",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.horizontal,
  },
  CallText: {
    color: "white",
    fontSize: 18,
  },
  codeContainer: {
    flexDirection: "row",
    gap: Spacing.horizontal,
    justifyContent: "center",
    marginTop: Spacing.horizontal,
  },
  codeBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#2E3749",
    alignItems: "center",
    justifyContent: "center",
  },
  codeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  keyboardContainer: {
    width: "100%",
    paddingHorizontal: Spacing.horizontal,
    gap: Spacing.horizontal,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#2E3749",
    alignItems: "center",
    justifyContent: "center",
  },
  zeroButton: {
    flex: 2.7,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  },
  timerContainer: {
      position: "absolute",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: Spacing.horizontal,
      // height: 55
    },
    timerBackground: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "#3CB371",
      backgroundColor: "#2E3749",
      width: "100%",
      borderRadius: 10,
      // paddingVertical: 12,
      // paddingHorizontal: 20,
      marginHorizontal: 20,
      position: "absolute",
      bottom: Screens.height * 0.091,
      height: 36,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    },
    timerLeft: {
      // flex: 1,
      alignItems: "flex-start",
      position: "absolute",
      left: 20
    },
    timerCenter: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    timerNumber: {
      fontSize: 16,
      opacity: 0.8,
      color: "#00beff"
    },
    timerText: {
      fontSize: 16,
      color: "#00beff"
    },
    resendPressable: {
      alignItems: "center",
      justifyContent: "center"
    },
    resendText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#00beff",
    },
});