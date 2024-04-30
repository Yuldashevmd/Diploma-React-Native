import { create } from "zustand";
import { BASIC_URL } from "../Helper/api";

export const useUserDataSlice = create((set) => ({
  userData: null,
  pending: false,
  getData: async () => {
    set({ pending: true });
    const response = await fetch(`${BASIC_URL}/user/one`);
    const data = await response.json();
    set({ userData: data });
    set({ pending: false });
  },
}));
