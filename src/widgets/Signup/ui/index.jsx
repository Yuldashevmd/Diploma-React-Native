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
import { User } from "react-native-feather";
import { Controller, useForm } from "react-hook-form";

export const SignupUI = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFinish = (values) => {
    console.log(values, "values");
    reset();
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
              <User width={35} height={35} color={"#db332c"} />

              <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign up</Text>
            </View>
            <Text style={style.label}>Login:</Text>
            <Controller
              control={control}
              name="login"
              rules={{ required: true, minLength: 3 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  style={style.input}
                  onBlur={onBlur}
                  placeholder="Create login or phone number"
                  onChangeText={onChange}
                />
              )}
            />
            {errors.login && (
              <Text style={{ color: "red" }}>
                Please enter login or phone number
              </Text>
            )}
            <Text style={style.label}>Password:</Text>
            <Controller
              control={control}
              name="password"
              rules={{ required: true, minLength: 3 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  style={style.input}
                  onBlur={onBlur}
                  placeholder="Create password"
                  onChangeText={onChange}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>
                Password should be at least 6 characters
              </Text>
            )}
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity
                style={style.button}
                onPress={handleSubmit(handleFinish)}
              >
                <Text style={{ color: "white" }}>Sign up</Text>
              </TouchableOpacity>
              <Text style={{ marginVertical: 10, textAlign: "center" }}>
                Already have an account?
                <Text
                  style={{ color: "#0080F0" }}
                  onPress={() => navigation.navigate("Signin")}
                >
                  {" "}
                  Sign in
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
    marginVertical: 8,
    padding: 10,
    borderRadius: 4,
    borderColor: "#ddd",
    backgroundColor: "#eeebff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#db332c",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
