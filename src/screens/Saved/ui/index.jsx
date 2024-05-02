import { FlatList, SafeAreaView } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { useEffect } from "react";
import { useSaved } from "../model/hook";
import { getSaved } from "../api";

export const SavedScreen = ({ navigation }) => {
  const { data, setData, pagination, setPagination, pending, setPending } =
    useSaved();

  // GET
  const GET = async () => {
    setPending(true);
    const res = await getSaved(pagination);
    if (res.results) {
      setData(res.results);
    }

    if (res?.status === 401) {
      navigation.navigate("Signin");
    }
    setPending(false);
  };

  useEffect(() => {
    GET();
  }, [pagination]);

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
        data={data}
        renderItem={({ item }) => (
          <JobItemCard
            title={item.title}
            subtitle={Intl.DateTimeFormat("ru").format(item.create_data)}
            content={item.about}
            salary_from={item.salery_from}
            salary_type={item.currency}
            id={item.id}
            likes={true}
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
