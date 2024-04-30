import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// URL
export const BASIC_URL = "https://hhuz.coachingzona.uz/api/v1";

export const api = axios.create({
  baseURL: BASIC_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${token || ""}`;
  return config;
});
