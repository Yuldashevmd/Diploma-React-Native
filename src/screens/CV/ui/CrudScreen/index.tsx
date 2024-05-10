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
        navigation.goBack();
      }
    } else {
      const res = await createCV(setPending, body);
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
            Main info:
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
                disabled={pending}
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
              name="experinces"
              disabled={pending}
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
              name="salery_from"
              disabled={pending}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  outlineColor={"#ccc"}
                  activeOutlineColor="#004C99"
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
            <Controller
              control={control}
              name="about"
              disabled={pending}
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
        <SafeAreaView>
          <Button
            loading={pending}
            disabled={pending}
            onPress={handleSubmit(handleFinish)}
            mode="contained"
            buttonColor="#004C99"
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
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Container>
  );
};
