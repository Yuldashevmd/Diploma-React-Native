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
import { useEffect } from "react";

export const JobsScreen = ({ navigation }) => {
  const { data, pending, pagination, setPagination, setData, setPending } =
    useJobs();

  // GET
  const GET = async () => {
    setPending(true);
    const res = await getData(pagination);
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
          onPress: async () => {
            const res = await deleteJob(id);
            res.status === 204 && GET();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Container>
      <SafeAreaView>
        <HeaderTextScreen
          title="Jobs"
          subtitle="Here you can see jobs, you created"
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
            onEdit={() => navigation.navigate("JobScreenCrud", { id: item.id })}
            onDelete={() => handleDelete(item.id)}
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
      <FAB
        style={{
          backgroundColor: "crimson",
          marginBottom: 10,
        }}
        color="#fff"
        label="Create"
        icon={() => <Plus width={20} height={20} color={"white"} />}
        onPress={() => navigation.navigate("JobScreenCrud")}
      />
    </Container>
  );
};
