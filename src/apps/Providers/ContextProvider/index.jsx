import { ContextWrapper } from "../../Context";

export const ContextProvider = ({ children }) => {
  return <ContextWrapper>{children}</ContextWrapper>;
};
