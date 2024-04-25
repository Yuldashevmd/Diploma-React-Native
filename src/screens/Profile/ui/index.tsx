import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { Avatar, Button, Card, Divider, FAB, List } from "react-native-paper";
import { LogOut } from "react-native-feather";
import { MyJobCard } from "../../../shared/ui/MyJobCard";

export const ProfileScreen = ({ navigation }) => {
  // LOG-OUT
  const handleLogout = () => {
    console.log("logged out");
  };

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
            <Text style={{ fontSize: 20 }}>Alimov Alim Alimovich</Text>
            <Text style={{ fontSize: 14, color: "grey" }}>
              Front-end developer
            </Text>
            <Text style={{ fontSize: 14, color: "grey" }}>
              extremeJs@gmail.com
            </Text>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View aria-label="profile-resume-part" style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "grey" }}>
              Resumes:
            </Text>
            <Card style={{ marginVertical: 10, backgroundColor: "white" }}>
              <Card.Title
                title="Alimov Alim Alimovich"
                subtitle="Front-end developer"
                subtitleStyle={{ fontSize: 13, color: "grey" }}
                left={(props) => <Avatar.Icon {...props} icon="account" />}
              />
              <Card.Content>
                <Text style={{ color: "grey" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                </Text>
              </Card.Content>
            </Card>
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
              // onDelete={() => {}}
              // onEdit={() => {}}
              likes
            />
            {/* <Card style={{ marginVertical: 10, backgroundColor: "white" }}>
              <Card.Title
                title="Front-end developer"
                titleStyle={{ fontWeight: "500", fontSize: 18 }}
                subtitle="10.02.2024"
                subtitleStyle={{ fontSize: 13, color: "grey" }}
              />
              <Card.Content>
                <Text style={{ color: "grey" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                </Text>
              </Card.Content>
            </Card> */}
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
                onPress={() => console.log("setting clicked")}
              />
            </List.Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};
