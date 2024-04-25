import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../../shared/styles/global";
import { Button, Chip, TextInput } from "react-native-paper";

export const JobsScreenCrud = ({ navigation, route }) => {
  const { params } = route;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [salaryType, setSalaryType] = useState("sum");

  const handleFinish = (values) => {
    console.log({ ...values, salary_type: salaryType }, "values");
    reset();
    setSalaryType("sum");
    navigation.goBack();
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              color: "#252525",
            }}
          >
            Info:
          </Text>
          <View style={{ gap: 15 }}>
            <View>
              <Controller
                rules={{ required: true, minLength: 3 }}
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    label="Title"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.title && (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  field is required and must be at least 3 characters
                </Text>
              )}
            </View>
            <View>
              <Controller
                rules={{ required: true, minLength: 15 }}
                control={control}
                name="requirements"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    multiline
                    label="Requirements"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.requirements && (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  field is required and must be at least 15 characters
                </Text>
              )}
            </View>
            <Controller
              control={control}
              name="salary_from"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  outlineColor={"#ccc"}
                  activeOutlineColor="crimson"
                  mode="outlined"
                  multiline
                  label="Salary from"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: "#252525",
                }}
              >
                Salary type:
              </Text>
              <Chip
                selected={salaryType === "sum"}
                showSelectedOverlay
                onPress={() => setSalaryType("sum")}
              >
                Sum
              </Chip>
              <Chip
                selected={salaryType === "euro"}
                showSelectedOverlay
                onPress={() => setSalaryType("euro")}
              >
                Euro
              </Chip>
              <Chip
                selected={salaryType === "dollar"}
                showSelectedOverlay
                onPress={() => setSalaryType("dollar")}
              >
                Dollar
              </Chip>
            </View>
            <View
              aria-label="contacts"
              style={{
                gap: 15,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: "#ccc",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 20,
                  color: "#252525",
                }}
              >
                Contacts:
              </Text>
              <Controller
                control={control}
                name="address"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    label="Address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    keyboardType="phone-pad"
                    label="Phone"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    label="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <Controller
                control={control}
                name="telegram"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    label="Telegram"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            <Controller
              control={control}
              name="about"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  outlineColor={"#ccc"}
                  activeOutlineColor="crimson"
                  mode="outlined"
                  label="About me"
                  value={value}
                  multiline
                  numberOfLines={10}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
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
