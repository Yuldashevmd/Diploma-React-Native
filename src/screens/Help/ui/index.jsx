import { Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HelpCircle } from "react-native-feather";
import { List } from "react-native-paper";

export const Help = () => {
  return (
    <Container>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <HelpCircle color={"orange"} width={80} height={80} />
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}>
          Here is the breif story about the app
        </Text>
      </View>
      {/* <List.Item
        title="1."
        description="App has main 5 tab screens for navigation each of them has their own screen"
      />
      <List.Item
        title="2."
        description="Search screen: Search for jobs with all sort and filter options. Filter options are on the top of the screen and opens modal with filter options"
      /> */}

      <View style={{ marginBottom: 20, marginTop: 40 }}>
        <Text style={{ fontSize: 16 }}>
          1. App has main 5 tab screens for navigation each of them has their
          own screen
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          2. Search screen: Search for jobs with all sort and filter options.
          Filter options are on the top of the screen and opens modal with
          filter options
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          3. Saved screen: To show saved jobs by user and show the job details
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          4. Response screen: Here user can see responses jobs that requested by
          user and sort it via all, rejected, offered type.
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          5. Jobs screen: This screen shows jobs created by user. And user can
          edit or delete each of them or if screen empty user can create new
          job.
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          5. Profile screen: Here user can see his profile information and one
          CV and one Job item which created by user and show all CV or Jobs
          screen if it is empty user able to create new one. Also user can edit
          own personal informations by clicking setting list and there is option
          to log out. About and Help sections are also there.
        </Text>
      </View>
    </Container>
  );
};
