import { create } from "zustand";

export const useUserTokenSlice = create((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
