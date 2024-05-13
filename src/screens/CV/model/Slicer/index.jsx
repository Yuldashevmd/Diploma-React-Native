import { create } from "zustand";

export const useCVSlice = create((set) => ({
  data: null,
  pending: false,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalResults: 0,
  },
  setPagination: (newPagination) =>
    set((state) => ({ ...state, pagination: newPagination })),
  setData: (data) => set({ data }),
  setPending: (pending) => set({ pending }),
}));
