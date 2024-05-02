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
  },
  pending: false,
  setSort: (sort) => set({ sort }),
  setPagination: (pagination) => set({ pagination }),
  setData: (data) => set({ data }),
  setPending: (pending) => set({ pending }),
}));
