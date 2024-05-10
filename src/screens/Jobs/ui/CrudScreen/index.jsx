import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../../shared/styles/global";
import { Button, Chip, TextInput } from "react-native-paper";
import { useJobs } from "../../model/hook";
import { createJob, getOneJob, updateJob } from "../../api";

export const JobsScreenCrud = ({ navigation, route }) => {
  const { id } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [salaryType, setSalaryType] = useState("sum");
  const { pending, setPending } = useJobs();

  // FINISH
  const handleFinish = async (values) => {
    let body = {
      title: values.title.trim(),
      expriece: values.expriece.trim(),
      org_name: values.org_name.trim(),
      requrements: values.requrements.trim(),
      salery_from: values.salery_from.trim(),
      email: values.email.trim(),
      about: values.about.trim(),
      telegram: values.telegram.trim(),
      address: values.address.trim(),
      phone: values.phone.trim(),
      currency: salaryType.trim(),
    };
    if (id) {
      const res = await updateJob(setPending, id, body);
      if (res.status === 204) {
        reset();
        setSalaryType("sum");
        navigation.goBack();
      }
    } else {
      const res = await createJob(setPending, body);
      if (res.status === 201) {
        reset();
        setSalaryType("sum");
        navigation.goBack();
      }
    }
  };

  // LOAD
  useEffect(() => {
    if (id) {
      getOneJob(id).then((res) => {
        reset({
          ...res.data,
        });
        setSalaryType(res.data.currency);
      });
    }
  }, []);

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
                disabled={pending}
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
                rules={{ required: true, minLength: 3 }}
                control={control}
                name="org_name"
                disabled={pending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    label="Organization name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.org_name && (
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
                name="requrements"
                disabled={pending}
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
              {errors.requrements && (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  field is required and must be at least 15 characters
                </Text>
              )}
            </View>
            <View>
              <Controller
                rules={{ required: true }}
                control={control}
                name="expriece"
                disabled={pending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    multiline
                    label="Experience"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.expriece && (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  field is required
                </Text>
              )}
            </View>
            <Controller
              control={control}
              name="salery_from"
              disabled={pending}
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
                disabled={pending}
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
                disabled={pending}
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
                disabled={pending}
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
                disabled={pending}
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
              disabled={pending}
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
          loading={pending}
          disabled={pending}
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
