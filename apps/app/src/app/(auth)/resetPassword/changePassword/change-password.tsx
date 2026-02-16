import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Animated,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PageHeader from "src/components/header/PageHeader";
import PasswordInput from "src/components/PasswordInput/PasswordInput";
import { Spacing } from "src/shared/token";
import { PasswordFn } from "@api/resetPassword/change-password";
import ButtonApp from "src/shared/ui/Button/button";
import { router } from "expo-router";

export default function ChangePassword() {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: { new_password: "", change_password: "" },
  });

  const newPassword = watch("new_password") || "";
  const changePassword = watch("change_password") || "";

  const [isLoading, setIsLoading] = useState(false);

  const hasMinLength = newPassword.length >= 6;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);

  const isFormValid =
    newPassword.length >= 6 &&
    changePassword.length >= 6 &&
    newPassword === changePassword;

  // Keyboard animatsiya uchun
  const buttonBottom = useRef(new Animated.Value(Spacing.horizontal)).current;

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        const keyboardHeight = e.endCoordinates.height;
        const targetBottom = keyboardHeight + 10;

        Animated.timing(buttonBottom, {
          toValue: targetBottom,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        Animated.timing(buttonBottom, {
          toValue: Spacing.horizontal,
          duration: 250,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const buttonPress = async (formData: any) => {
    setIsLoading(true);

    try {
      const data = {
        access_token: "", // token bo'lishi kerak
        password: formData.new_password,
      };

      const response = await PasswordFn(data);

      if (response?.success) {
        router.replace("/Login/index");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <PageHeader title="Parol O'zgartirish" isEnabledBack />

        <View style={{ flex: 1, paddingHorizontal: Spacing.horizontal }}>
          <Controller
            name="new_password"
            control={control}
            rules={{
              required: "Parol majburiy",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                message: "Parol kamida 6 ta belgidan iborat bo'lsin",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <PasswordInput
                label="Yangi parol"
                value={value}
                onChangeText={onChange}
                error={error?.message}
              />
            )}
          />

          <Controller
            name="change_password"
            control={control}
            rules={{
              required: "Parol majburiy",
              validate: (value) =>
                value === newPassword || "Parollar bir xil emas",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <PasswordInput
                label="Qayta Parol"
                value={value}
                onChangeText={onChange}
                error={error?.message}
              />
            )}
          />

          <View style={{ marginTop: 10, gap: 5 }}>
            <Text style={{ color: hasMinLength ? "#00ff99" : "#999" }}>
              {hasMinLength ? "✔" : "•"} Kamida 6 ta belgi
            </Text>

            <Text style={{ color: hasUpperCase ? "#00ff99" : "#999" }}>
              {hasUpperCase ? "✔" : "•"} Kamida 1 ta katta harf
            </Text>

            <Text style={{ color: hasNumber ? "#00ff99" : "#999" }}>
              {hasNumber ? "✔" : "•"} Kamida 1 ta raqam
            </Text>

            <Text style={{ color: isFormValid ? "#00ff99" : "#999" }}>
              {isFormValid ? "✔" : "•"} Parol bir-biriga mosmi
            </Text>
          </View>

          <ButtonApp
            onPress={handleSubmit(buttonPress)}
            label={isLoading ? "Yuborilmoqda..." : "Davom Etish"}
            disabled={!isFormValid || isLoading}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
