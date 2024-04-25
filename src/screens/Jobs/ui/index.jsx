import { Alert, FlatList } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { MyJobCard } from "../../../shared/ui/MyJobCard";
import { FAB } from "react-native-paper";
import { Plus } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const cards = [
  {
    id: 1,
    title: "Front-end developer",
    salary_type: "euro",
    salary_from: "1380",
    subtitle: "10.02.2024",
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga fga uygayg awygauywg fyuag yag yuagw yfgawfauysg",
  },
  {
    id: 2,
    title: "Back-end developer",
    salary_type: "dollar",
    salary_from: "1500",
    subtitle: "10.02.2024",
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga ",
  },
  {
    id: 3,
    title: "Front-end developer",
    salary_type: "sum",
    salary_from: "11200",
    subtitle: "10.02.2024",
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga fga uygayg awygauywg fyuag yag yuagw yfgawfauysg",
  },
  {
    id: 4,
    title: "Back-end developer",
    salary_type: "dollar",
    salary_from: "500",
    subtitle: "10.02.2024",
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga ",
  },
  {
    id: 5,
    title: "Front-end developer",
    salary_type: "sum",
    salary_from: "6000",
    subtitle: "10.02.2024",
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga fga uygayg awygauywg fyuag yag yuagw yfgawfauysg",
  },
  {
    id: 6,
    title: "Back-end developer",
    salary_type: "euro",
    salary_from: "25000",
    subtitle: "10.02.2024",
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga ",
  },
];

export const JobsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  // DELETE
  const handleDelete = async (id) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed", id),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Container>
      <SafeAreaView>
        <HeaderTextScreen
          title="Jobs"
          subtitle="Here you can see jobs, you created"
        />
      </SafeAreaView>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cards}
        renderItem={({ item }) => (
          <MyJobCard
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
            salary_from={item.salary_from}
            salary_type={item.salary_type}
            id={item.id}
            onEdit={() => navigation.navigate("JobScreenCrud", { id: item.id })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ListEmpty />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <FAB
        style={{
          backgroundColor: "crimson",
          marginBottom: 10,
        }}
        color="#fff"
        label="Create"
        icon={() => <Plus width={20} height={20} color={"white"} />}
        onPress={() => navigation.navigate("JobScreenCrud")}
      />
    </Container>
  );
};
