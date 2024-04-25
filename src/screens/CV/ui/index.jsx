import { Alert, FlatList, SafeAreaView } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { FAB } from "react-native-paper";
import { Plus } from "react-native-feather";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { CvCard } from "../../../shared/ui/CvCard";
import { useState } from "react";

const cards = [
  {
    id: 1,
    title: "Front-end developer",
    subtitle: "10.02.2024",
    skills: "HTML,CSS,JS,REACT-JS,VUE-JS,NEXT-JS,NODE-JS,PHP,LARAVEL",
    jobs: "2 years of real experience in web development",
    content:
      "Some text about my cv, Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: 2,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    skills: "HTML,CSS,NODE-JS,PHP,LARAVEL,EXPRESS-JS",
    jobs: "2 years of real experience in web development",
    content:
      "Some text about my cv, Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
  },
];
export const CV = ({ navigation }) => {
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
      <HeaderTextScreen title="CV's" subtitle="Here you can see your CV's" />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cards}
        renderItem={({ item }) => (
          <CvCard
            title={item.title}
            subtitle={item.subtitle}
            skills={item.skills}
            jobs={item.jobs}
            content={item.content}
            id={item.id}
            onEdit={() => navigation.navigate("CVScreenCrud", { id: item.id })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ListEmpty />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <SafeAreaView>
        <FAB
          style={{
            backgroundColor: "#004C99",
            marginBottom: 10,
          }}
          color="#fff"
          label="Create"
          icon={() => <Plus width={20} height={20} color={"white"} />}
          onPress={() => navigation.navigate("CVScreenCrud")}
        />
      </SafeAreaView>
    </Container>
  );
};
