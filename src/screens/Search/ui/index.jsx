import { FlatList, SafeAreaView, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { SearchScreenFilter } from "./Filter";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { Button, Chip } from "react-native-paper";
import { useState } from "react";
import { Check } from "react-native-feather";

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

  return (
    <Container>
      <SafeAreaView>
        <SearchScreenFilter />
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 5 }}>
          <Button
            mode="contained"
            buttonColor="#A9C4EB"
            textColor="#004C99"
            style={{ borderRadius: 8 }}
            onPress={() => setSort("all")}
            icon={sort === "all" ? "check" : null}
          >
            All
          </Button>
          <Button
            mode="contained"
            buttonColor="#FFCE9F"
            textColor="crimson"
            style={{ borderRadius: 8 }}
            onPress={() => setSort("popular")}
            icon={sort === "popular" ? "check" : null}
          >
            Popular
          </Button>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          marginBottom={70}
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
