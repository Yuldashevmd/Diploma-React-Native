import { Text, View } from "react-native";

export const Navbar = () => {
  return (
    <View
      style={{
        height: 50,
        backgroundColor: "purple",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 10,
        gap: 8,
      }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 50,
        }}
      />
      <Text style={{ color: "white" }}>Navbar</Text>
    </View>
  );
};
