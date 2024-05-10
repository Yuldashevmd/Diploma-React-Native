import { ContextProvider } from "./ContextProvider";
import { PaperUIProvider } from "./PaperUI";

export const Providers = ({ children }) => {
  return (
    <ContextProvider>
      <PaperUIProvider>{children}</PaperUIProvider>
    </ContextProvider>
  );
};
