import { FlatList, SafeAreaView } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";

const cards = [
  {
    id: 1,
    title: "Front-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",

    likes: true,
  },
  {
    id: 2,
    title: "Back-end developer",
    subtitle: "10.02.2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit",
    likes: true,
  },
];

export const SavedScreen = ({ navigation }) => {
  return (
    <Container>
      <SafeAreaView>
        <HeaderTextScreen
          title="Saved"
          subtitle="Here you can see saved jobs"
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          marginBottom={70}
          data={cards}
          renderItem={({ item }) => (
            <JobItemCard
              title={item.title}
              subtitle={item.subtitle}
              content={item.content}
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