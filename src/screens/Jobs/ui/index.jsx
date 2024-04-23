import { Alert, FlatList } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { MyJobCard } from "../../../shared/ui/MyJobCard";
import { FAB } from "react-native-paper";
import { Plus } from "react-native-feather";

const cards = [
  {
    id: 1,
    title: "Front-end developer",
    subtitle: "10.02.2024",
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga fga uygayg awygauywg fyuag yag yuagw yfgawfauysg",
  },
  {
    id: 2,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    content:
      "lorem ipsum dawodjawido wa dohawdh awiod a wgdyagwd gaw dogagfay ugfga ",
  },
];

export const JobsScreen = ({ navigation }) => {
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
      <HeaderTextScreen
        title="Jobs"
        subtitle="Here you can see jobs, you created"
      />

      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cards}
        renderItem={({ item }) => (
          <MyJobCard
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
            id={item.id}
            onEdit={() => navigation.navigate("JobScreenCrud", { id: item.id })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ListEmpty />}
      />
      <FAB
        style={{
          backgroundColor: "crimson",
        }}
        color="#fff"
        label="Create"
        icon={() => <Plus width={20} height={20} color={"white"} />}
        onPress={() => navigation.navigate("JobScreenCrud")}
      />
    </Container>
  );
};
