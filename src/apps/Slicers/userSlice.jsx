import { create } from "zustand";

export const useUserDataSlice = create((set) => ({
  userData: null,
  pending: false,
  getData: async () => {
    set({ pending: true });
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const data = await response.json();
    set({ userData: data });
    set({ pending: false });
  },
}));
