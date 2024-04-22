import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./Stack";
import { StatusBar } from "react-native";

export const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
      <StatusBar />
    </NavigationContainer>
  );
};
