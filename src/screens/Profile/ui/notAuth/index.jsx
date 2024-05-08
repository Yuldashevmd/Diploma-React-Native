import { SafeAreaView } from "react-native";
import { Container } from "../../../../shared/styles/global";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useUserToken } from "../../../../widgets/Signin/model/hook";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NOTAUTH = () => {
  const navigation = useNavigation();
  const { token } = useUserToken();

  useEffect(() => {
    if (!token) {
      AsyncStorage.removeItem("access_token");
    }
  }, []);

  return (
    <Container>
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Please sign in first!
        </Text>
        <Button
          onPress={() => navigation.navigate("Signin")}
          buttonColor="crimson"
          textColor="white"
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
          }}
        >
          Go Signin
        </Button>
      </SafeAreaView>
    </Container>
  );
};
