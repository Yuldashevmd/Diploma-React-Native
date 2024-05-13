import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export const Pagination = ({ GET, pagination }) => {
  const totalPages = Math.ceil(
    pagination.totalResults / Number(pagination.pageSize)
  );

  const handlePrev = () => {
    const newPagination = {
      ...pagination,
      pageNumber: Number(pagination.pageNumber) - 1,
    };
    GET(newPagination);
  };

  const handleNext = () => {
    const newPagination = {
      ...pagination,
      pageNumber: Number(pagination.pageNumber) + 1,
    };
    GET(newPagination);
  };

  return (
    <View style={styles.container}>
      <Button
        icon="chevron-left"
        disabled={Number(pagination.pageNumber) === 1}
        onPress={handlePrev}
        textColor="crimson"
      >
        Prev
      </Button>
      <Button
        icon="chevron-right"
        disabled={Number(pagination.pageNumber) === totalPages}
        onPress={handleNext}
        textColor="crimson"
      >
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
