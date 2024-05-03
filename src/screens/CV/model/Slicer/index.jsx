import { create } from "zustand";

export const useCVSlice = create((set) => ({
  data: null,
  pending: false,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
  },
  setData: (data) => set({ data }),
  setPagination: (pagination) => set({ pagination }),
  setPending: (pending) => set({ pending }),
}));
