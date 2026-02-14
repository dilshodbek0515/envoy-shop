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
import { sellerFullSchema } from "@schema/schema-full-schema";

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
      first_name: "",
      last_name: "",
      company_name: "",
      inn: "",
      address: "",
      company_type: "",
      type: "individual",
    },
    mode: "onChange", // ⚡ onChange bilan isValid ishlaydi
    resolver: zodResolver(sellerFullSchema), // ⚡ Zod bilan validatsiya
  });

  const typeValue = watch("type");

  const onSubmit = (data: FormData) => {
    // 🔥 safeParse bilan tekshirish
    const result = sellerFullSchema.safeParse(data);

    if (result.success) {
      console.log("Form Data:", result.data); // hamma input to'g'ri
    } else {
      console.log("Validation Errors:", result.error.format());
    }
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
                typeValue === "individual" && styles.activeButton,
              ]}
              onPress={() => setValue("type", "individual")}
            >
              <Text
                style={[
                  styles.roleTitle,
                  typeValue === "individual" && styles.activeButtonTitle,
                ]}
              >
                Jismoniy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                typeValue === "company" && styles.activeButton,
              ]}
              onPress={() => setValue("type", "company")}
            >
              <Text
                style={[
                  styles.roleTitle,
                  typeValue === "company" && styles.activeButtonTitle,
                ]}
              >
                Yuridik
              </Text>
            </TouchableOpacity>
          </View>

          {/* Company Type Select */}
          <Controller
            control={control}
            name="company_type"
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
            name="first_name"
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
            name="last_name"
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
            name="company_name"
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
                label="INN"
                value={value}
                onChangeText={onChange}
                error={!!error}
              />
            )}
          />

          {/* Address */}
          <Controller
            control={control}
            name="address"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AppInput
                label="Manzil"
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
        disabled={!isValid} // ⚡ isValid bilan button faqat hamma to'ldirilganda enabled
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
