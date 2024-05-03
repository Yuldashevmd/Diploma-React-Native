import { useCVSlice } from "../Slicer";

export const useCV = () => {
  const data = useCVSlice((state) => state.data);
  const setData = useCVSlice((state) => state.setData);
  const pagination = useCVSlice((state) => state.pagination);
  const setPagination = useCVSlice((state) => state.setPagination);
  const pending = useCVSlice((state) => state.pending);
  const setPending = useCVSlice((state) => state.setPending);

  return { data, setData, pagination, setPagination, pending, setPending };
};
