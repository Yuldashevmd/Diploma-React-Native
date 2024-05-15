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
          Here is the details about the app
        </Text>
      </View>
      <List.Item title="Version: 1.0" description="Created using Native" />
      <List.Item title="Work-up" description="Name of the app" />
      <List.Item title="Created by" description="Ubaydulla" />
    </Container>
  );
};
