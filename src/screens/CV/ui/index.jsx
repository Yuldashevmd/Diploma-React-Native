import { Alert, FlatList, SafeAreaView } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { FAB } from "react-native-paper";
import { Plus } from "react-native-feather";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { CvCard } from "../../../shared/ui/CvCard";
import { useEffect } from "react";
import { deleteResume, getData } from "../api";
import { LoadingUI } from "../../../shared/ui/LoadingUi";
import { useCV } from "../model/hook";
import { Pagination } from "../../../entities/pagination";

export const CV = ({ navigation }) => {
  const { data, setData, pending, setPending, pagination, setPagination } =
    useCV();

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
  const refetch = (value) => {
    value && GET();
  };

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
            const res = await deleteResume(id);
            res.status === 204 && getData(pagination, setPending, setData);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Container>
      <HeaderTextScreen
        title="Резюме"
        subtitle="Сдесь вы можете увидеть все ваши резюме"
      />
      {pending ? (
        <LoadingUI />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <CvCard
              title={item.title}
              subtitle={Intl.DateTimeFormat("ru").format(
                new Date(item.create_data) || Date.now()
              )}
              skills={item.skills}
              jobs={item.experinces}
              content={item.about}
              id={item.id}
              onEdit={() =>
                navigation.navigate("CVScreenCrud", { id: item.id, refetch })
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
      )}
      <SafeAreaView>
        <FAB
          style={{
            backgroundColor: "#004C99",
            marginBottom: 10,
          }}
          color="#fff"
          label="Создать"
          icon={() => <Plus width={20} height={20} color={"white"} />}
          onPress={() =>
            navigation.navigate("CVScreenCrud", { id: null, refetch })
          }
        />
      </SafeAreaView>
    </Container>
  );
};
