import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PhoneInput from "src/components/PhoneInput/PhoneInput";
import { Spacing } from "src/shared/token";

const Register = () => {
  const [phone, setPhone] = useState("");
  return (
    <View style={styles.container}>
      <PhoneInput onChangeText={setPhone} value={phone} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.horizontal,
  },
});
