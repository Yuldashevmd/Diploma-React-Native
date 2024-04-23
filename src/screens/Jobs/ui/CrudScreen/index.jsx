import { Text, View } from "react-native";

export const JobsScreenCrud = ({ navigation, route }) => {
  const { params } = route;

  return (
    <View>
      {!params ? (
        <Text>CRUD Screen</Text>
      ) : (
        <Text>CRUD Screen ID: {params.id}</Text>
      )}
    </View>
  );
};
