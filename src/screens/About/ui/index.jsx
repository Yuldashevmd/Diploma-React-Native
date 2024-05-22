import { Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { Info } from "react-native-feather";
import { List } from "react-native-paper";

export const About = () => {
  return (
    <Container>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Info color={"crimson"} width={80} height={80} />
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}>
          Информация о приложении
        </Text>
      </View>
      <List.Item
        title="Версия: 1.0"
        description="Создано с помощью React Native"
      />
      <List.Item title="Work-up" description="Название приложения" />
      <List.Item title="Создатель" description="Ubaydulla" />
    </Container>
  );
};
