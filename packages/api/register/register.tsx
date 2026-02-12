import axios from "axios";
import { PREFIX } from "../api";

const Register_Api = {
  api: `${PREFIX}/api/auth/verify-phone/send-otp/`,
};

export interface RegistrationData {
  phone: string;
  ip_address: string;
  device_id: string;
  purpose: string;
}

export const RegisterFn = async (data: RegistrationData) => {
  const formData = new FormData();
  formData.append("phone", data.phone);
  formData.append("ip_address", data.ip_address);
  formData.append("device_id", data.device_id);
  formData.append("purpose", data.purpose);

  const res = await axios.post(Register_Api.api, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

<<<<<<< HEAD
  console.log(res.data)
  return res.data
}
=======
  console.log(res.data);
>>>>>>> 92d0c4977ad75ba94125ce3eb5d0b74a6f584033
  return res.data;
};
