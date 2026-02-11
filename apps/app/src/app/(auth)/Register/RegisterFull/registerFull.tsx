import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AppInput from "src/components/AppInput/input";
import PageHeader from "src/components/header/PageHeader";
import CompanySelect from "src/components/CompaniySelect/CompanySelect";
import ButtonApp from "src/shared/ui/Button/button";
import { Colors, Spacing } from "src/shared/token";
import { useState } from "react";

type Role = "seller" | "buyer" | null;

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  inn: string;
  legalAddress: string;
  companitType: string;
}

const RegisterFull = () => {
  const [role, setRole] = useState<Role>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    inn: "",
    legalAddress: "",
    companitType: "",
  });

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isSeller = role === "seller";
  const isBuyer = role === "buyer";

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.flex}>
        <PageHeader title="Ro'yhatdan o'tish" />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputContainer}>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[styles.roleButton, isSeller && styles.activeButton]}
                onPress={() => setRole("seller")}
              >
                <Text
                  style={[
                    styles.roleTitle,
                    isSeller && styles.activeButtonTitle,
                  ]}
                >
                  Yuridik
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleButton, isBuyer && styles.activeButton]}
                onPress={() => setRole("buyer")}
              >
                <Text
                  style={[
                    styles.roleTitle,
                    isBuyer && styles.activeButtonTitle,
                  ]}
                >
                  Jismoniy
                </Text>
              </TouchableOpacity>
            </View>

            <CompanySelect
              value={formData.companitType}
              onChangeText={(text: string) =>
                handleChange("companitType", text)
              }
            />
            <AppInput
              label="Ism"
              value={formData.firstName}
              onChangeText={(text: string) => handleChange("firstName", text)}
            />
            <AppInput
              label="Familiya"
              value={formData.lastName}
              onChangeText={(text: string) => handleChange("lastName", text)}
            />
            <AppInput
              label="Korxona nomi"
              value={formData.companyName}
              onChangeText={(text: string) => handleChange("companyName", text)}
            />
            <AppInput
              label="Stir (INN)"
              value={formData.inn}
              onChangeText={(text: string) => handleChange("inn", text)}
            />
            <AppInput
              label="Yuridik manzil"
              value={formData.legalAddress}
              onChangeText={(text: string) =>
                handleChange("legalAddress", text)
              }
            />
          </View>
        </ScrollView>
        <ButtonApp label="Davom etish" onPress={() => console.log(formData)} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterFull;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 120,
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
    marginBottom: Spacing.horizontal,
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
