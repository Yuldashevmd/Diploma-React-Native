import { Button, SafeAreaView, Text } from "react-native";
import { Container } from "../../../shared/styles/global";

export const SearchScreen = ({ navigation }) => {
  return (
    <Container>
      <SafeAreaView>
        <Text>SearchScreen</Text>
        <Button
          title=" Go to searchItem"
          onPress={() => navigation.navigate("SearchScreenItem")}
        />
      </SafeAreaView>
    </Container>
  );
};
