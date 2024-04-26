import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { useEffect } from "react";
import { Heart, Mail, Phone, Send } from "react-native-feather";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { SalaryText } from "../../../entities/SalaryText";
import { ActivityIndicator, Button } from "react-native-paper";
import { useUser } from "../../../shared/hooks/useUser";

export const SearchScreenItem = ({ navigation, route }) => {
  const { id } = route.params;
  const { data, pending } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Heart width={24} height={24} color="crimson" />,
      title: "Front-end developer " + id,
    });
  }, []);

  if (pending)
    return (
      <ActivityIndicator
        animating={pending}
        color="crimson"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fbfbfb",
      }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <HeaderTextScreen
          title={"Front-end developer " + id}
          subtitle={"Date:10.02.2024"}
        />
        <SalaryText salary={"500"} salary_type={"sum"} />
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderBottomColor: "lightgrey",
          }}
        >
          <Button
            style={{ borderRadius: 8 }}
            mode="contained"
            buttonColor="#E1D5E7"
            textColor="#9673A6"
          >
            50 people seen
          </Button>
          <Button
            style={{ borderRadius: 8 }}
            mode="contained"
            buttonColor="#F8CECC"
            textColor="crimson"
          >
            29 people responded
          </Button>
        </View>
        <View aria-label="experience" style={{ marginVertical: 10, gap: 5 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Experience:</Text>
          <Text style={style.text}>2 year of experience in JavaScript</Text>
        </View>
        <View aria-label="requirements" style={{ marginVertical: 10, gap: 8 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Requirements:</Text>
          <Text style={style.text}>-HTML,CSS,JS</Text>
          <Text style={style.text}>-REACT JS</Text>
          <Text style={style.text}>-REACT NATIVE</Text>
          <Text style={style.text}>-VUE JS</Text>
        </View>
        <View aria-label="content" style={{ marginVertical: 10, gap: 5 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Content:</Text>
          <Text style={style.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            aliquam, aut voluptas incidunt quisquam iure explicabo, eligendi
            voluptatibus illo alias temporibus adipisci! Blanditiis, architecto
            voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quibusdam adipisci quam possimus veniam neque repudiandae a
            ipsum tempora nulla odio quo autem corporis explicabo harum corrupti
            distinctio earum ratione praesentium quaerat sequi facere, porro
            quidem?
          </Text>
        </View>
        <View aria-label="address" style={{ marginVertical: 10, gap: 5 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Address:</Text>
          <Text style={style.text}>
            {data?.address.city}, {data?.address.street}, {data?.address.suite}
          </Text>
        </View>
        <View aria-label="contacts" style={{ marginVertical: 10, gap: 5 }}>
          <Text style={style.title}>Contacts:</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Phone width={20} height={20} color="#252525" />
            <Text style={style.text}>Phone: {data?.phone}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Mail width={20} height={20} color="#252525" />
            <Text style={style.text}>Email: {data?.email}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Send width={20} height={20} color="#252525" />
            <Text style={style.text}>Telegram: @username</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          borderTopWidth: 1,
          borderTopColor: "lightgrey",
          paddingTop: 10,
        }}
      >
        <Button
          onPress={() => console.log("clicked")}
          mode="contained"
          buttonColor="green"
          icon={"send"}
          style={{
            height: 50,
            marginBottom: 10,
            borderRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Response
        </Button>
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  text: {
    color: "#454545",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
});
