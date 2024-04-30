import { useEffect } from "react";
import { useSearchSlicer } from "../Slicer";

export const useSearch = () => {
  const pending = useSearchSlicer((state) => state.pending);
  const searchData = useSearchSlicer((state) => state.searchData);
  const getSearchData = useSearchSlicer((state) => state.getSearchData);

  useEffect(() => {
    if (!searchData) getSearchData();
  }, []);

  return { pending, searchData, getSearchData };
};
