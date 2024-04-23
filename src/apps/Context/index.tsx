import { createContext, useState } from "react";

const Context = createContext(null);
export const ContextWrapper = ({ children }) => {
  const [token, setToken] = useState(null);
  return (
    <Context.Provider value={[token, setToken]}>{children}</Context.Provider>
  );
};
