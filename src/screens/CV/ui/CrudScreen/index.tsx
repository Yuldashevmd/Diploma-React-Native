import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Button, Chip, TextInput } from "react-native-paper";
import { Container } from "../../../../shared/styles/global";
import { useState } from "react";

export const CVScreenCrud = ({ navigation, route }) => {
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
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              color: "#252525",
            }}
          >
            Main info:
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
                    activeOutlineColor="#004C99"
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
                rules={{ required: true, minLength: 5 }}
                control={control}
                name="skills"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="#004C99"
                    mode="outlined"
                    multiline
                    label="Skills"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.skills && (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  field is required and must be at least 5 characters
                </Text>
              )}
            </View>
            <Controller
              control={control}
              name="jobs"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  outlineColor={"#ccc"}
                  activeOutlineColor="#004C99"
                  mode="outlined"
                  multiline
                  label="Experience"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Controller
              control={control}
              name="salary_from"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  outlineColor={"#ccc"}
                  activeOutlineColor="#004C99"
                  mode="outlined"
                  multiline
                  label="Salary from"
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
            <Controller
              control={control}
              name="about"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  outlineColor={"#ccc"}
                  activeOutlineColor="#004C99"
                  mode="outlined"
                  multiline
                  label="About me"
                  numberOfLines={10}
                  value={value}
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
          buttonColor="#004C99"
          icon={"content-save"}
          style={{
            height: 50,
            marginTop: 10,
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
