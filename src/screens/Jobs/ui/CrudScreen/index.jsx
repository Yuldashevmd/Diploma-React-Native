import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../../shared/styles/global";
import { Button, Chip, TextInput } from "react-native-paper";
import { useJobs } from "../../model/hook";
import { createJob, getOneJob, updateJob } from "../../api";

export const JobsScreenCrud = ({ navigation, route }) => {
  const { id } = route.params;
  const { refetch } = route.params;
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
        refetch(true);
        navigation.goBack();
      }
    } else {
      const res = await createJob(setPending, body);
      if (res.status === 201) {
        reset();
        setSalaryType("sum");
        refetch(true);
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
            Информация:
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
                    label="Титул"
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
                  титул надо указать и не меньше 3
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
                    label="Название организации"
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
                  название организации надо указать и не меньше 3
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
                    label="Требования"
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
                  требования надо указать и не меньше 5
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
                    label="Опыт"
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
                  опыт надо указать
                </Text>
              )}
            </View>
            <Controller
              rules={{ required: true }}
              control={control}
              name="salery_from"
              disabled={pending}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  outlineColor={"#ccc"}
                  activeOutlineColor="crimson"
                  mode="outlined"
                  multiline
                  label="Цена от"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.salery_from && (
              <Text
                style={{
                  color: "red",
                }}
              >
                Цена должна быть числом
              </Text>
            )}
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
                Валюта:
              </Text>
              <Chip
                selected={salaryType === "sum"}
                showSelectedOverlay
                onPress={() => setSalaryType("sum")}
              >
                Сум
              </Chip>
              <Chip
                selected={salaryType === "euro"}
                showSelectedOverlay
                onPress={() => setSalaryType("euro")}
              >
                Евро
              </Chip>
              <Chip
                selected={salaryType === "dollar"}
                showSelectedOverlay
                onPress={() => setSalaryType("dollar")}
              >
                Доллар
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
                Контакты:
              </Text>
              <View>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="address"
                  disabled={pending}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      outlineColor={"#ccc"}
                      activeOutlineColor="crimson"
                      mode="outlined"
                      label="Адрес"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.address && (
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    адрес не может быть пустым
                  </Text>
                )}
              </View>
              <View>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="phone"
                  disabled={pending}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      outlineColor={"#ccc"}
                      activeOutlineColor="crimson"
                      mode="outlined"
                      keyboardType="phone-pad"
                      label="Номер телефона"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.phone && (
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    номер телефона не может быть пустым
                  </Text>
                )}
              </View>
              <View>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="email"
                  disabled={pending}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      outlineColor={"#ccc"}
                      activeOutlineColor="crimson"
                      mode="outlined"
                      label="Почта"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.email && (
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    почта не может быть пустым
                  </Text>
                )}
              </View>
              <View>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="telegram"
                  disabled={pending}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      outlineColor={"#ccc"}
                      activeOutlineColor="crimson"
                      mode="outlined"
                      label="Телеграм"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.telegram && (
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    телеграм не может быть пустым
                  </Text>
                )}
              </View>
            </View>
            <View>
              <Controller
                rules={{ required: true }}
                control={control}
                name="about"
                disabled={pending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="crimson"
                    mode="outlined"
                    label="Описание"
                    value={value}
                    multiline
                    numberOfLines={10}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.about && (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  описание не может быть пустым
                </Text>
              )}
            </View>
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
            width: "100%",
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          Сохранить
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
};
