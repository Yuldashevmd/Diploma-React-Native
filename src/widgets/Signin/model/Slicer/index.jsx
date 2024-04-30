import { create } from "zustand";
import { BASIC_URL } from "../../../../apps/Helper/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserTokenSlice = create((set) => ({
  token: null,
  pending: false,
  setToken: (token) => set({ token }),
  signIn: async (values) => {
    set({ pending: true });
    const response = await fetch(`${BASIC_URL}/Auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    await AsyncStorage.setItem("access_token", data.token);
    set({ token: data, pending: false });
  },
}));
