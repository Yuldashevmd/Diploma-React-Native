import { savedUserSlice } from "../Slicer";

export const useSaved = () => {
  const pagination = savedUserSlice((state) => state.pagination);
  const setPagination = savedUserSlice((state) => state.setPagination);
  const pending = savedUserSlice((state) => state.pending);
  const setPending = savedUserSlice((state) => state.setPending);
  const data = savedUserSlice((state) => state.data);
  const setData = savedUserSlice((state) => state.setData);
  return {
    pending,
    pagination,
    setPagination,
    data,
    setData,
    setPending,
  };
};
