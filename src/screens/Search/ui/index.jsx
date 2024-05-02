import { FlatList, SafeAreaView, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { SearchScreenFilter } from "./Filter";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { Button } from "react-native-paper";
import { useSearch } from "../model/hook";
import { LoadingUI } from "../../../shared/ui/LoadingUi";
import { useUserToken } from "../../../widgets/Signin/model/hook";
import { useEffect } from "react";
import { getData } from "../api";

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
  const { token } = useUserToken();

  // GET
  const GET = async () => {
    setPending(true);
    const res = await getData(pagination, sort);
    if (res?.results) {
      setData(res.results);
    }

    if (res?.status === 401) {
      navigation.navigate("Signin");
    }
    setPending(false);
  };

  // GET
  useEffect(() => {
    GET();
  }, [sort]);

  // LIKE
  const onLike = async () => {
    if (token === null) {
      navigation.navigate("Signin");
    } else {
      const body = {
        like: likes ? false : true,
        job_id: id,
      };
      const res = await handleLike(body);
      res.status === 401 && navigation.navigate("Signin");
      res.status === 201 && getSearchData(pagination, sort);
    }
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
            onPress={() => setSort({ ...sort, type: "all" })}
            icon={sort.type === "all" ? "check" : null}
          >
            All
          </Button>
          <Button
            mode="contained"
            buttonColor="#FFE6CC"
            textColor="#FF8000"
            style={{ borderRadius: 8 }}
            onPress={() => setSort({ ...sort, type: "popular" })}
            icon={sort.type === "popular" ? "check" : null}
          >
            Popular
          </Button>
        </View>
      </SafeAreaView>
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
            onLike={onLike}
            onClick={() =>
              navigation.navigate("SearchScreenItem", { id: item.id })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ListEmpty />}
        refreshing={pending}
        onRefresh={GET}
        onEndReached={() =>
          setPagination({
            ...pagination,
            pageSize: Number(pagination.pageSize) + 10,
          })
        }
      />
    </Container>
  );
};
