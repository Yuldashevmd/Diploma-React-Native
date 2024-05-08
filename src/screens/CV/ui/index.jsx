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

export const CV = ({ navigation }) => {
  const { data, setData, pending, setPending, pagination, setPagination } =
    useCV();

  // GET
  const GET = async () => {
    const res = await getData(pagination, setPending, setData);
    if (res?.status === 401) return navigation.navigate("Signin");
  };

  // LOAD
  useEffect(() => {
    !data && GET();
  }, []);

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
      <HeaderTextScreen title="CV's" subtitle="Here you can see your CV's" />
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
              jobs={item.jobs}
              content={item.about}
              id={item.id}
              onEdit={() =>
                navigation.navigate("CVScreenCrud", { id: item.id })
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ListEmpty />}
          refreshing={pending}
          onRefresh={GET}
        />
      )}
      <SafeAreaView>
        <FAB
          style={{
            backgroundColor: "#004C99",
            marginBottom: 10,
          }}
          color="#fff"
          label="Create"
          icon={() => <Plus width={20} height={20} color={"white"} />}
          onPress={() => navigation.navigate("CVScreenCrud", { id: null })}
        />
      </SafeAreaView>
    </Container>
  );
};
