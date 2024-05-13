import { create } from "zustand";

export const savedUserSlice = create((set) => ({
  data: null,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalResults: 0,
  },
  setPagination: (newPagination) =>
    set((state) => ({ ...state, pagination: newPagination })),
  pending: false,
  setPending: (pending) => set({ pending }),
  setData: (data) => set({ data }),
}));
