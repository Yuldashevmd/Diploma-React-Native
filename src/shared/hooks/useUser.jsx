import { useEffect } from "react";
import { useUserDataSlice } from "../../apps/Slicers/userSlice";

export const useUser = () => {
  const data = useUserDataSlice((state) => state.userData);
  const pending = useUserDataSlice((state) => state.pending);
  const getData = useUserDataSlice((state) => state.getData);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, []);

  return {
    data,
    pending,
    refetch: getData,
  };
};
