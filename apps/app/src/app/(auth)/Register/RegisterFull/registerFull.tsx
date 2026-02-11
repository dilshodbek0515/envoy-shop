import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AppInput from "src/components/AppInput/input";
import CompanySelect from "src/components/CompaniySelect/CompanySelect";
import ButtonApp from "src/shared/ui/Button/button";
import PageHeader from "src/components/header/PageHeader";
import { Colors, Spacing } from "src/shared/token";

// 1️⃣ Zod schema - barcha inputlarni required qilamiz
const sellerFullSchema = z.object({
  firstName: z.string().min(1, "Ism kiritilishi shart"),
  lastName: z.string().min(1, "Familiya kiritilishi shart"),
  companyName: z.string().min(1, "Korxona nomi kiritilishi shart"),
  inn: z.string().min(1, "INN kiritilishi shart"),
  legalAddress: z.string().min(1, "Manzil kiritilishi shart"),
  companitType: z.string().min(1, "Faoliyat turi kiritilishi shart"),
  type: z.enum(["seller", "buyer"]),
});

type FormData = z.infer<typeof sellerFullSchema>;

const RegisterFull = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      inn: "",
      legalAddress: "",
      companitType: "",
      type: "buyer",
    },
    mode: "onChange",
    resolver: zodResolver(sellerFullSchema), // 🔥 validation bilan isValid ishlaydi
  });

  const typeValue = watch("type");

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data); // 🔥 barcha inputlar shu yerda chiqadi
    console.log("Errors:", errors);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PageHeader title="Ro'yhatdan o'tish" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingHorizontal: Spacing.horizontal }}>
          {/* Role Switch */}
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                typeValue === "seller" && styles.activeButton,
              ]}
              onPress={() => setValue("type", "seller")}
            >
              <Text
                style={[
                  styles.roleTitle,
                  typeValue === "seller" && styles.activeButtonTitle,
                ]}
              >
                Yuridik
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                typeValue === "buyer" && styles.activeButton,
              ]}
              onPress={() => setValue("type", "buyer")}
            >
              <Text
                style={[
                  styles.roleTitle,
                  typeValue === "buyer" && styles.activeButtonTitle,
                ]}
              >
                Jismoniy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Company Select */}
          <Controller
            control={control}
            name="companitType"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CompanySelect
                value={value}
                onSelect={onChange}
                error={!!error}
              />
            )}
          />

          {/* First Name */}
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppInput
                label="Ism"
                value={value}
                onChangeText={onChange}
                error={!!error}
              />
            )}
          />

          {/* Last Name */}
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppInput
                label="Familiya"
                value={value}
                onChangeText={onChange}
                error={!!error}
              />
            )}
          />

          {/* Company Name */}
          <Controller
            control={control}
            name="companyName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppInput
                label="Korxona nomi"
                value={value}
                onChangeText={onChange}
                error={!!error}
              />
            )}
          />

          {/* INN */}
          <Controller
            control={control}
            name="inn"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppInput
                label="Stir (INN)"
                value={value}
                onChangeText={onChange}
                error={!!error}
              />
            )}
          />

          {/* Legal Address */}
          <Controller
            control={control}
            name="legalAddress"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppInput
                label="Yuridik manzil"
                value={value}
                onChangeText={onChange}
                error={!!error}
              />
            )}
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <ButtonApp
        label="Davom etish"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid} // 🔥 button faqat barcha input to'ldirilganda enabled
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterFull;

const styles = StyleSheet.create({
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
    flex: 1,
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
