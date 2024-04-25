import { FlatList, SafeAreaView } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { useState } from "react";

const cards = [
  {
    id: 1,
    title: "Front-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",

    likes: true,
    salary_from: "15000",
    salary_type: "sum",
  },
  {
    id: 2,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
    likes: true,
    salary_from: "5000",
    salary_type: "euro",
  },
  {
    id: 3,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
    likes: true,
    salary_from: "5000",
    salary_type: "euro",
  },
  {
    id: 4,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
    likes: true,
    salary_from: "5000",
    salary_type: "euro",
  },
  {
    id: 5,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
    likes: true,
    salary_from: "5000",
    salary_type: "euro",
  },
  {
    id: 6,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
    likes: true,
    salary_from: "5000",
    salary_type: "euro",
  },
];

export const SavedScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <Container>
      <SafeAreaView>
        <HeaderTextScreen
          title="Saved"
          subtitle="Here you can see saved jobs"
        />
      </SafeAreaView>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cards}
        renderItem={({ item }) => (
          <JobItemCard
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
            salary_from={item.salary_from}
            salary_type={item.salary_type}
            id={item.id}
            likes={item.likes}
            onClick={() =>
              navigation.navigate("SearchScreenItem", { id: item.id })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ListEmpty />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};
