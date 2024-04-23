import { useContext } from "react";
import { ContextWrapper } from "../../apps/Context";

export const useAuth = () => {
  const { token, setToken } = useContext(ContextWrapper);

  return {
    isAuth: !!token,
    token,
    setToken,
  };
};
