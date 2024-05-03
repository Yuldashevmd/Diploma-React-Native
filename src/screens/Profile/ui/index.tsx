import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { Avatar, Button, Divider, List } from "react-native-paper";
import { MyJobCard } from "../../../shared/ui/MyJobCard";
import { RefreshCcw } from "react-native-feather";
import { CvCard } from "../../../shared/ui/CvCard";
import { useProfile } from "../model/hook";
import { getData } from "../api";
import { useEffect } from "react";
import { LoadingUI } from "../../../shared/ui/LoadingUi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserToken } from "../../../widgets/Signin/model/hook";

export const ProfileScreen = ({ navigation }) => {
  const { data, pending, setData, setPending } = useProfile();
  const { token, setToken } = useUserToken();
  // LOG-OUT
  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
    setToken(null);
  };

  // GET
  const GET = async () => {
    const res = await getData(setData, setPending);
    if (res.status === 401) navigation.navigate("Signin");
  };

  // LOAD
  useEffect(() => {
    !data && GET();
  }, []);

  if (token === null) return navigation.navigate("Signin");

  if (pending) return <LoadingUI />;

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          aria-label="profile-header"
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginVertical: 20,
          }}
        >
          <Avatar.Image
            size={80}
            style={{
              backgroundColor: "#eee",
              borderWidth: 2,
              borderColor: "#ccc",
            }}
            source={require("../../../../assets/favicon.png")}
            aria-label="User"
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20 }}>{data?.name}</Text>
            <Text style={{ fontSize: 14, color: "grey" }}>
              {data?.occupation}
            </Text>
            <Text style={{ fontSize: 14, color: "grey" }}>{data?.email}</Text>
          </View>
        </View>
        <View>
          <RefreshCcw
            disabled={pending}
            onPress={GET}
            width={24}
            height={24}
            color={"grey"}
            style={{ flex: 1, alignSelf: "flex-end" }}
          />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View aria-label="profile-resume-part" style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "grey" }}>
              Resumes:
            </Text>
            {data?.resumes.map((item) => (
              <View key={item.id}>
                <CvCard
                  title={item.title}
                  subtitle={Intl.DateTimeFormat("ru").format(
                    new Date(item.create_data) || Date.now()
                  )}
                  content={item.about}
                  skills={item.skills}
                  jobs={item.experinces}
                />
              </View>
            ))}

            <Button onPress={() => navigation.navigate("CV")}>Show all</Button>
          </View>
          <Divider />
          <View aria-label="profile-resume-part" style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "grey" }}>
              Jobs:
            </Text>
            {data?.my_jobs.map((item) => (
              <View key={item.id}>
                <MyJobCard
                  title={item.title}
                  subtitle={Intl.DateTimeFormat("ru").format(
                    new Date(item.create_data) || Date.now()
                  )}
                  content={item.about}
                  salary_from={item.salery_from}
                  salary_type={item.currency}
                />
              </View>
            ))}
            <Button onPress={() => navigation.navigate("Jobs")}>
              Show all
            </Button>
          </View>
          <Divider />
          <View
            aria-label="profile-settings-part"
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              marginVertical: 10,
            }}
          >
            <List.Section>
              <List.Subheader
                style={{ fontWeight: "600", fontSize: 16, color: "grey" }}
              >
                Additional:
              </List.Subheader>
              <List.Item
                title="Setting"
                left={(props) => <List.Icon {...props} icon="cog" />}
                onPress={() => navigation.navigate("Settings")}
              />
              <List.Item
                title="About"
                left={(props) => <List.Icon {...props} icon="information" />}
                onPress={() => console.log("setting clicked")}
              />
              <List.Item
                title="Help"
                left={(props) => <List.Icon {...props} icon={"help"} />}
                onPress={() => console.log("setting clicked")}
              />
              <List.Item
                title="Exit"
                titleStyle={{ color: "red" }}
                left={(props) => (
                  <List.Icon {...props} icon={"logout"} color="red" />
                )}
                onPress={handleLogout}
              />
            </List.Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};
