import { useSearchItemSlicer } from "../Slicer";

export const useSearchItem = (id) => {
  const pending = useSearchItemSlicer((state) => state.pending);
  const data = useSearchItemSlicer((state) => state.data);
  const setData = useSearchItemSlicer((state) => state.setData);
  const setPending = useSearchItemSlicer((state) => state.setPending);

  return {
    data,
    setData,
    setPending,
    pending,
  };
};
