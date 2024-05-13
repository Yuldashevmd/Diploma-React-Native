import { create } from "zustand";

export const responseSlicer = create((set) => ({
  data: null,
  pending: false,
  type: "all",
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalResults: 0,
  },
  setPagination: (newPagination) =>
    set((state) => ({ ...state, pagination: newPagination })),
  setType: (type) => set({ type }),
  setPending: (pending) => set({ pending }),
  setData: (data) => set({ data }),
}));
