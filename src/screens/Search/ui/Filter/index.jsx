import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { Filter } from "react-native-feather";
import { Searchbar } from "react-native-paper";
import { SearchScreenFilterModal } from "../ModalFilter";
import { useDisclosure } from "../../../../shared/hooks/useDisclosure";
import { useSearch } from "../../model/hook";
import { getData } from "../../api";

export const SearchScreenFilter = () => {
  const { pagination, sort, setSort, setData, setPending } = useSearch();
  const [searchValue, setSearchValue] = useState("");
  const { isOpen, open, close } = useDisclosure();

  //   FINISH
  const handleFinish = () => {
    let sorted;
    if (searchValue.length > 0) {
      sorted = {
        ...sort,
        title: searchValue,
      };
      setSort(sorted);
      getData(pagination, sorted, setData, setPending);
    } else {
      sorted = {
        ...sort,
        title: null,
      };
      setSort(sorted);
      getData(pagination, sorted, setData, setPending);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Searchbar
            searchAccessibilityLabel="Search"
            placeholder="Search"
            onIconPress={handleFinish}
            onKeyPress={(e) => e.key === "Enter" && handleFinish()}
            onChangeText={setSearchValue}
            onSubmitEditing={handleFinish}
            value={searchValue}
            style={{
              flex: 6,
              backgroundColor: "white",
              fontSize: 16,
              borderRadius: 8,
            }}
          />
          <TouchableOpacity
            onPress={open}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 55,
              backgroundColor: "#fff",
              borderRadius: 8,
            }}
          >
            <Filter width={25} height={25} color={"crimson"} />
          </TouchableOpacity>
        </View>
        {/* MODAL */}
        <SearchScreenFilterModal open={isOpen} close={close} title={"Filter"} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
