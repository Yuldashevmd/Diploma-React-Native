import { create } from "zustand";
import { BASIC_URL } from "../../../../apps/Helper/api";

export const useSearchItemSlicer = create((set) => ({
  searchItem: null,
  pending: false,
  getSearchItem: async (id) => {
    set({ pending: true });
    const response = await fetch(`${BASIC_URL}/job/one/${id}`);
    const data = await response.json();
    set({ searchItem: data, pending: false });
  },
}));
