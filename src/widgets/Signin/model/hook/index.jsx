import { useUserTokenSlice } from "../Slicer";

export const useUserToken = () => {
  const token = useUserTokenSlice((state) => state.token);
  const setToken = useUserTokenSlice((state) => state.setToken);
  return { token, setToken };
};
