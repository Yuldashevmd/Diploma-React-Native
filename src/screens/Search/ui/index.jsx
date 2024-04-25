import { FlatList, SafeAreaView, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { SearchScreenFilter } from "./Filter";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { Button } from "react-native-paper";
import { useState } from "react";

const cards = [
  {
    id: 1,
    title: "Front-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",

    salary_from: "5000",
    salary_type: "sum",
    likes: true,
  },
  {
    id: 2,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",

    salary_from: "5000",
    salary_type: "euro",
    likes: false,
  },
  {
    id: 3,
    title: "Mobile developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
    salary_from: "5000",
    salary_type: "dollar",
    likes: true,
  },
  {
    id: 5,
    title: "Software engineer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
    salary_from: "5000",
    salary_type: "sum",
    likes: true,
  },
];

export const SearchScreen = ({ navigation }) => {
  const [sort, setSort] = useState("all");
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
        <SearchScreenFilter />
        <View style={{ flexDirection: "row", gap: 10, marginVertical: 5 }}>
          <Button
            mode="contained"
            buttonColor="#D5E8D4"
            textColor="green"
            style={{ borderRadius: 8 }}
            onPress={() => setSort("all")}
            icon={sort === "all" ? "check" : null}
          >
            All
          </Button>
          <Button
            mode="contained"
            buttonColor="#FFE6CC"
            textColor="#FF8000"
            style={{ borderRadius: 8 }}
            onPress={() => setSort("popular")}
            icon={sort === "popular" ? "check" : null}
          >
            Popular
          </Button>
        </View>
      </SafeAreaView>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cards}
        renderItem={({ item }) => (
          <JobItemCard
            key={item.id}
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
