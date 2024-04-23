import { Modal, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../../shared/styles/global";
import { X } from "react-native-feather";
import { Button, Divider } from "react-native-paper";

export const SearchScreenFilterModal = (props) => {
  const { open, close, title } = props;

  return (
    <ScrollView>
      <Container>
        <SafeAreaView>
          <Modal visible={open} animationType="slide" onRequestClose={close}>
            <View
              aria-label="modal-header"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: 10,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 20 }}>{title}</Text>
              <X
                name="x"
                size={24}
                color="black"
                style={{ marginLeft: "auto" }}
                onPress={close}
              />
            </View>
            <Divider />
            <View
              style={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: 10,
              }}
            >
              <Button
                mode="contained"
                buttonColor="#fb676b"
                style={{
                  borderRadius: 8,
                }}
              >
                Search
              </Button>
            </View>
          </Modal>
        </SafeAreaView>
      </Container>
    </ScrollView>
  );
};
