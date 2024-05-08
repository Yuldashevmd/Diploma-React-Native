import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { Button, Surface, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { getData, Update } from "../api";

export const SettingScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // GET
  const GET = async () => {
    const res = await getData();
    reset({ ...res });
  };

  // FINISH
  const handleFinish = async (values) => {
    const body = new FormData();
    body.append("image_link", "");
    body.append("name", values.name);
    body.append("password", values.password);
    body.append("email", values.email);
    body.append("phone", values.phone);
    body.append("occupation", values.occupation);

    const res = await Update(body);
    reset();
    if (res?.status === 204) return navigation.navigate("Profile");
    if (res?.status === 401) return navigation.navigate("Signin");
  };

  // LOAD
  useEffect(() => {
    GET();
  }, []);

  return (
    <Container
      style={{ flexDirection: "column", justifyContent: "space-between" }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <HeaderTextScreen
            title="Personal data"
            subtitle="Save to change personal data"
          />
          <View style={{ gap: 20, marginBottom: 20 }}>
            <Surface
              elevation={1}
              style={{ padding: 8, borderRadius: 8, gap: 15 }}
            >
              <Text style={{ fontSize: 20, fontWeight: 600, color: "#454545" }}>
                Info:
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor="lightgrey"
                    mode="outlined"
                    label={"Full name"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="name"
                rules={{ required: true }}
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor="lightgrey"
                    mode="outlined"
                    label={"Email"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
                rules={{ required: true }}
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor="lightgrey"
                    mode="outlined"
                    keyboardType={"phone-pad"}
                    label={"Phone"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phone"
                rules={{ required: true, minLength: 11, maxLength: 14 }}
              />
              {errors.phone && (
                <Text style={{ color: "red" }}>Phone number is not valid</Text>
              )}

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor="lightgrey"
                    mode="outlined"
                    label={"Occupation"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="occupation"
                rules={{ required: true }}
              />
            </Surface>

            <Surface
              elevation={1}
              style={{ padding: 8, borderRadius: 8, gap: 15 }}
            >
              <Text style={{ fontSize: 20, fontWeight: 600, color: "#454545" }}>
                Password:
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    secureTextEntry
                    outlineColor="lightgrey"
                    mode="outlined"
                    label={"New password"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
                rules={{ required: true, minLength: 3, maxLength: 24 }}
              />
              {errors.password && (
                <Text style={{ color: "red" }}>Password must be 3-24</Text>
              )}
            </Surface>
          </View>
        </ScrollView>
        <Button
          onPress={handleSubmit(handleFinish)}
          mode="contained"
          buttonColor="crimson"
          icon={"content-save"}
          style={{
            height: 50,
            marginBottom: 10,
            width: "100%",
            borderRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Save
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
};
