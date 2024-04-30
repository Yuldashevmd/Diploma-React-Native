import { FlatList, SafeAreaView, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { SearchScreenFilter } from "./Filter";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { Button } from "react-native-paper";
import { useState } from "react";
import { useSearch } from "./model/hook";
import { LoadingUI } from "../../../shared/ui/LoadingUi";

export const SearchScreen = ({ navigation }) => {
  const [sort, setSort] = useState("all");
  const { getSearchData, searchData, pending } = useSearch();

  const handleRefresh = async () => {
    await getSearchData();
  };

  if (pending) return <LoadingUI />;

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
        data={searchData}
        renderItem={({ item }) => (
          <JobItemCard
            key={item.id}
            title={item.title}
            subtitle={item.create_data}
            content={item.about}
            salary_from={item.salery_from}
            salary_type={item.currency}
            id={item.id}
            likes={item?.likes}
            onClick={() =>
              navigation.navigate("SearchScreenItem", { id: item.id })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ListEmpty />}
        refreshing={pending}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};
