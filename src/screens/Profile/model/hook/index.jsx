import { useProfileSlice } from "../Slicer";

export const useProfile = () => {
  const data = useProfileSlice((state) => state.data);
  const pending = useProfileSlice((state) => state.pending);
  const setData = useProfileSlice((state) => state.setData);
  const setPending = useProfileSlice((state) => state.setPending);

  return {
    data,
    pending,
    setData,
    setPending,
  };
};
