import { router, useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import PageHeader from "src/components/header/PageHeader";
import { Spacing } from "src/shared/token";

const ResetSms = () => {
  const [code, setCode] = useState<string>("");
  const navigation = useNavigation();
  const smsCode = "1234";

  const buttons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

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
    flex: 2,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  },
});
