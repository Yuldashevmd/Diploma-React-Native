import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { Button, Surface, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { getData, Update } from "../api";

export const SettingScreen = ({ route, navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { refetch } = route.params;

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
    if (res?.status === 204) {
      refetch(true);
      navigation.goBack();
    }
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
              <View>
                <Controller
                  rules={{ required: true }}
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
                />
                {errors.name && (
                  <Text style={{ color: "red" }}>Name is required</Text>
                )}
              </View>
              <View>
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
                {errors.email && (
                  <Text style={{ color: "red" }}>Email is not valid</Text>
                )}
              </View>
              <View>
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
                  <Text style={{ color: "red" }}>
                    Phone number is not valid, min 11, max 14
                  </Text>
                )}
              </View>
              <View>
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
                {errors.occupation && (
                  <Text style={{ color: "red" }}>Occupation is required</Text>
                )}
              </View>
            </Surface>

            <Surface
              elevation={1}
              style={{ padding: 8, borderRadius: 8, gap: 15 }}
            >
              <Text style={{ fontSize: 20, fontWeight: 600, color: "#454545" }}>
                Password:
              </Text>
              <View>
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
              </View>
            </Surface>
          </View>
        </ScrollView>
        <Button
          onPress={handleSubmit(handleFinish)}
          mode="contained"
          buttonColor="crimson"
          icon={"content-save"}
          style={{
            marginBottom: 10,
            width: "100%",
            borderRadius: 8,
          }}
        >
          Save
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
};
