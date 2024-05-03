import { create } from "zustand";

export const useProfileSlice = create((set) => ({
  data: null,
  pending: false,
  setData: (data) => set({ data }),
  setPending: (pending) => set({ pending }),
}));
