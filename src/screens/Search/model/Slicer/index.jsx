import { create } from "zustand";

export const useSearchSlicer = create((set) => ({
  data: null,
  sort: {
    type: "all",
    title: null,
    orgname: null,
    salary: null,
    salary_type: null,
  },
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalResults: 0,
  },
  setPagination: (newPagination) =>
    set((state) => ({ ...state, pagination: newPagination })),
  pending: false,
  setSort: (sort) => set({ sort }),
  setData: (data) => set({ data }),
  setPending: (pending) => set({ pending }),
}));
