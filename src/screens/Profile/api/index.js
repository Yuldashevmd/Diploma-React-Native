import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASIC_URL } from "../../../apps/Helper/api";

export const getData = async (setData, setPending) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    setPending(true);
    let response;
    if (!token) {
      response = await fetch(`${BASIC_URL}/user/one`);
      const data = await response.json();
      data && setData(data.data);
      return data;
    } else {
      response = await fetch(`${BASIC_URL}/user/one`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      data && setData(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) return { status: 401 };
    return error;
  } finally {
    setPending(false);
  }
};
