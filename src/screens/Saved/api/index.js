import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASIC_URL } from "../../../apps/Helper/api";

export const getData = async (pagination, setData, setPending) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    setPending(true);
    let res;
    if (!token) {
      res = await fetch(
        `${BASIC_URL}/like/all?${new URLSearchParams({
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
        })}`
      );
    } else {
      res = await fetch(
        `${BASIC_URL}/like/all?${new URLSearchParams({
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
        })}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    const response = await res.json();
    if (response.status === 401) return { status: 401 };
    response.data?.results && setData(response.data.results);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) return { status: 401 };
  } finally {
    setPending(false);
  }
};
