import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASIC_URL } from "../../../apps/Helper/api";

export const getData = async () => {
  try {
    const response = await fetch(`${BASIC_URL}/user/one`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// UPDATE
export const Update = async (body) => {
  try {
    const response = await fetch(`${BASIC_URL}/user/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
      },
      body: body,
    });
    return response && { status: 204 };
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) return { status: 401 };
    return error;
  }
};
