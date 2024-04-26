import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Divider,
  List,
} from "react-native-paper";
import { MyJobCard } from "../../../shared/ui/MyJobCard";
import { useUser } from "../../../shared/hooks/useUser";
import { RefreshCcw } from "react-native-feather";
import { CvCard } from "../../../shared/ui/CvCard";

export const ProfileScreen = ({ navigation }) => {
  const { data, pending, refetch } = useUser();

  // LOG-OUT
  const handleLogout = () => {
    console.log("logged out");
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
              Front-end developer
            </Text>
            <Text style={{ fontSize: 14, color: "grey" }}>{data?.email}</Text>
          </View>
        </View>
        <View>
          <RefreshCcw
            disabled={pending}
            onPress={() => refetch()}
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
            <CvCard
              title="Alimov Alim Alimovich"
              subtitle="Front-end developer"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
              skills={"HTML,CSS,JS,REACT-JS,VUE-JS,NEXT-JS,NODE-JS,PHP,LARAVEL"}
              jobs="Google, Facebook, Meta"
            />
            <Button onPress={() => navigation.navigate("CV")}>Show all</Button>
          </View>
          <Divider />
          <View aria-label="profile-resume-part" style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "grey" }}>
              Jobs:
            </Text>
            <MyJobCard
              title="Front-end developer"
              subtitle="10.02.2024"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
              salary_from={500}
              salary_type="sum"
              likes
            />
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
