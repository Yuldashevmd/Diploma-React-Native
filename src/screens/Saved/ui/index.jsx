import { FlatList, SafeAreaView } from "react-native";
import { Container } from "../../../shared/styles/global";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { useEffect } from "react";
import { useSaved } from "../model/hook";
import { getData } from "../api";
import { LoadingUI } from "../../../shared/ui/LoadingUi";
import { NOTAUTH } from "../../Profile";
import { useUserToken } from "../../../widgets/Signin/model/hook";

export const SavedScreen = ({ navigation }) => {
  const { data, setData, pagination, setPagination, pending, setPending } =
    useSaved();
  const { token } = useUserToken();

  // GET
  const GET = async () => {
    const res = await getData(pagination, setData, setPending);
    if (res?.status === 401) return navigation.navigate("Signin");
  };

  //LOAD
  useEffect(() => {
    !data && GET();
  }, []);

  if (!token) return <NOTAUTH />;

  return (
    <Container>
      <SafeAreaView>
        <HeaderTextScreen
          title="Saved"
          subtitle="Here you can see saved jobs"
        />
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
        />
      )}
    </Container>
  );
};
