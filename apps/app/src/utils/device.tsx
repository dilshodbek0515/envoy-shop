import * as Device from "expo-device";
import Constants from "expo-constants";

// Qurilma nomi / modeli
export const getDeviceName = () => {
  if (Device.modelName) {
    return Device.modelName;
  }
  return "Unknown device";
};

// Qurilma ID (unikal)
export const getDeviceId = () => {
  return Constants.deviceId ?? "unknown-device-id";
};

export const getClientIp = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "0.0.0.0";
  }
};
