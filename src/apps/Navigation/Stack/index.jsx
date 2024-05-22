import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "../Tab";
import { SearchScreenItem } from "../../../screens/SearchScreenItem";
import { Signin } from "../../../widgets/Signin";
import { Signup } from "../../../widgets/Signup";
import { JobsScreenCrud } from "../../../screens/Jobs";
import { CV } from "../../../screens/CV";
import { CVScreenCrud } from "../../../screens/CV/ui/CrudScreen";
import { SettingScreen } from "../../../screens/Setting";
import { About } from "../../../screens/About";
import { Help } from "../../../screens/Help";

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
          title: "Создать или редактировать",
          headerStyle: { backgroundColor: "crimson" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen name="Резюме" component={CV} />
      <Stack.Screen
        name="CVScreenCrud"
        component={CVScreenCrud}
        options={{
          title: "Создать или редактировать",
          headerStyle: { backgroundColor: "#004a8d" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Настройки"
        component={SettingScreen}
        options={{ unmountOnBlur: true }}
      />

      {/* AUTH */}
      <Stack.Screen name="Вход" component={Signin} />
      <Stack.Screen name="Регистрация" component={Signup} />
      <Stack.Screen name="Справка" component={About} />
      <Stack.Screen name="Помощь" component={Help} />
    </Stack.Navigator>
  );
};
