import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { Avatar, Button, Divider, List } from "react-native-paper";
import { MyJobCard } from "../../../shared/ui/MyJobCard";
import { Phone, RefreshCcw, User } from "react-native-feather";
import { CvCard } from "../../../shared/ui/CvCard";
import { useProfile } from "../model/hook";
import { getData } from "../api";
import { useEffect } from "react";
import { LoadingUI } from "../../../shared/ui/LoadingUi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserToken } from "../../../widgets/Signin/model/hook";
import { NOTAUTH } from "./notAuth";

export const ProfileScreen = ({ navigation }) => {
  const { data, pending, setData, setPending } = useProfile();
  const { token, setToken } = useUserToken();
  // LOG-OUT
  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
    setToken(null);
    navigation.navigate("Search");
  };

  // GET
  const GET = async () => {
    const res = await getData(setData, setPending);
    if (res?.status === 401) navigation.navigate("Signin");
  };

  // REFETCH
  const refetch = (value) => {
    value && GET();
  };

  // LOAD
  useEffect(() => {
    GET();
  }, []);

  if (pending) return <LoadingUI />;

  if (!token) return <NOTAUTH />;

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
          <View style={{ flex: 1, gap: 2 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <User color="#252525" width={20} height={20} />
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {data?.name}
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: "grey" }}>
              {data?.occupation}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "grey",
              }}
            >
              {data?.email}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "green",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Phone width={14} height={14} color={"grey"} /> {data?.phone}
            </Text>
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
            {data && data?.resumes[0] && (
              <View key={data?.resumes[0].id}>
                <CvCard
                  title={data?.resumes[0].title}
                  subtitle={Intl.DateTimeFormat("ru").format(
                    new Date(data?.resumes[0].create_data) || Date.now()
                  )}
                  content={data?.resumes[0].about}
                  skills={data?.resumes[0].skills}
                  jobs={data?.resumes[0].experinces}
                />
              </View>
            )}
            {data?.resumes?.length > 0 ? (
              <Button onPress={() => navigation.navigate("CV")}>
                Show all
              </Button>
            ) : (
              <>
                <Text
                  style={{
                    color: "#c44d1d",
                    textAlign: "center",
                    fontSize: 18,
                    marginVertical: 10,
                  }}
                >
                  No CV's found!
                </Text>
                <Button
                  onPress={() =>
                    navigation.navigate("CVScreenCrud", { id: null, refetch })
                  }
                  style={{ borderRadius: 8 }}
                  buttonColor="#c44d1d"
                  textColor="white"
                >
                  Create CV
                </Button>
              </>
            )}
          </View>
          <Divider />
          <View aria-label="profile-resume-part" style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "grey" }}>
              Jobs:
            </Text>
            {data && data?.my_jobs[0] && (
              <View key={data?.my_jobs[0].id}>
                <MyJobCard
                  title={data?.my_jobs[0].title}
                  subtitle={Intl.DateTimeFormat("ru").format(
                    new Date(data?.my_jobs[0].create_data) || Date.now()
                  )}
                  content={data?.my_jobs[0].about}
                  salary_from={data?.my_jobs[0].salery_from}
                  salary_type={data?.my_jobs[0].currency}
                />
              </View>
            )}

            {data?.my_jobs?.length > 0 ? (
              <Button onPress={() => navigation.navigate("Jobs")}>
                Show all
              </Button>
            ) : (
              <>
                <Text
                  style={{
                    color: "#c44d1d",
                    textAlign: "center",
                    fontSize: 18,
                    marginVertical: 10,
                  }}
                >
                  No Jobs found!
                </Text>
                <Button
                  onPress={() =>
                    navigation.navigate("JobScreenCrud", { id: null, refetch })
                  }
                  style={{ borderRadius: 8 }}
                  buttonColor="#c44d1d"
                  textColor="white"
                >
                  Create Job
                </Button>
              </>
            )}
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
                onPress={() => navigation.navigate("Settings", { refetch })}
              />
              <List.Item
                title="About"
                left={(props) => <List.Icon {...props} icon="information" />}
                onPress={() => navigation.navigate("About")}
              />
              <List.Item
                title="Help"
                left={(props) => <List.Icon {...props} icon={"help"} />}
                onPress={() => navigation.navigate("Help")}
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
