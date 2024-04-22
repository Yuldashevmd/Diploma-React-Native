import { Button, SafeAreaView, Text } from "react-native";
import { Container } from "../../../shared/styles/global";

export const SavedScreen = ({ navigation }) => {
  return (
    <Container>
      <SafeAreaView>
        <Text>SavedScreen</Text>
        <Button
          title="go to seachScreenItem"
          onPress={() => navigation.navigate("SearchScreenItem")}
        />
        <Button
          title="go to signin"
          onPress={() => navigation.navigate("Signin")}
        />
        <Button
          title="go to signup"
          onPress={() => navigation.navigate("Signup")}
        />
      </SafeAreaView>
    </Container>
  );
};
