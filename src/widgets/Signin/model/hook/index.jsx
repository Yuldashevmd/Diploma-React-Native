import { useUserTokenSlice } from "../Slicer";

export const useUserToken = () => {
  const token = useUserTokenSlice((state) => state.token);
  const signIn = useUserTokenSlice((state) => state.signIn);
  const pending = useUserTokenSlice((state) => state.pending);

  return { token, signIn, pending };
};
