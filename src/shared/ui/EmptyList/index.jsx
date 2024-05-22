import { Text, View } from "react-native";

export const ListEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          fontStyle: "italic",
          color: "crimson",
        }}
      >
        Упс, ничего не найдено!
      </Text>
    </View>
  );
};
