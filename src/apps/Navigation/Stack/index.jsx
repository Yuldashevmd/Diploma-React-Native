import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "../Tab";
import { SearchScreenItem } from "../../../screens/SearchScreenItem";
import { Signin } from "../../../widgets/Signin";
import { Signup } from "../../../widgets/Signup";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SearchScreenItem" component={SearchScreenItem} />
      <Stack.Screen
        name="Signin"
        component={Signin}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
