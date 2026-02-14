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
    defaultValues: { new_password: "" },
  });

  // Form Validatsiya uchun
  const newPassword = watch("new_password");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Keyboard animatsiya uchun
  const buttonBottom = useRef(new Animated.Value(Spacing.horizontal)).current;

  // Password validatsiya
  useEffect(() => {
    // Parol kammida 6ta belgidan iborat bosin
    setIsFormValid(newPassword?.length >= 6);
  }, [newPassword]);

  // Keyboard event listener
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
  }, [Spacing.horizontal]);

  const buttonPress = async () => {
    setIsLoading(true);
    try {
      const data = {
        password: "",
      };

      const response = await PasswordFn(data);
      if (response.message === "") {
        router.replace("/Login/");
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

        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.horizontal,
          }}
        >
          <Controller
            name="new_password"
            control={control}
            rules={{
              required: "Parol majburiy",
              minLength: {
                value: 2,
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

          <ButtonApp
            onPress={buttonPress}
            label={isLoading ? "Yuborilmoqda..." : "Davom Etish"}
            disabled={password.replace(/\D/g, "").length < 6}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
