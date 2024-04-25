import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ContextProvider } from "./ContextProvider";
import { PaperUIProvider } from "./PaperUI";

export const Providers = ({ children }) => {
  return (
    <ContextProvider>
      <PaperUIProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {children}
        </GestureHandlerRootView>
      </PaperUIProvider>
    </ContextProvider>
  );
};
