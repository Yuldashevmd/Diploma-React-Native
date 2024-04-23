import { Text, View } from "react-native";

export const HeaderTextScreen = (props) => {
  const { title, subtitle } = props;

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>{title}</Text>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "grey" }}>
        {subtitle}
      </Text>
    </View>
  );
};
