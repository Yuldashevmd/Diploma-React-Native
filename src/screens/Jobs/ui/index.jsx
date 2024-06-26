import { Alert, FlatList } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { MyJobCard } from "../../../shared/ui/MyJobCard";
import { FAB } from "react-native-paper";
import { Plus } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { useJobs } from "../model/hook";
import { deleteJob, getData } from "../api";
import { useCallback, useEffect } from "react";
import { NOTAUTH } from "../../Profile";
import { useUserToken } from "../../../widgets/Signin/model/hook";
import { Pagination } from "../../../entities/pagination";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export const JobsScreen = ({ navigation }) => {
  const { data, pending, pagination, setPagination, setData, setPending } =
    useJobs();
  const { token } = useUserToken();

  // GET
  const GET = async (newPagination) => {
    const res = await getData(newPagination, setPending, setData);
    if (res?.status === 401) return navigation.navigate("Вход");
    if (res?.pagination) {
      setPagination({
        pageNumber: res?.pagination?.currentPage,
        pageSize: res?.pagination?.pageSize,
        totalResults: res?.pagination?.totalItems,
      });
    }
  };

  // REFETCH
  const refetch = useCallback((value) => {
    value && GET(pagination);
  }, []);

  // LOAD
  useEffect(() => {
    GET(pagination);
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    Alert.alert(
      "Удалить",
      "Вы уверены что хотите удалить?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const res = await deleteJob(id);
            res.status === 204 && getData(pagination, setPending, setData);
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!token) return <NOTAUTH />;

  return (
    <Container>
      <SafeAreaView>
        <HeaderTextScreen
          title="Вакансии"
          subtitle="Все вакансии которые вы создали"
        />
      </SafeAreaView>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <MyJobCard
            title={item.title}
            subtitle={Intl.DateTimeFormat("ru").format(
              new Date(item.create_data) || Date.now()
            )}
            content={item.about}
            salary_from={item.salery_from}
            salary_type={item.currency}
            id={item.id}
            onEdit={() =>
              navigation.navigate("JobScreenCrud", { id: item.id, refetch })
            }
            onDelete={() => handleDelete(item.id)}
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
      <FAB
        style={{
          backgroundColor: "crimson",
          marginBottom: 10,
        }}
        color="#fff"
        label="Создать"
        icon={() => <Plus width={20} height={20} color={"white"} />}
        onPress={() =>
          navigation.navigate("JobScreenCrud", { id: null, refetch })
        }
      />
    </Container>
  );
};
