import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Container } from "../../../shared/styles/global";
import { LogIn } from "react-native-feather";
import { useState } from "react";

export const SigninUI = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!login) {
      errors.login = "Login is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      console.log(
        {
          login,
          password,
        },
        "values"
      );
      setErrors({});
      setLogin("");
      setPassword("");
    }
  };

  return (
    <Container>
      <SafeAreaView>
        <View style={style.container}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            style={style.form}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign in</Text>
              <LogIn width={35} height={35} color={"crimson"} />
            </View>
            <Text style={style.label}>Login:</Text>
            <TextInput
              value={login}
              onChangeText={setLogin}
              style={style.input}
              placeholder="Enter login or phone number"
            />
            {errors.login && (
              <Text style={{ color: "red" }}>{errors.login}</Text>
            )}
            <Text style={style.label}>Password:</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={style.input}
              placeholder="Enter password"
              secureTextEntry={true}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity style={style.button} onPress={handleSubmit}>
                <Text style={{ color: "white" }}>Sign in</Text>
              </TouchableOpacity>
              <Text style={{ marginVertical: 10, textAlign: "center" }}>
                Don't have an account?
                <Text
                  style={{ color: "#0080F0" }}
                  onPress={() => navigation.navigate("Signup")}
                >
                  {" "}
                  Sign up
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Container>
  );
};

const style = StyleSheet.create({
  container: {
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    height: "fit-content",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 8,
    padding: 10,
    borderRadius: 4,
    borderColor: "#ddd",
    backgroundColor: "#eeebff",
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "crimson",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
