import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "../Tab";
import { SearchScreenItem } from "../../../screens/SearchScreenItem";
import { Signin } from "../../../widgets/Signin";
import { Signup } from "../../../widgets/Signup";
import { JobsScreenCrud } from "../../../screens/Jobs";
import { CV } from "../../../screens/CV";
import { CVScreenCrud } from "../../../screens/CV/ui/CrudScreen";
import { SettingScreen } from "../../../screens/Setting";

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
        name="JobScreenCrud"
        component={JobsScreenCrud}
        options={{
          title: "Create or Edit Job",
          headerStyle: { backgroundColor: "crimson" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen name="CV" component={CV} />
      <Stack.Screen
        name="CVScreenCrud"
        component={CVScreenCrud}
        options={{
          title: "Create or Edit CV",
          headerStyle: { backgroundColor: "#004a8d" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{ unmountOnBlur: true }}
      />

      {/* AUTH */}
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
