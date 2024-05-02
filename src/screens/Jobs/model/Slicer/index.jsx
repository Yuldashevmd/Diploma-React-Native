import { create } from "zustand";

export const jobsSlicer = create((set) => ({
  data: null,
  pending: false,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
  },
  setPagination: (pagination) => set({ pagination }),
  setData: (data) => set({ data }),
  setPending: (pending) => set({ pending }),
}));
