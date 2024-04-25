import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { Button, Surface, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";

export const SettingScreen = ({ navigation }) => {
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
                name="full_name"
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
                    outlineColor="lightgrey"
                    mode="outlined"
                    label={"Old password"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="old_password"
                rules={{ required: true, minLength: 6, maxLength: 24 }}
              />

              {errors.old_password && (
                <Text style={{ color: "red" }}>Old password must be 6-24</Text>
              )}
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor="lightgrey"
                    mode="outlined"
                    label={"New password"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="new_password"
                rules={{ required: true, minLength: 6, maxLength: 24 }}
              />
              {errors.new_password && (
                <Text style={{ color: "red" }}>Password must be 6-24</Text>
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
