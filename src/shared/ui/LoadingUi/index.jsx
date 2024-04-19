import { View, ActivityIndicator } from "react-native";

export const LoadingUI = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={"#fb6f92"} />
    </View>
  );
};
