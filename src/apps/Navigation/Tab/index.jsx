import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Briefcase,
  Heart,
  MessageSquare,
  Search,
  User,
} from "react-native-feather";
import { SearchScreen } from "../../../screens/Search";
import { SavedScreen } from "../../../screens/Saved";
import { ResponseScreen } from "../../../screens/Response";
import { JobsScreen } from "../../../screens/Jobs";
import { ProfileScreen } from "../../../screens/Profile";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Search">
      <Tab.Screen
        name="Поиск"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "crimson",
          tabBarIcon: (props) => (
            <Search
              {...props}
              name="search"
              size={24}
              color={props.focused ? "crimson" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Сохраненные"
        component={SavedScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "crimson",
          tabBarIcon: (props) => (
            <Heart
              {...props}
              name="search"
              size={24}
              color={props.focused ? "crimson" : "grey"}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Отклики"
        component={ResponseScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "crimson",
          tabBarIcon: (props) => (
            <MessageSquare
              {...props}
              name="search"
              size={24}
              color={props.focused ? "crimson" : "grey"}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Вакансии"
        component={JobsScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "crimson",
          tabBarIcon: (props) => (
            <Briefcase
              {...props}
              name="search"
              size={24}
              color={props.focused ? "crimson" : "grey"}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "crimson",
          tabBarIcon: (props) => (
            <User
              {...props}
              name="search"
              size={24}
              color={props.focused ? "crimson" : "grey"}
            />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};
