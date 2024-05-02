import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { useEffect, useState } from "react";
import { Heart, Mail, Phone, Send } from "react-native-feather";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { SalaryText } from "../../../entities/SalaryText";
import { ActivityIndicator, Button } from "react-native-paper";
import { useSearchItem } from "../model/hook";
import { handleLike, postResponse } from "../api";
import { useUserToken } from "../../../widgets/Signin/model/hook";

export const SearchScreenItem = ({ navigation, route }) => {
  const { id } = route.params;
  const { getSearchItem, searchItem, pending } = useSearchItem(id);
  const [loading, setLoading] = useState(false);
  const { token } = useUserToken();

  // LIKE
  const onLike = async () => {
    if (token === null) {
      navigation.navigate("Signin");
    } else {
      const body = {
        like: searchItem?.like ? false : true,
        job_id: id,
      };
      setLoading(true);
      const res = await handleLike(body);
      res.status === 401 && navigation.navigate("Signin");
      res.status === 201 && getSearchItem(id);
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Heart
          width={24}
          height={24}
          color="crimson"
          onPress={onLike}
          fill={searchItem?.like ? "crimson" : "transparent"}
        />
      ),
      title: searchItem?.title,
    });
  }, []);

  // SEND RESPONSE
  const handleSendResponse = async () => {
    if (token === null) {
      navigation.navigate("Signin");
    } else {
      setLoading(true);
      const res = await postResponse(searchItem.id);
      res.status === 401 && navigation.navigate("Signin");
      res.status === 201 && getSearchItem(id);
      setLoading(false);
    }
  };

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
          title={searchItem?.title}
          subtitle={Intl.DateTimeFormat("en-GB").format(
            new Date(searchItem?.create_data || Date.now())
          )}
        />
        <SalaryText
          salary={searchItem?.salery_from}
          salary_type={searchItem?.currency}
        />
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
            {searchItem?.seen} people seen
          </Button>
          <Button
            style={{ borderRadius: 8 }}
            mode="contained"
            buttonColor="#F8CECC"
            textColor="crimson"
          >
            {searchItem?.rejects} people rejected
          </Button>
        </View>
        <View aria-label="company" style={{ marginVertical: 10, gap: 5 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Company:</Text>
          <Text style={style.text}>{searchItem?.org_name}</Text>
        </View>
        <View aria-label="experience" style={{ marginVertical: 10, gap: 5 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Experience:</Text>
          <Text style={style.text}>{searchItem?.experience}</Text>
        </View>
        <View aria-label="requirements" style={{ marginVertical: 10, gap: 8 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Requirements:</Text>
          <Text>{searchItem?.requrements}</Text>
        </View>
        <View aria-label="content" style={{ marginVertical: 10, gap: 5 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Content:</Text>
          <Text style={style.text}>{searchItem?.about}</Text>
        </View>
        <View aria-label="address" style={{ marginVertical: 10, gap: 5 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>Address:</Text>
          <Text style={style.text}>{searchItem?.address}</Text>
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
            <Text style={style.text}>Phone: {searchItem?.phone}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Mail width={20} height={20} color="#252525" />
            <Text style={style.text}>Email: {searchItem?.email}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Send width={20} height={20} color="#252525" />
            <Text style={style.text}>Telegram: {searchItem?.telegram}</Text>
          </View>
        </View>
      </ScrollView>

      <Button
        loading={loading}
        disabled={searchItem?.responded || loading}
        textColor="white"
        onPress={handleSendResponse}
        mode="contained"
        buttonColor="green"
        icon={"send"}
        style={{
          height: 50,
          marginBottom: 10,
          borderRadius: 8,
          justifyContent: "center",
        }}
      >
        Response
      </Button>
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
