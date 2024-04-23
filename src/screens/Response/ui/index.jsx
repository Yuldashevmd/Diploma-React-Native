import { FlatList, SafeAreaView, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { SegmentedButtons } from "react-native-paper";
import { useEffect, useState } from "react";
import { Check, List, X } from "react-native-feather";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { JobItemCard } from "../../../shared/ui/JobItemCard";

const buttons = [
  {
    id: 1,
    value: "all",
    label: "All",
    icon: List,
    accessibilityLabel: "All",
    style: { borderColor: "lightgrey", backgroundColor: "#fff" },
    checkedColor: "crimson",
  },

  {
    id: 2,
    value: "offered",
    label: "Offered",
    accessibilityLabel: "Offered",
    style: { borderColor: "lightgrey", backgroundColor: "#fff" },
    checkedColor: "crimson",
    icon: Check,
  },
  {
    id: 3,
    value: "rejected",
    label: "Rejected",
    accessibilityLabel: "Rejected",
    style: { borderColor: "lightgrey", backgroundColor: "#fff" },
    checkedColor: "crimson",
    icon: X,
  },
];

const cards = [
  {
    id: 1,
    title: "Front-end developer",
    subtitle: "10.02.2024",
    likes: true,
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga fga uygayg awygauywg fyuag yag yuagw yfgawfauysg",
    rejected: true,
    offered: false,
  },
  {
    id: 2,
    title: "Front-end developer",
    subtitle: "10.02.2024",
    likes: false,
    offered: true,
    rejected: false,
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ",
  },
];
export const ResponseScreen = ({ navigation }) => {
  const [value, setValue] = useState("all");
  const [data, setData] = useState(cards);

  // WATCH-INPUT-CHANGE-AND-FETCH
  useEffect(() => {
    if (value !== "all") {
      const filtered = cards.filter((item) => item[value]);
      setData(filtered);
    } else {
      setData(cards);
    }
  }, [value]);

  return (
    <Container>
      <SafeAreaView>
        <HeaderTextScreen
          title="Responses"
          subtitle="Here you can see responses to jobs"
        />
        <View style={{ marginVertical: 10 }}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={buttons}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          marginBottom={70}
          data={data}
          renderItem={({ item }) => (
            <JobItemCard
              title={item.title}
              subtitle={item.subtitle}
              content={item.content}
              id={item.id}
              likes={item.likes}
              rejected={item.rejected}
              offered={item.offered}
              onClick={() => navigation.navigate("SearchScreenItem")}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ListEmpty />}
        />
      </SafeAreaView>
    </Container>
  );
};
