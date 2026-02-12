// import { useState } from "react";
// import {
//   Keyboard,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import PageHeader from "src/components/header/PageHeader";
// import PhoneInput from "src/components/PhoneInput/PhoneInput";
// import { Spacing } from "src/shared/token";
// import ButtonApp from "src/shared/ui/Button/button";
// import { getClientIp, getDeviceId } from "src/utils/device";
// import { RegisterFn } from "../../../../../../../packages/api/register/register";
// import { router } from "expo-router";

// export default function InterPassword() {
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSendOtp = async () => {
//       setLoading(true);
  
//       try {
//         const digitsOnly = phone.replace(/\D/g, "");
//         const fullPhone = digitsOnly.startsWith("998")
//           ? `+${digitsOnly}`
//           : `+998${digitsOnly}`;
  
//         const device_id = getDeviceId();
//         const ip = await getClientIp();
  
//         const data = {
//           phone: fullPhone,
//           ip_address: ip,
//           device_id: device_id,
//           purpose: "verify_phone",
//         };
  
//         const response = await RegisterFn(data);
//         if (response.message === "Verification code sent")
//           router.replace("/resetPassword/resetSms/reset-sms");
//         console.log("API response:", response);
//       } catch (error) {
//         console.log("API error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//   return (
//     <>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <PageHeader title="Parol Tiklash" isEnabledBack />
//           <View style={styles.inputContainer}>
//             <PhoneInput onChangeText={setPhone} value={phone} />
//           </View>
//           <ButtonApp
//             label={loading ? "Yuborilmoqda..." : "Davom etish"}
//             onPress={handleSendOtp}
//             disabled={phone.replace(/\D/g, "").length < 9}
//           />
//         </View>
//       </TouchableWithoutFeedback>
//     </>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inputContainer: {
//     paddingHorizontal: Spacing.horizontal,
//   },
// });

import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PageHeader from "src/components/header/PageHeader";
import PhoneInput from "src/components/PhoneInput/PhoneInput";
import { Spacing } from "src/shared/token";
import ButtonApp from "src/shared/ui/Button/button";
import { getClientIp, getDeviceId } from "src/utils/device";
import { RegisterFn } from "../../../../../../../packages/api/register/register";
import { router } from "expo-router";

export default function InterPassword() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Telefon raqam yuborish (OTP)
  const handleSendOtp = async () => {
    setLoading(true);

    try {
      // Faqat raqamlar
      const digitsOnly = phone.replace(/\D/g, "");

      // +998 formatiga keltirish
      const fullPhone = digitsOnly.startsWith("998")
        ? `+${digitsOnly}`
        : `+998${digitsOnly}`;

      // Device ID va IP
      const device_id = getDeviceId();
      const ip = await getClientIp();

      const data = {
        phone: fullPhone,
        ip_address: ip,
        device_id: device_id,
        purpose: "verify_phone",
      };

      const response = await RegisterFn(data);

      if (response.message === "Verification code sent") {
        // ResetSms sahifasiga yo'naltirish
        router.replace({
          pathname: "/resetPassword/resetSms/reset-sms",
          params: { phone: fullPhone }
        });
      }

      console.log("API response:", response);
    } catch (error) {
      console.log("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <PageHeader title="Parol Tiklash" isEnabledBack />

        <View style={styles.inputContainer}>
          <PhoneInput onChangeText={setPhone} value={phone} />
        </View>

        <ButtonApp
          label={loading ? "Yuborilmoqda..." : "Davom etish"}
          onPress={handleSendOtp}
          disabled={phone.replace(/\D/g, "").length < 9} // 9 raqamdan kichik bo'lsa disable
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171C26",
  },
  inputContainer: {
    paddingHorizontal: Spacing.horizontal,
    marginTop: Spacing.horizontal,
  },
});
