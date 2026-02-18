import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppInput from "src/components/AppInput/input";
import PageHeader from "src/components/header/PageHeader";
import PasswordInput from "src/components/PasswordInput/PasswordInput";
import { Colors, Spacing } from "src/shared/token";
import ButtonApp from "src/shared/ui/Button/button";

type Role = "seller" | "buyer" | null;

const RegisterSecond = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>(null);

  const isSeller = role === "seller";
  const isBuyer = role === "buyer";

  const isFormValid =
    !!email &&
    !!password &&
    !!confirmPassword &&
    password === confirmPassword &&
    role !== null;

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <PageHeader title="Ro'yhatdan o'tish" />

      <View style={styles.inputContainer}>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleButton, isSeller && styles.activeButton]}
            onPress={() => setRole("seller")}
          >
            <Text
              style={[styles.roleTitle, isSeller && styles.activeButtonTitle]}
            >
              Sotuvchi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleButton, isBuyer && styles.activeButton]}
            onPress={() => setRole("buyer")}
          >
            <Text
              style={[styles.roleTitle, isBuyer && styles.activeButtonTitle]}
            >
              Xaridor
            </Text>
          </TouchableOpacity>
        </View>

        <AppInput label="Email" value={email} onChangeText={setEmail} />
        <PasswordInput
          label="Parol"
          value={password}
          onChangeText={setPassword}
        />
        <PasswordInput
          label="Qayta parol"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <ButtonApp
        label="Davom etish"
        onPress={() => router.replace("/Register/RegisterFull/registerFull")}
        disabled={!isFormValid}
      />
    </Pressable>
  );
};

export default RegisterSecond;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    paddingHorizontal: Spacing.horizontal,
  },

  roleContainer: {
    flexDirection: "row",
    marginTop: Spacing.horizontal,
    gap: Spacing.horizontal,
    padding: Spacing.horizontal,
    backgroundColor: "#262E3D",
    borderRadius: 20,
  },

  roleButton: {
    width: "48%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#999999",
    borderRadius: 20,
  },

  roleTitle: {
    fontSize: 18,
    color: "#999999",
    fontWeight: "500",
  },

  activeButton: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },

  activeButtonTitle: {
    color: "#FFFFFF",
  },
});
