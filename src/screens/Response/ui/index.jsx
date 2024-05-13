import { FlatList, SafeAreaView, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HeaderTextScreen } from "../../../shared/ui/HeaderTextScreen";
import { SegmentedButtons } from "react-native-paper";
import { useEffect } from "react";
import { Check, List, X } from "react-native-feather";
import { ListEmpty } from "../../../shared/ui/EmptyList";
import { JobItemCard } from "../../../shared/ui/JobItemCard";
import { useResponse } from "../model/hook";
import { getData } from "../api";
import { LoadingUI } from "../../../shared/ui/LoadingUi";
import { NOTAUTH } from "../../Profile";
import { useUserToken } from "../../../widgets/Signin/model/hook";
import { Pagination } from "../../../entities/pagination";

const buttons = [
  {
    id: 1,
    value: "all",
    label: "All",
    icon: List,
    accessibilityLabel: "All",
    style: { borderColor: "lightgrey", backgroundColor: "#fff" },
    checkedColor: "crimson",
  },

  {
    id: 2,
    value: "offered",
    label: "Offered",
    accessibilityLabel: "Offered",
    style: { borderColor: "lightgrey", backgroundColor: "#fff" },
    checkedColor: "crimson",
    icon: Check,
  },
  {
    id: 3,
    value: "rejected",
    label: "Rejected",
    accessibilityLabel: "Rejected",
    style: { borderColor: "lightgrey", backgroundColor: "#fff" },
    checkedColor: "crimson",
    icon: X,
  },
];

export const ResponseScreen = ({ navigation }) => {
  const {
    data,
    pending,
    type,
    setType,
    setPending,
    setData,
    pagination,
    setPagination,
  } = useResponse();
  const { token } = useUserToken();

  // GET
  const GET = async (newPagination) => {
    const res = await getData(type, newPagination, setPending, setData);
    if (res?.status === 401) return navigation.navigate("Signin");

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
  }, [type]);

  if (!token) return <NOTAUTH />;

  return (
    <Container>
      <SafeAreaView>
        <HeaderTextScreen
          title="Responses"
          subtitle="Here you can see responses to jobs"
        />
        <View style={{ marginVertical: 10 }}>
          <SegmentedButtons
            value={type}
            onValueChange={setType}
            buttons={buttons}
          />
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
              title={item?.title}
              subtitle={Date.now()}
              content={item?.about}
              salary_from={item?.salery_from}
              salary_type={item?.currency}
              id={item?.id}
              likes={item?.likes}
              rejected={item?.answer === "rejected" ? true : false}
              offered={item?.answer === "offer" ? true : false}
              onClick={() =>
                navigation.navigate("SearchScreenItem", { id: item.id })
              }
            />
          )}
          keyExtractor={(_, index) => index}
          ListEmptyComponent={<ListEmpty />}
          refreshing={pending}
          onRefresh={() => GET(pagination)}
          ListFooterComponent={<Pagination GET={GET} pagination={pagination} />}
        />
      )}
    </Container>
  );
};
