import { create } from "zustand";
import { BASIC_URL } from "../../../../../apps/Helper/api";

export const useSearchSlicer = create((set) => ({
  searchData: null,
  pending: false,
  getSearchData: async () => {
    set({ pending: true });
    const response = await fetch(`${BASIC_URL}/job/all`);
    const data = await response.json();
    set({ searchData: data, pending: false });
    set({ pending: false });
  },
}));
