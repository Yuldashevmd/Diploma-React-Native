import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button, Chip, TextInput } from "react-native-paper";
import { Container } from "../../../../shared/styles/global";
import { useEffect, useState } from "react";
import { useCV } from "../../model/hook";
import { createCV, getOneCV, updateCV } from "../../api";

export const CVScreenCrud = ({ navigation, route }) => {
  const { id } = route.params;
  const { refetch } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [salaryType, setSalaryType] = useState("sum");
  const { pending, setPending } = useCV();

  // FINISH
  const handleFinish = async (values) => {
    let body = {
      title: values.title.trim(),
      skills: values.skills.trim(),
      about: values.about.trim(),
      salery_from: values.salery_from.trim(),
      experinces: values.experinces.trim(),
      currency: salaryType.trim(),
    };
    if (id) {
      const res = await updateCV(setPending, id, body);
      if (res.status === 204) {
        reset();
        setSalaryType("sum");
        refetch(true);
        navigation.goBack();
      }
    } else {
      const res = await createCV(setPending, body);
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
      getOneCV(id).then((res) => {
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
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
            {id ? "Редактирование резюме" : "Создание резюме"}
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
                    activeOutlineColor="#004C99"
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
                  Титул обязательно и должно быть не меньше 3
                </Text>
              )}
            </View>
            <View>
              <Controller
                rules={{ required: true, minLength: 3 }}
                control={control}
                name="skills"
                disabled={pending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="#004C99"
                    mode="outlined"
                    multiline
                    label="Навыки"
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
                  Навыки обязательны и должны быть не меньше 3
                </Text>
              )}
            </View>
            <View>
              <Controller
                rules={{ required: true }}
                control={control}
                name="experinces"
                disabled={pending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="#004C99"
                    mode="outlined"
                    multiline
                    label="Опыт"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.experinces && (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  Опыт обязательно
                </Text>
              )}
            </View>
            <View>
              <Controller
                rules={{
                  required: true,
                  pattern: /^[0-9]*$/,
                  valueType: "number",
                }}
                control={control}
                name="salery_from"
                disabled={pending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="#004C99"
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
            </View>
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
                Ценность:
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
            <View>
              <Controller
                rules={{ required: true }}
                control={control}
                name="about"
                disabled={pending}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    outlineColor={"#ccc"}
                    activeOutlineColor="#004C99"
                    mode="outlined"
                    multiline
                    label="Подробное описание"
                    numberOfLines={10}
                    value={value}
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
                  Описание обязательно
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
        <SafeAreaView>
          <Button
            loading={pending}
            disabled={pending}
            onPress={handleSubmit(handleFinish)}
            mode="contained"
            buttonColor="#004C99"
            icon={"content-save"}
            style={{
              marginBottom: 10,
              width: "100%",
              borderRadius: 8,
            }}
          >
            Сохранить
          </Button>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Container>
  );
};
