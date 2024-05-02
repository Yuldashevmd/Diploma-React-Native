import { create } from "zustand";

export const savedUserSlice = create((set) => ({
  data: null,
  pagination: {
    current: 1,
    pageSize: 10,
  },
  pending: false,
  setPagination: (pagination) => set({ pagination }),
  setPending: (pending) => set({ pending }),
  setData: (data) => set({ data }),
}));
