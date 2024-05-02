import { useSearchSlicer } from "../Slicer";

export const useSearch = () => {
  const pending = useSearchSlicer((state) => state.pending);
  const setPending = useSearchSlicer((state) => state.setPending);
  const data = useSearchSlicer((state) => state.data);
  const setData = useSearchSlicer((state) => state.setData);
  const sort = useSearchSlicer((state) => state.sort);
  const setSort = useSearchSlicer((state) => state.setSort);
  const pagination = useSearchSlicer((state) => state.pagination);
  const setPagination = useSearchSlicer((state) => state.setPagination);

  return {
    pending,
    setPending,
    data,
    setData,
    sort,
    setSort,
    pagination,
    setPagination,
  };
};
