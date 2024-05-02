import { useEffect } from "react";
import { useSearchItemSlicer } from "../Slicer";

export const useSearchItem = (id) => {
  const getSearchItem = useSearchItemSlicer((state) => state.getSearchItem);
  const pending = useSearchItemSlicer((state) => state.pending);
  const searchItem = useSearchItemSlicer((state) => state.searchItem);

  useEffect(() => {
    getSearchItem(id);
  }, []);

  return {
    searchItem,
    getSearchItem,
    pending,
  };
};
