import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "../../../../app.json";

export const PaperUIProvider = ({ children }) => {
  return <PaperProvider>{children}</PaperProvider>;
};

AppRegistry.registerComponent(appName, () => PaperUIProvider);
