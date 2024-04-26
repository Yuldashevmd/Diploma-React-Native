import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { Container } from "../../../../shared/styles/global";
import { X } from "react-native-feather";
import { Button, Chip, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

export const SearchScreenFilterModal = (props) => {
  const { open, close, title } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [searchBy, setSearchBy] = useState("vacancy_name");
  const [salaryType, setSalaryType] = useState("sum");

  // FINISH
  const handleFinish = (value) => {
    console.log(
      { ...value, salary_type: salaryType, search_by: searchBy },
      "value"
    );
    close();
  };

  // RESET
  const handleReset = () => {
    reset();
    close();
  };

  return (
    <ScrollView>
      <Container>
        <Modal
          aria-modal="modal-header"
          aria-label="modal-header"
          aria-hidden={open}
          visible={open}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={close}
        >
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View
              aria-label="modal-header"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: 10,
                height: 50,
                backgroundColor: "#fb676b",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
                {title}
              </Text>
              <X
                name="x"
                size={24}
                color="white"
                style={{ marginLeft: "auto", flex: 1 }}
                onPress={close}
              />
            </View>
          </SafeAreaView>
          <View
            style={{
              padding: 10,
              gap: 30,
            }}
          >
            <View style={{ gap: 10 }}>
              <Controller
                control={control}
                name="search"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    label={"Search"}
                    mode="outlined"
                    outlineColor="lightgrey"
                    activeOutlineColor="#fb676b"
                  />
                )}
                rules={{ required: true }}
              />
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Chip
                  selected={searchBy === "vacancy_name"}
                  onPress={() => setSearchBy("vacancy_name")}
                  textStyle={{ color: "#fb676b" }}
                  selectedColor="#fb676b"
                  style={{ backgroundColor: "#FFCCCC" }}
                >
                  by vacancy name
                </Chip>
                <Chip
                  selected={searchBy === "organization_name"}
                  onPress={() => setSearchBy("organization_name")}
                  textStyle={{ color: "#fb676b" }}
                  selectedColor="#fb676b"
                  style={{ backgroundColor: "#FFCCCC" }}
                >
                  by organization name
                </Chip>
              </View>
            </View>
            <View style={{ gap: 10 }}>
              <Controller
                control={control}
                name="salary_from"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    label={"Salary"}
                    mode="outlined"
                    keyboardType="numeric"
                    outlineColor="lightgrey"
                    activeOutlineColor="#fb676b"
                  />
                )}
                rules={{ required: true }}
              />
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Chip
                  selected={salaryType === "sum"}
                  onPress={() => setSalaryType("sum")}
                  textStyle={{ color: "#fb676b" }}
                  selectedColor="#fb676b"
                  style={{ backgroundColor: "#FFCCCC" }}
                >
                  sum
                </Chip>
                <Chip
                  selected={salaryType === "euro"}
                  onPress={() => setSalaryType("euro")}
                  textStyle={{ color: "#fb676b" }}
                  selectedColor="#fb676b"
                  style={{ backgroundColor: "#FFCCCC" }}
                >
                  euro
                </Chip>
                <Chip
                  selected={salaryType === "dollar"}
                  onPress={() => setSalaryType("dollar")}
                  textStyle={{ color: "#fb676b" }}
                  selectedColor="#fb676b"
                  style={{ backgroundColor: "#FFCCCC" }}
                >
                  dollar
                </Chip>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: 10,
              gap: 10,
            }}
          >
            <Button
              onPress={handleSubmit(handleFinish)}
              icon={"filter"}
              mode="contained"
              buttonColor="#fb676b"
              style={{
                borderRadius: 8,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Submit
            </Button>
            <Button icon={"restore"} mode="default" onPress={handleReset}>
              Restore
            </Button>
          </View>
        </Modal>
      </Container>
    </ScrollView>
  );
};
