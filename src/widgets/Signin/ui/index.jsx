import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Container } from "../../../shared/styles/global";
import { LogIn } from "react-native-feather";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { useUserToken } from "../model/hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn } from "../api";
import { useState } from "react";

export const SigninUI = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setToken } = useUserToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FINISH
  const handleFinish = async (values) => {
    setLoading(true);
    const body = {
      name: values.login.trim(),
      password: values.password.trim(),
    };
    const res = await signIn(body);
    if (res.token) {
      setToken(res.token);
      await AsyncStorage.setItem("access_token", res.token);
      setTimeout(() => {
        navigation.navigate("Поиск");
      }, 1000);
      reset();
      setLoading(false);
    } else {
      setError(res.message);
      reset();
      setLoading(false);
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
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>Войти</Text>
              <LogIn width={35} height={35} color={"crimson"} />
            </View>
            {error && (
              <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
            )}
            <Text style={style.label}>Логин:</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={style.input}
                  placeholder="Введите логин"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="login"
              rules={{ required: true, minLength: 3 }}
            />
            {errors.login && (
              <Text style={{ color: "red" }}>
                Логин должен содержать не менее 3 символов
              </Text>
            )}
            <Text style={style.label}>Пароль:</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={style.input}
                  placeholder="Введите пароль"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              )}
              name="password"
              rules={{ required: true, minLength: 3, maxLength: 12 }}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>
                Пароль должен содержать не менее 3 и не более 12 символов
              </Text>
            )}
            <View style={{ marginVertical: 10 }}>
              <Button
                disabled={loading}
                loading={loading}
                textColor="#fff"
                buttonColor="crimson"
                style={{ borderRadius: 8, textAlign: "center" }}
                onPress={handleSubmit(handleFinish)}
              >
                <Text style={{ color: "white" }}>Войти</Text>
              </Button>
              <Text style={{ marginVertical: 10, textAlign: "center" }}>
                Еще нет аккаунта?
                <Text
                  style={{ color: "#0080F0" }}
                  onPress={() => navigation.navigate("Регистрация")}
                >
                  {" "}
                  Зарегистрироваться
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
