import { FlatList, SafeAreaView, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { SearchScreenFilter } from "./Filter";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { Button } from "react-native-paper";
import { useSearch } from "../model/hook";
import { LoadingUI } from "../../../shared/ui/LoadingUi";
import { useEffect } from "react";
import { getData } from "../api";
import { Pagination } from "../../../entities/pagination";

export const SearchScreen = ({ navigation }) => {
  const {
    data,
    setData,
    pending,
    setPending,
    setSort,
    sort,
    pagination,
    setPagination,
  } = useSearch();

  // GET
  const GET = async (newPagination) => {
    const res = await getData(newPagination, sort, setData, setPending);
    if (res?.status === 401) return navigation.navigate("Вход");
    if (res?.pagination) {
      setPagination({
        pageNumber: res?.pagination?.currentPage,
        pageSize: res?.pagination?.pageSize,
        totalResults: res?.pagination?.totalItems,
      });
    }
  };

  // LOAD
  useEffect(() => {
    GET(pagination);
  }, []);

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
            onPress={() => {
              let sorted = { ...sort, type: "all" };
              setSort(sorted);
              getData(pagination, sorted, setData, setPending);
            }}
            icon={sort.type === "all" ? "check" : null}
          >
            Все
          </Button>
          <Button
            mode="contained"
            buttonColor="#FFE6CC"
            textColor="#FF8000"
            style={{ borderRadius: 8 }}
            onPress={() => {
              let sorted = { ...sort, type: "popular" };
              setSort(sorted);
              getData(pagination, sorted, setData, setPending);
            }}
            icon={sort.type === "popular" ? "check" : null}
          >
            Популярные
          </Button>
        </View>
      </SafeAreaView>
      {pending ? (
        <LoadingUI />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <JobItemCard
              key={item.id}
              title={item.title}
              subtitle={item.create_data}
              content={item.about}
              salary_from={item.salery_from}
              salary_type={item.currency}
              id={item.id}
              likes={item?.like}
              onLike={null}
              onClick={() =>
                navigation.navigate("SearchScreenItem", { id: item.id })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ListEmpty />}
          refreshing={pending}
          onRefresh={() => GET(pagination)}
          ListFooterComponent={
            data?.length > 0 && <Pagination GET={GET} pagination={pagination} />
          }
        />
      )}
    </Container>
  );
};
